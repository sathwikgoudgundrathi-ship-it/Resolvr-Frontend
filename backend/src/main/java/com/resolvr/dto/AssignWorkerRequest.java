package com.resolvr.dto;

import jakarta.validation.constraints.NotBlank;

public class AssignWorkerRequest {

    @NotBlank(message = "Worker name is required")
    private String workerName;

    private String department;

    public AssignWorkerRequest() {
    }

    public AssignWorkerRequest(String workerName, String department) {
        this.workerName = workerName;
        this.department = department;
    }

    public String getWorkerName() {
        return workerName;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
