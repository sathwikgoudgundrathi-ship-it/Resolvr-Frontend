package com.resolvr.controller;

import com.resolvr.dto.AuthResponse;
import com.resolvr.dto.LoginRequest;
import com.resolvr.dto.RegisterRequest;
import com.resolvr.model.Role;
import com.resolvr.model.User;
import com.resolvr.repository.UserRepository;
import jakarta.validation.Valid;
import java.util.Locale;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8080", "http://127.0.0.1:8081"}, allowCredentials = "true")
public class AuthController {
    private final UserRepository users;
    private final String adminEmail;
    private final String workerEmail;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public AuthController(UserRepository users,
            @Value("${app.auth.admin-email}") String adminEmail,
            @Value("${app.auth.worker-email}") String workerEmail) {
        this.users = users;
        this.adminEmail = adminEmail.trim().toLowerCase(Locale.ROOT);
        this.workerEmail = workerEmail.trim().toLowerCase(Locale.ROOT);
    }

    @PostMapping("/register") @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest req, HttpSession session) {
        String email = req.getEmail().trim().toLowerCase(Locale.ROOT);
        if (users.existsByEmailIgnoreCase(email)) throw new ResponseStatusException(HttpStatus.CONFLICT, "This email is already registered");
        if (req.getPassword() == null || req.getPassword().length() < 8) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must contain at least 8 characters");
        Role role = roleFor(email);
        User user = new User("usr_" + UUID.randomUUID(), req.getName().trim(), email,
                encoder.encode(req.getPassword()), role, role == Role.WORKER ? req.getDepartment() : null,
                req.getPhone(), System.currentTimeMillis());
        User saved = users.save(user);
        session.setAttribute("RESOLVR_USER_ID", saved.getId());
        return new AuthResponse(true, "Account created", saved);
    }

    @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest req, HttpSession session) {
        User user = users.findByEmailIgnoreCase(req.getEmail().trim()).orElse(null);
        if (user == null || req.getPassword() == null || !encoder.matches(req.getPassword(), user.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        Role assignedRole = roleFor(user.getEmail());
        if (user.getRole() != assignedRole) {
            user.setRole(assignedRole);
            if (assignedRole == Role.WORKER && (user.getDepartment() == null || user.getDepartment().isBlank())) user.setDepartment("Maintenance");
            users.save(user);
        }
        session.setAttribute("RESOLVR_USER_ID", user.getId());
        return new AuthResponse(true, "Signed in", user);
    }

    @GetMapping("/session") public AuthResponse session(HttpSession session) {
        Object id = session.getAttribute("RESOLVR_USER_ID");
        if (!(id instanceof String userId)) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sign in required");
        User user = users.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sign in required"));
        Role role = roleFor(user.getEmail());
        if (user.getRole() != role) { user.setRole(role); users.save(user); }
        return new AuthResponse(true, "Signed in", user);
    }

    @PostMapping("/logout") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpSession session) { session.invalidate(); }

    private Role roleFor(String email) {
        if (email.equals(adminEmail)) return Role.ADMIN;
        if (email.equals(workerEmail)) return Role.WORKER;
        return Role.PUBLIC;
    }
}
