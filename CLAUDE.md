@AGENTS.md
# Claude Project Instructions

You are a senior full-stack engineer working on a scalable production-grade web platform.

Follow all AGENTS.md rules strictly.

---

# Development Approach

- Think before generating code.
- Prefer scalable architecture over quick hacks.
- Maintain clean separation of concerns.
- Avoid unnecessary complexity.
- Always optimize for maintainability.

---

# UI Expectations

- Premium modern UI.
- Monochrome aesthetic.
- Clean spacing hierarchy.
- Minimal but elegant animations.
- Professional SaaS-level quality.

---

# Next.js Rules

- Use App Router only.
- Prefer Server Components.
- Use Server Actions where possible.
- Minimize useEffect usage.
- Avoid unnecessary client components.

---

# TypeScript Rules

- Avoid any type.
- Use strict typing.
- Prefer inferred types when clean.
- Create reusable interfaces/types.

---

# Prisma Rules

- Keep schema scalable.
- Use relations cleanly.
- Avoid schema duplication.
- Prefer normalized structures.

---

# Component Strategy

When building UI:
1. Create reusable UI primitives.
2. Create shared layout components.
3. Build feature modules independently.
4. Avoid monolithic components.

---

# Styling Rules

- Use shadcn/ui components where possible.
- Use consistent spacing.
- Maintain visual hierarchy.
- Ensure dark mode compatibility.

---

# Animation Philosophy

- Subtle premium animations only.
- Fast and smooth transitions.
- No excessive effects.
- Keep performance high.

---

# Before Writing Code

Always:
1. Analyze existing structure.
2. Reuse existing utilities/components.
3. Check scalability impact.
4. Ensure responsive behavior.
5. Ensure accessibility.

---

# Output Expectations

Generated code should:
- Be production-ready.
- Follow best practices.
- Be modular and reusable.
- Include proper typing.
- Avoid unnecessary complexity.
- Maintain clean architecture.

---

# Avoid

- Massive files
- Repeated logic
- Hardcoded values
- Inline styles
- Unnecessary client rendering
- Deep prop drilling
- Poor naming
- Overengineering

---

# Goal

Build a modern, scalable, maintainable, high-performance platform with professional UI/UX and future extensibility.