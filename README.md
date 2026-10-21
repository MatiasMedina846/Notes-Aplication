# Notes App — full-stack notes manager

**EN** — Full-stack notes application built as a technical challenge: create, edit, delete, archive and tag notes, with a clean responsive UI. Backend: Spring Boot 4 + Spring Data JPA + MySQL, layered as controller / service / repository. Frontend: Angular (standalone components) talking to the REST API.

**ES** — Aplicación full-stack de notas hecha como desafío técnico: crear, editar, eliminar, archivar y etiquetar notas, con una interfaz limpia y responsive.

## Features / Funcionalidades

- CRUD de notas (crear, leer, editar, eliminar). / Notes CRUD.
- Archivar y desarchivar notas, con listados separados de activas y archivadas. / Archive and unarchive.
- Etiquetas (tags) para organizar y filtrar. / Tags to organize and filter.
- Interfaz minimalista y responsive en Angular. / Minimal responsive UI.

## Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 21, Spring Boot 4, Spring Data JPA, Maven |
| Database | MySQL 8 |
| Frontend | Angular (standalone components), TypeScript, CSS |

## Requirements / Requisitos

- Java 21+
- Node.js LTS
- MySQL 8 running on `localhost:3306` (the `notes_db` database is created automatically)

## Run it / Cómo correrlo

```bash
# Backend  → http://localhost:8080
cd backend
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run

# Frontend → http://localhost:4200
cd frontend
npm install
npm start
```

On Windows you can also run `run.bat` from the project root, which starts both.

The backend connects with user `root` and an empty password by default. Override it with environment variables:

| Variable | Default |
|----------|---------|
| `DB_URL` | `jdbc:mysql://localhost:3306/notes_db?...` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | *(empty)* |

## REST API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/notes` | Create a note |
| GET | `/api/notes/active` | List active notes |
| GET | `/api/notes/archived` | List archived notes |
| PUT | `/api/notes/{id}` | Update a note |
| PATCH | `/api/notes/{id}/toggle-archive` | Archive / unarchive |
| DELETE | `/api/notes/{id}` | Delete a note |
| GET / POST | `/api/notes/tags` | List / create tags |
| GET | `/api/notes/tags/{tagId}` | Notes by tag |
| DELETE | `/api/notes/tags/{id}` | Delete a tag |

---
Author: [Matias Medina](https://github.com/MatiasMedina846) · [LinkedIn](https://www.linkedin.com/in/matias-medina-german/)
