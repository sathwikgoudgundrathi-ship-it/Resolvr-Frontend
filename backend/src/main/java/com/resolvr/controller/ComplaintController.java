package com.resolvr.controller;

import com.resolvr.dto.AssignWorkerRequest;
import com.resolvr.dto.CreateComplaintRequest;
import com.resolvr.dto.WorkProofRequest;
import com.resolvr.model.Complaint;
import com.resolvr.model.WorkProof;
import com.resolvr.model.Role;
import com.resolvr.model.User;
import com.resolvr.repository.ComplaintRepository;
import com.resolvr.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8080", "http://127.0.0.1:8081"}, allowCredentials = "true")
public class ComplaintController {
    private final ComplaintRepository complaints;
    private final UserRepository users;
    public ComplaintController(ComplaintRepository complaints, UserRepository users) { this.complaints = complaints; this.users = users; }

    @GetMapping public List<Complaint> list(@RequestParam(required = false) String status,
            @RequestParam(required = false) String department, HttpSession session) {
        User user = currentUser(session);
        List<Complaint> visible = switch (user.getRole()) {
            case ADMIN -> complaints.findAllByOrderByCreatedAtDesc();
            case WORKER -> complaints.findByAssigneeIgnoreCaseOrDepartmentIgnoreCase(user.getName(), user.getDepartment() == null ? "" : user.getDepartment());
            case PUBLIC -> complaints.findByReporterEmailIgnoreCase(user.getEmail());
        };
        return visible.stream()
            .filter(c -> status == null || c.getStatus().equalsIgnoreCase(status))
            .filter(c -> department == null || c.getDepartment().equalsIgnoreCase(department)).toList();
    }

    @GetMapping("/{id}") public Complaint get(@PathVariable String id, HttpSession session) { return visibleComplaint(id, currentUser(session)); }

    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public Complaint create(@Valid @RequestBody CreateComplaintRequest req, HttpSession session) {
        User reporter = currentUser(session);
        requireRole(reporter, Role.PUBLIC);
        long now = System.currentTimeMillis();
        String priority = validPriority(req.getPriority());
        Complaint c = new Complaint();
        c.setId("CMP-" + ThreadLocalRandom.current().nextInt(100000, 999999));
        c.setDescription(req.getDescription().trim());
        c.setTitle(req.getDescription().split("[,.]", 2)[0].substring(0, Math.min(70, req.getDescription().split("[,.]", 2)[0].length())));
        c.setLocation(blankDefault(req.getLocation(), "Unspecified"));
        c.setCategory(blankDefault(req.getCategory(), "General")); c.setPriority(priority);
        c.setDepartment(blankDefault(req.getDepartment(), "Help Desk"));
        c.setConfidence(req.getConfidence() == null ? 0.75 : Math.max(0.0, Math.min(1.0, req.getConfidence())));
        c.setStatus("Assigned"); c.setCreatedAt(now); c.setUpdatedAt(now);
        c.setSlaHours(switch (priority) { case "Critical" -> 4; case "High" -> 24; case "Low" -> 168; default -> 72; });
        c.setEscalationLevel(0); c.setAssignee("Front Office");
        c.setReporter(reporter.getName()); c.setReporterEmail(reporter.getEmail()); c.setImage(req.getImage());
        c.addTimelineEvent(now, "Complaint submitted", null);
        c.addTimelineEvent(now + 1, "AI routed to " + c.getDepartment(), c.getCategory() + " · " + priority);
        c.addTimelineEvent(now + 2, "Assigned to Front Office", null);
        return complaints.save(c);
    }

    @PatchMapping("/{id}/status") public Complaint status(@PathVariable String id, @RequestBody Map<String,String> body, HttpSession session) {
        User actor = currentUser(session);
        Complaint c = visibleComplaint(id, actor); String value = body.get("status");
        if (actor.getRole() == Role.PUBLIC) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only staff can update complaint status");
        if (actor.getRole() == Role.WORKER && !"In Progress".equals(value)) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Workers may only mark assigned work as in progress");
        if (!List.of("Submitted", "Assigned", "In Progress", "Escalated", "Resolved").contains(value))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid complaint status");
        c.setStatus(value); c.setUpdatedAt(System.currentTimeMillis());
        if ("Escalated".equals(value)) c.setEscalationLevel(Math.max(1, c.getEscalationLevel()));
        c.addTimelineEvent(c.getUpdatedAt(), "Status → " + value, null);
        return complaints.save(c);
    }

