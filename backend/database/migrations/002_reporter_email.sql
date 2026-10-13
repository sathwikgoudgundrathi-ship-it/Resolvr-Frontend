USE `resolvr_db`;

-- Run once on databases created with the earlier schema, which did not link
-- complaints to a reporter email address.
ALTER TABLE `complaints`
    ADD COLUMN `reporter_email` VARCHAR(150) NOT NULL DEFAULT '' AFTER `reporter`;

CREATE INDEX `idx_complaints_reporter_email` ON `complaints` (`reporter_email`);
CREATE INDEX `idx_complaints_assignee_department` ON `complaints` (`assignee`, `department`);
