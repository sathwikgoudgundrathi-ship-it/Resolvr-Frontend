package com.resolvr.controller;

import com.resolvr.model.Role;
import com.resolvr.model.User;
import com.resolvr.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8080", "http://127.0.0.1:8081"}, allowCredentials = "true")
public class UserController {
    private final UserRepository users;
    public UserController(UserRepository users) { this.users = users; }

    @GetMapping("/workers")
    public List<WorkerSummary> workers(HttpSession session) {
        Object id = session.getAttribute("RESOLVR_USER_ID");
        User actor = id instanceof String userId ? users.findById(userId).orElse(null) : null;
        if (actor == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sign in required");
        if (actor.getRole() != Role.ADMIN) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administrator access required");
        return users.findByRole(Role.WORKER).stream()
            .sorted(Comparator.comparing(User::getName, String.CASE_INSENSITIVE_ORDER))
            .map(user -> new WorkerSummary(user.getName(), user.getDepartment()))
            .toList();
    }

    public record WorkerSummary(String name, String department) {}
}
