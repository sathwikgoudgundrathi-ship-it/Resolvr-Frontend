package com.resolvr.dto;

import com.resolvr.model.Role;
import com.resolvr.model.User;

public class AuthResponse {
    private boolean success;
    private String message;
    private UserData user;

    public AuthResponse() {
    }

    public AuthResponse(boolean success, String message, User userEntity) {
        this.success = success;
        this.message = message;
        if (userEntity != null) {
            this.user = new UserData(
                userEntity.getId(),
                userEntity.getName(),
                userEntity.getEmail(),
                userEntity.getRole().name().toLowerCase(),
                userEntity.getDepartment(),
                userEntity.getPhone(),
                userEntity.getCreatedAt()
            );
        }
    }

    public static AuthResponse error(String message) {
        AuthResponse res = new AuthResponse();
        res.setSuccess(false);
        res.setMessage(message);
        return res;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }

    public static class UserData {
        private String id;
        private String name;
        private String email;
        private String role;
        private String department;
        private String phone;
        private Long createdAt;

        public UserData(String id, String name, String email, String role, String department, String phone, Long createdAt) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
            this.department = department;
            this.phone = phone;
            this.createdAt = createdAt;
        }

        public String getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
        public String getDepartment() { return department; }
        public String getPhone() { return phone; }
        public Long getCreatedAt() { return createdAt; }
    }
}
