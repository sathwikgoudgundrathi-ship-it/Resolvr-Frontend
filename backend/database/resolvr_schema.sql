-- ====================================================================
-- SMART COMPLAINT & SERVICE REQUEST RESOLUTION PLATFORM (RESOLVR)
-- MySQL Database Initialization & Schema Script
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `resolvr_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `resolvr_db`;

-- 1. Users Table (Citizens, Field Workers, Admins)
CREATE TABLE IF NOT EXISTS `users` (
    `id` VARCHAR(64) NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(20) NOT NULL COMMENT 'PUBLIC, WORKER, ADMIN',
    `department` VARCHAR(100) DEFAULT NULL COMMENT 'e.g. Maintenance, Water Works, Sanitation, Public Works',
    `phone` VARCHAR(30) DEFAULT NULL,
    `created_at` BIGINT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Complaints Table
CREATE TABLE IF NOT EXISTS `complaints` (
    `id` VARCHAR(32) NOT NULL PRIMARY KEY COMMENT 'CMP-4810, CMP-4811, etc.',
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL COMMENT 'Electrical, Plumbing, Sanitation, Roads, Security, IT & Network, Noise, General',
    `priority` VARCHAR(30) NOT NULL COMMENT 'Critical, High, Medium, Low',
    `department` VARCHAR(100) NOT NULL,
    `confidence` DOUBLE NOT NULL,
    `status` VARCHAR(30) NOT NULL COMMENT 'Submitted, Assigned, In Progress, Escalated, Resolved',
    `sla_hours` INT NOT NULL,
    `escalation_level` INT NOT NULL DEFAULT 0,
    `assignee` VARCHAR(100) NOT NULL,
    `reporter` VARCHAR(100) NOT NULL,
    `reporter_email` VARCHAR(150) NOT NULL,
    `image_url` MEDIUMTEXT DEFAULT NULL,
    `rating` INT DEFAULT NULL,
    `feedback` TEXT DEFAULT NULL,
    `created_at` BIGINT NOT NULL,
    `updated_at` BIGINT NOT NULL,
    KEY `idx_complaints_reporter_email` (`reporter_email`),
    KEY `idx_complaints_assignee_department` (`assignee`, `department`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Work Proofs Table (Completed work uploaded by field workers)
CREATE TABLE IF NOT EXISTS `work_proofs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `complaint_id` VARCHAR(32) NOT NULL,
    `image_url` MEDIUMTEXT DEFAULT NULL COMMENT 'Photo evidence of completed repair',
    `notes` TEXT NOT NULL COMMENT 'Work summary/actions taken',
    `parts_used` VARCHAR(255) DEFAULT NULL,
    `completed_by` VARCHAR(100) NOT NULL,
    `completed_at` BIGINT NOT NULL,
    UNIQUE KEY `uk_work_proof_complaint` (`complaint_id`),
    CONSTRAINT `fk_work_proof_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Timeline Events Table (Audit logs & SLA escalation history)
CREATE TABLE IF NOT EXISTS `timeline_events` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `complaint_id` VARCHAR(32) NOT NULL,
    `at_timestamp` BIGINT NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `note` TEXT DEFAULT NULL,
    CONSTRAINT `fk_timeline_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create accounts through POST /api/auth/register. Passwords are stored as BCrypt hashes.
