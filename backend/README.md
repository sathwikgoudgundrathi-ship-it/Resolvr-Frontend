# Resolvr Spring Boot API

Requires Java 17+ and MySQL 8+. The backend starts on `http://localhost:8082`.

## Database

MySQL database `resolvr_db` is created automatically when the configured database user has create-database permission. Alternatively, run `database/resolvr_schema.sql` with a MySQL account that can create databases. The schema creates users, complaints, work proofs, and timeline events. Create accounts through the API; passwords are BCrypt hashed.

Configure connection values with environment variables:

```sh
export DB_HOST=localhost DB_PORT=3306 DB_NAME=resolvr_db
export DB_USERNAME=root
read -s DB_PASSWORD
export DB_PASSWORD
mvn spring-boot:run
```

For a local in-memory database instead, run `mvn spring-boot:run -Dspring-boot.run.profiles=h2`.

## API

- `GET /api/health`
- `POST /api/auth/register` with `name`, `email`, `password`, and optional `department`, `phone`. Role is assigned by email on the server.
- `POST /api/auth/login` with `email` and `password`
- `GET /api/auth/session` and `POST /api/auth/logout`
- `GET /api/users/workers` (administrator session only)
- `GET /api/complaints` (optional `status` and `department` filters)
- `GET /api/complaints/{id}`
- `POST /api/complaints`
- `PATCH /api/complaints/{id}/status` with `{ "status": "In Progress" }`
- `PATCH /api/complaints/{id}/assign` with `{ "workerName": "...", "department": "..." }`
- `POST /api/complaints/{id}/proof` with `{ "notes": "...", "completedBy": "...", "image": "...", "partsUsed": "..." }`
- `PATCH /api/complaints/{id}/feedback` with `{ "rating": 5, "feedback": "..." }`

The frontend uses the API for registration, sign-in, complaint creation and reading, assignment, status changes, completion proof, feedback, and SLA escalation. Authentication uses an HttpOnly server session cookie. New accounts default to citizens; set `ADMIN_EMAIL` and `WORKER_EMAIL` to configure privileged accounts (defaults are `sathwikgoudgundrathi@gmail.com` and `bhairav@gmail.com`). Register each account using that email to create its database user. All other account emails receive the citizen role.

Create the database schema with `mysql -u root -p < backend/database/resolvr_schema.sql`. If you previously created the schema before this update, run `database/migrations/002_reporter_email.sql` once to add reporter ownership for existing complaints.
