package com.resolvr.service;

import com.resolvr.model.Complaint;
import com.resolvr.repository.ComplaintRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EscalationService {
    private static final List<String> SUPERVISORS = List.of("Team Lead", "Department Head", "Commissioner");
    private final ComplaintRepository complaints;

    public EscalationService(ComplaintRepository complaints) { this.complaints = complaints; }

    @Scheduled(fixedDelay = 60_000)
    @Transactional
    public void escalateOverdueComplaints() {
        long now = System.currentTimeMillis();
        List<Complaint> changed = new ArrayList<>();
        for (Complaint complaint : complaints.findOpenComplaints()) {
            long slaMillis = complaint.getSlaHours() * 3_600_000L;
            long deadline = complaint.getCreatedAt() + slaMillis;
            if (now <= deadline) continue;
            int level = Math.min(3, 1 + (int) ((now - deadline) / slaMillis));
            if (level <= complaint.getEscalationLevel()) continue;
            for (int next = complaint.getEscalationLevel() + 1; next <= level; next++) {
                complaint.addTimelineEvent(deadline + (next - 1L) * slaMillis,
                    "Auto-escalated to " + SUPERVISORS.get(next - 1), "SLA exceeded");
            }
            complaint.setEscalationLevel(level);
            complaint.setStatus("Escalated");
            complaint.setUpdatedAt(now);
            changed.add(complaint);
        }
        if (!changed.isEmpty()) complaints.saveAll(changed);
    }
}
