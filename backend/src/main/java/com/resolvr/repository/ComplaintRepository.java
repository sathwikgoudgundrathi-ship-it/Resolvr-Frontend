package com.resolvr.repository;

import com.resolvr.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, String> {
    List<Complaint> findByStatus(String status);
    List<Complaint> findByDepartment(String department);
    List<Complaint> findByAssignee(String assignee);
    List<Complaint> findByReporterIgnoreCase(String reporter);
    List<Complaint> findByReporterEmailIgnoreCase(String reporterEmail);
    List<Complaint> findByAssigneeIgnoreCaseOrDepartmentIgnoreCase(String assignee, String department);
    List<Complaint> findAllByOrderByCreatedAtDesc();

    @Query("SELECT c FROM Complaint c WHERE c.status <> 'Resolved'")
    List<Complaint> findOpenComplaints();
}