    @PatchMapping("/{id}/assign") public Complaint assign(@PathVariable String id, @Valid @RequestBody AssignWorkerRequest req, HttpSession session) {
        User actor = currentUser(session); requireRole(actor, Role.ADMIN);
        User worker = users.findByRole(Role.WORKER).stream()
            .filter(candidate -> candidate.getName().equalsIgnoreCase(req.getWorkerName().trim()))
            .findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Select a registered worker"));
        Complaint c = find(id); c.setAssignee(worker.getName());
        if (req.getDepartment() != null && !req.getDepartment().isBlank()) c.setDepartment(req.getDepartment().trim());
        c.setStatus("Assigned"); c.setUpdatedAt(System.currentTimeMillis());
        c.addTimelineEvent(c.getUpdatedAt(), "Assigned to " + c.getAssignee(), null);
        return complaints.save(c);
    }

    @PostMapping("/{id}/proof") public Complaint proof(@PathVariable String id, @Valid @RequestBody WorkProofRequest req, HttpSession session) {
        User actor = currentUser(session); requireRole(actor, Role.WORKER);
        Complaint c = visibleComplaint(id, actor); long now = System.currentTimeMillis();
        WorkProof proof = new WorkProof(req.getImage(), req.getNotes().trim(), req.getPartsUsed(), req.getCompletedBy().trim(), now, c);
        c.setCompletionProof(proof); c.setStatus("Resolved"); c.setUpdatedAt(now);
        c.addTimelineEvent(now, "Work completed by " + proof.getCompletedBy(), proof.getNotes().substring(0, Math.min(100, proof.getNotes().length())));
        return complaints.save(c);
    }

    @PatchMapping("/{id}/feedback") public Complaint feedback(@PathVariable String id, @RequestBody Map<String,Object> body, HttpSession session) {
        User actor = currentUser(session); requireRole(actor, Role.PUBLIC);
        Complaint c = visibleComplaint(id, actor); Object rating = body.get("rating");
        if (!(rating instanceof Number n) || n.intValue() < 1 || n.intValue() > 5)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
        c.setRating(n.intValue()); c.setFeedback((String) body.get("feedback")); c.setUpdatedAt(System.currentTimeMillis());
        c.addTimelineEvent(c.getUpdatedAt(), "Citizen satisfaction rating: " + n.intValue() + " ★", c.getFeedback());
        return complaints.save(c);
    }

    private Complaint find(String id) { return complaints.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found")); }
    private User currentUser(HttpSession session) {
        Object id = session.getAttribute("RESOLVR_USER_ID");
        if (!(id instanceof String userId)) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sign in required");
        return users.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sign in required"));
    }
    private Complaint visibleComplaint(String id, User user) {
        Complaint complaint = find(id);
        boolean visible = user.getRole() == Role.ADMIN
            || (user.getRole() == Role.PUBLIC && user.getEmail().equalsIgnoreCase(complaint.getReporterEmail()))
            || (user.getRole() == Role.WORKER && (user.getName().equalsIgnoreCase(complaint.getAssignee()) || user.getDepartment() != null && user.getDepartment().equalsIgnoreCase(complaint.getDepartment())));
        if (!visible) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have access to this complaint");
        return complaint;
    }
    private void requireRole(User user, Role role) {
        if (user.getRole() != role) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This action is not allowed for your account role");
    }
    private String blankDefault(String value, String fallback) { return value == null || value.isBlank() ? fallback : value.trim(); }
    private String validPriority(String value) {
        String p = value == null ? "Medium" : value.trim();
        return List.of("Critical", "High", "Medium", "Low").stream().filter(x -> x.equalsIgnoreCase(p)).findFirst().orElse("Medium");
    }
}
