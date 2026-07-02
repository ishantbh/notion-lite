# Notion Lite - Full-Stack Modern Notes Management System

A production-inspired full-stack notes application built with the modern Next.js ecosystem.
It demonstrates authentication, relational data modeling, optimistic UI, caching strategies, and scalable React architecture.

---

## 📑 Table of Contents

- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture-overview)
- [Key Features Implementation](#key-features-implementation)
- [What This Project Demonstrates](#what-this-project-demonstrates)
- [Run Locally](#run-locally)
- [Key Engineering Decisions](#key-engineering-decisions)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## Live Demo

> [https://notion-lite-notes.vercel.app/](https://notion-lite-notes.vercel.app/)

---

## Screenshots

<p align='center'>
  <img src="public/screenshots/landing-page.png" width="30%" alt='Landing page' />
  <img src="public/screenshots/dashboard-dark.png" width="30%" alt='Dashboard' />
  <img src="public/screenshots/note-details-dark.png" width="30%" alt='Note details' />
</p>

<p align="center">
  <img src="public/screenshots/note-edit-dark.png" width="30%" alt='Note Edit' />
  <img src="public/screenshots/trash-dark.png" width="30%" alt='Trash page' />
  <img src="public/screenshots/login-page.png" width="30%" alt='Login page' />
</p>

---

## Features

### Authentication & Security

- Secure authentication powered by **Better Auth**
- Protected routes and session handling
- Clean login / signup flow with error states and toasts

---

### Notes Management

- Create, update, delete (soft delete + permanent delete)
- Star important notes
- View full note details
- Timestamped updates (updated-at sorting)

---

### Tags System (Many-to-Many)

- Each note can have multiple tags
- Tags can be created on the fly
- Dedicated tag pages
- Sidebar tag counts with real-time updates

---

### Search & Navigation

- Debounced search
- URL-synced search and pagination state
- Fast filtering across notes
- Paginated results for scalability

---

### Smart UX Patterns

- Optimistic UI updates (e.g. starring notes instantly)
- Loading skeletons for perceived performance
- Toast notifications for all user actions (via Sonner)
- Confirmation dialogs for destructive actions

---

### UI & Architecture

- Fully reusable sidebar layout across authenticated pages
- Modular component design
- Consistent UI system using **shadcn/ui**
- Responsive grid-based layout for notes

---

## Tech Stack

### Frontend

- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **shadcn/ui**

### Backend / Data

- **PostgreSQL**
- **Drizzle ORM**
- **Server Actions (Next.js)**

### Auth

- **Better Auth**

### State Management / Data Fetching

- **TanStack Query**

### Forms & Validation

- **React Hook Form**
- **Zod**

### UX Enhancements

- **Sonner (toasts)**
- **Optimistic UI updates**
- **Debounced search**

---

## Architecture Overview

The app follows a modern full-stack Next.js architecture:

- Server Components for data-heavy rendering
- Server Actions for mutations (create/update/delete)
- Client Components for interactive UI
- TanStack Query for caching and client-state synchronization
- Drizzle ORM for type-safe database queries

### Data Model

- `Notes`
- `Tags`
- `NoteTags` (many-to-many relationship)

---

## Key Features Implementation

### Optimistic Updates

Star/unstar actions update instantly in UI using `useOptimistic`, while syncing in the background.

---

### Soft Delete System

Notes are never immediately destroyed:

- Soft delete → moves to trash
- Restore → recover notes
- Permanent delete → final removal

---

### Search System

- Debounced input
- Query stored in URL params
- Server-side filtering with pagination

---

### Form System

- React Hook Form for performance
- Zod schemas for validation
- Reusable create/edit note form
- Tag creation directly inside form (no navigation needed)

---

## What This Project Demonstrates

This is not just a CRUD notes app.

It demonstrates:

- Real-world authentication flow
- Relational database modeling
- Scalable UI architecture
- Performance-aware state management
- UX-focused engineering decisions
- Production-style folder structure

---

## Run Locally

```bash
git clone https://github.com/ishantbh/notion-lite.git
cd notion-lite
bun install
```

### Environment Variables

```env
DATABASE_URL=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
```

### Run Development Server

```bash
bun dev
```

---

## Key Engineering Decisions

- Server Actions used instead of REST API routes for simplicity and colocation
- TanStack Query used selectively (not overused) for client caching
- Optimistic updates implemented only where UX benefit is meaningful
- Soft delete chosen over hard delete for safer UX patterns
- Many-to-many tag system designed for scalability

---

## Future Improvements

- Rich text editor (Markdown / WYSIWYG)
- Full-text search indexing
- Note sharing / collaboration
- Version history

---

## Author

**Ishant Bhurani**

- GitHub: [https://github.com/ishantbh](https://github.com/ishantbh)
- LinkedIn: [https://www.linkedin.com/in/ishant-bhurani/](https://www.linkedin.com/in/ishant-bhurani/)

---

## License

This project is for portfolio/demo purposes.

---
