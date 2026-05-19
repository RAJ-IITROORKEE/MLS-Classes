# Project Engineering Guidelines

## Tech Stack

- Next.js 15+ App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- MongoDB
- Framer Motion
- next-themes

---

# Core Principles

- Build scalable and maintainable systems.
- Prefer composition over duplication.
- Prefer server components whenever possible.
- Use client components only when interactivity is required.
- Prioritize performance, readability, and modularity.
- Every component should be reusable and isolated.
- Avoid tight coupling between features.
- Keep business logic outside UI components.

---


# Component Rules

- Use functional components only.
- Use TypeScript everywhere.
- Extract reusable logic into hooks.
- Avoid prop drilling.
- Prefer server actions over API routes when possible.
- Use loading.tsx and error.tsx properly.

---

# UI/UX Standards

- Modern monochrome premium aesthetic.
- Fully responsive on mobile, tablet, desktop.
- Support both dark and light mode.
- Use smooth subtle animations.
- Maintain visual consistency.
- Use spacing system consistently.
- Use semantic HTML.
- Prioritize accessibility.

---

# Styling Rules

- Use Tailwind utility classes.
- Use cn() utility for class merging.
- Avoid inline styles.
- Use design tokens and CSS variables.
- Maintain consistent spacing and typography.

---

# Animation Rules

- Use Framer Motion.
- Keep animations subtle and premium.
- Avoid excessive motion.
- Prefer opacity, blur, translate animations.
- Keep page transitions performant.

---

# Database Rules

- Use Prisma ORM.
- Keep schema modular and scalable.
- Use proper indexing strategy.
- Avoid deeply nested documents in MongoDB.
- Use UUID/cuid identifiers.

---

# Performance Rules

- Optimize images and fonts.
- Minimize client-side JavaScript.
- Use dynamic imports where needed.
- Avoid unnecessary re-renders.
- Use memoization only when beneficial.

---

# Security Rules

- Validate all user input.
- Never expose secrets.
- Use server-side validation.
- Sanitize database inputs.
- Implement proper authentication guards.

---

# Naming Conventions

## Components
PascalCase

Example:
UserCard.tsx

## Hooks
camelCase starting with use

Example:
useAuth.ts

## Files
kebab-case for utilities

Example:
format-date.ts

---

# Code Quality

- Write self-documenting code.
- Avoid comments unless necessary.
- Prefer descriptive variable names.
- Keep functions focused and small.
- Avoid massive files.

---

# Preferred Libraries

## Forms
react-hook-form + zod

## Validation
zod

## Animations
framer-motion

## Icons
lucide-react

## Tables
tanstack-table

---

# Development Workflow

- Build reusable systems first.
- Avoid hardcoding values.
- Create shared abstractions.
- Maintain design consistency.
- Think long-term scalability.

---

# Important

Before creating new components:
1. Check if reusable component already exists.
2. Check if logic can be abstracted.
3. Ensure responsiveness.
4. Ensure dark/light compatibility.
5. Ensure accessibility.