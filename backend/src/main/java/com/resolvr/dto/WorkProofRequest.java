package com.resolvr.dto;

import jakarta.validation.constraints.NotBlank;

public class WorkProofRequest {

    private String image;

    @NotBlank(message = "Completion remarks/notes are required")
    private String notes;

    private String partsUsed;

    @NotBlank(message = "Technician name is required")
    private String completedBy;

    public WorkProofRequest() {
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
}
