package com.resolvr.model;

public enum Role {
    PUBLIC,
    WORKER,
    ADMIN;

    public static Role fromString(String value) {
        if (value == null) return PUBLIC;
        try {
            return Role.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return PUBLIC;
        }
    }
}
