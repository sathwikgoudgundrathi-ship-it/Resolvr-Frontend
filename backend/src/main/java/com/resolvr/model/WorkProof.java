package com.resolvr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "work_proofs")
public class WorkProof {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "image_url")
    private String image;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String notes;

    @Column(name = "parts_used")
    private String partsUsed;

    @Column(name = "completed_by", nullable = false)
    private String completedBy;

    @Column(name = "completed_at", nullable = false)
    private Long completedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    @JsonBackReference
    private Complaint complaint;

    public WorkProof() {
    }

    public WorkProof(String image, String notes, String partsUsed, String completedBy, Long completedAt, Complaint complaint) {
        this.image = image;
        this.notes = notes;
        this.partsUsed = partsUsed;
        this.completedBy = completedBy;
        this.completedAt = completedAt;
        this.complaint = complaint;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPartsUsed() {
        return partsUsed;
    }

    public void setPartsUsed(String partsUsed) {
        this.partsUsed = partsUsed;
    }

    public String getCompletedBy() {
        return completedBy;
    }

    public void setCompletedBy(String completedBy) {
        this.completedBy = completedBy;
    }

    public Long getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Long completedAt) {
        this.completedAt = completedAt;
    }

    public Complaint getComplaint() {
        return complaint;
    }

    public void setComplaint(Complaint complaint) {
        this.complaint = complaint;
    }
}
