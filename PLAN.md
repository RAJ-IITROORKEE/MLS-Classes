# MLS Classes — Implementation Plan

> Reference repo: `D:\Web development\PROJECTS-FULL STACK\unfiltered_iitians`
> Tech stack: Next.js 15 App Router · TypeScript · Tailwind · shadcn/ui · Prisma · MongoDB · better-auth · Framer Motion · Recharts

---

## STATUS LEGEND
- `[x]` Completed
- `[ ]` Pending
- `[~]` In progress

---

## PHASE 1 — Admin UI Fixes (Mocks)

> Goal: Match reference repo admin UI for question management. Bigger dialogs, better UX.

### 1A — MockFormModal size upgrade
- [x] Change `max-w-2xl` → `max-w-3xl` on the mock create/edit dialog
- **File:** `components/admin/mock-form-modal.tsx`

### 1B — Question Editor full rebuild
- [x] Replace dialog with `max-w-4xl max-h-[92vh] overflow-y-auto`
- [x] Replace question type `<Select>` with 4-button card picker (MCQ / MSQ / NAT / DESCRIPTIVE)
- [x] MCQ correct answer: dropdown `<Select>` showing `A. [option text]` instead of raw text input
- [x] MSQ correct answers: checkboxes on each option row; stores as `answer1;answer2`
- [x] MSQ selected answer preview strip below options
- [x] Image URL field with inline preview + X remove button
- [x] CSV modal expanded to `max-w-2xl` with proper format guide, drag-drop file zone, error/success states
- [x] "Clear All Questions" button (destructive, with AlertDialog confirmation)
- [x] Tooltip on question text, answer, option cells in table
- [x] Better `parseCSV` that handles quoted fields with commas
- **File:** `components/admin/question-editor.tsx`

### 1C — Admin Mocks Table (mocks-table.tsx)
- [ ] Verify "Manage Questions" link navigates correctly to `/admin/mocks/[id]`
- [ ] Ensure stats cards show correct counts
- **File:** `components/admin/mocks-table.tsx`

---

## PHASE 2 — User Dashboard (`/dashboard`)

> Goal: Build a full student dashboard at `/dashboard` route, accessible from navbar UserButton.
> Auth: better-auth session. No username in URL (unlike reference which uses Clerk + username routing).

### 2A — Dashboard page (server component)
- [ ] Create `app/(main)/dashboard/page.tsx`
- [ ] Auth guard: redirect to `/mocks/sign-in` if no session
- [ ] Fetch from DB:
  - User profile (`prisma.user.findUnique`)
  - All submitted `MockAttempt` records for user (with mock title + question count)
  - Total published mock count
  - Last attempt date
  - Average percentage across all attempts
- [ ] Pass data to `<DashboardClient />`
- **New file:** `app/(main)/dashboard/page.tsx`

### 2B — DashboardClient layout
- [ ] Create `components/dashboard/DashboardClient.tsx`
- [ ] Gradient header: "Student Dashboard"
- [ ] Welcome message with user name
- [ ] 3-column grid layout (responsive):
  - Col 1: `<ProfileCard />`
  - Col 2: `<MockPerformance />`
  - Col 3: `<QuickActions />`
- [ ] Below grid: `<RecentAttempts />` (last 5 attempts)
- [ ] Below recent attempts: `<BookTrialCTA />` and `<TestimonialsStrip />`
- **New file:** `components/dashboard/DashboardClient.tsx`

### 2C — ProfileCard component
- [ ] Create `components/dashboard/ProfileCard.tsx`
- [ ] Shows: avatar (user.image), full name, email, joined date
- [ ] "Edit Profile" toggle reveals inline form:
  - Name input
  - Image URL input (or Cloudinary upload)
  - Save button → calls `PATCH /api/user/profile`
- [ ] On success: optimistic update + toast
- **New file:** `components/dashboard/ProfileCard.tsx`

### 2D — MockPerformance card (Recharts donut)
- [ ] Create `components/dashboard/MockPerformance.tsx`
- [ ] Recharts `PieChart` donut: "Attempted" vs "Remaining"
- [ ] Center label: average % score
- [ ] Stats row: `X of Y mocks attempted` + last attempt date
- [ ] "View Full Performance" button → `/performance`
- **New file:** `components/dashboard/MockPerformance.tsx`

### 2E — QuickActions card
- [ ] Create `components/dashboard/QuickActions.tsx`
- [ ] Navigation links:
  - Practice Tests → `/mocks`
  - My Performance → `/performance`
  - Book Free Trial → `/book-trial`
  - Student Corner → `/student-corner`
- **New file:** `components/dashboard/QuickActions.tsx`

### 2F — RecentAttempts strip
- [ ] Create `components/dashboard/RecentAttempts.tsx`
- [ ] Last 5 submitted attempts: mock title, score %, date, "View Result" link
- [ ] Color-coded: green ≥70%, yellow 40–69%, red <40%
- **New file:** `components/dashboard/RecentAttempts.tsx`

### 2G — BookTrialCTA section (below dashboard)
- [ ] Reuse or adapt existing `CTASection` / `book-trial` page components
- [ ] Simple banner: headline + "Book Free Trial" button → `/book-trial`
- **New file or reuse:** `components/dashboard/BookTrialCTA.tsx`

### 2H — TestimonialsStrip (below dashboard)
- [ ] Fetch active testimonials from DB (`prisma.testimonial.findMany`)
- [ ] Horizontal scroll card strip with name, role, rating stars, text
- **New file:** `components/dashboard/TestimonialsStrip.tsx`

---

## PHASE 3 — Performance / Analytics Page (`/performance`)

> Goal: Full analytics page linked from dashboard and navbar. Shows all attempt history, charts, per-mock breakdown.

### 3A — Performance page (server component)
- [ ] Create `app/(main)/performance/page.tsx`
- [ ] Auth guard: redirect to `/mocks/sign-in` if no session
- [ ] Fetch all submitted `MockAttempt` records with mock test data
- [ ] Compute aggregates:
  - `totalAttempts`, `avgPercentage`, `totalCorrect`, `totalIncorrect`, `totalTime`
  - Per-mock: `bestScore`, `bestPercentage`, `totalAttempts`, `avgTime`, `lastAttemptDate`
  - `estimatedRank = max(1, floor(1000 - avgPercentage * 10))`
- [ ] Pass to `<PerformanceDashboardClient />`
- **New file:** `app/(main)/performance/page.tsx`

### 3B — PerformanceDashboardClient (Recharts)
- [ ] Create `components/dashboard/PerformanceDashboardClient.tsx`
- [ ] 4 stat summary cards: Total Attempts · Avg Score · Time Spent · Estimated Rank
- [ ] Chart 1 — Answer Distribution Pie: Correct / Incorrect / Unanswered (2-ring donut)
- [ ] Chart 2 — Progress Over Time Line: % score per attempt, x-axis = attempt date
- [ ] Chart 3 — Mock Comparison Bar: best score % per mock (shown if >1 mock attempted)
- **New file:** `components/dashboard/PerformanceDashboardClient.tsx`

### 3C — Per-mock breakdown cards
- [ ] Grid of cards, one per attempted mock
- [ ] Remark badge: Excellent (≥80%) · Good (≥60%) · Average (≥40%) · Needs Improvement
- [ ] Stats: best score, best %, avg time, last attempt date
- [ ] Action buttons: "Retake" → `/mocks/[id]/start` · "View All Attempts" → `/mocks/[id]/attempts`
- [ ] Included inside `PerformanceDashboardClient.tsx` as a section

---

## PHASE 4 — Profile Update API

> Goal: Allow users to update their name and profile image from the dashboard.

### 4A — API route
- [ ] Create `app/api/user/profile/route.ts`
- [ ] `PATCH` handler: auth guard → validate body (name?, image?) → `prisma.user.update`
- [ ] Returns updated user object
- **New file:** `app/api/user/profile/route.ts`

### 4B — Navbar UserButton update
- [ ] Verify "Dashboard" link in UserButton dropdown points to `/dashboard` ✓ (already `/dashboard`)
- [ ] Add "My Performance" link to dropdown → `/performance`
- **File:** `components/auth/user-button.tsx`

---

## PHASE 5 — Bug Fixes & Build Check

> Goal: Zero build errors, zero TypeScript errors, no broken pages.

### 5A — Admin mocks-table bugs
- [ ] Verify `mocks-table.tsx` "Manage Questions" action correctly navigates
- [ ] Check search + pagination state on mock list
- **File:** `components/admin/mocks-table.tsx`

### 5B — Mocks frontend bugs
- [ ] Check `mocks-listing-client.tsx` tab switching and card rendering
- [ ] Check `mock-start-client.tsx` access state display
- [ ] Check attempt timer auto-submit edge cases
- **Files:** `app/(main)/mocks/_components/`

### 5C — Auth flow
- [ ] Verify sign-in / sign-up pages work with better-auth
- [ ] Verify Google OAuth redirect correctly
- [ ] Verify session is available in all protected routes

### 5D — Run build
- [ ] `npm run build` — fix all TypeScript errors
- [ ] `npm run lint` — fix all lint warnings/errors
- [ ] Verify no missing imports, no unused variables blocking build

---

## FILE MAP — New Files to Create

```
app/
├── (main)/
│   ├── dashboard/
│   │   └── page.tsx                          ← Phase 2A
│   └── performance/
│       └── page.tsx                          ← Phase 3A
├── api/
│   └── user/
│       └── profile/
│           └── route.ts                      ← Phase 4A

components/
└── dashboard/
    ├── DashboardClient.tsx                   ← Phase 2B
    ├── ProfileCard.tsx                       ← Phase 2C
    ├── MockPerformance.tsx                   ← Phase 2D
    ├── QuickActions.tsx                      ← Phase 2E
    ├── RecentAttempts.tsx                    ← Phase 2F
    ├── BookTrialCTA.tsx                      ← Phase 2G
    ├── TestimonialsStrip.tsx                 ← Phase 2H
    └── PerformanceDashboardClient.tsx        ← Phase 3B
```

---

## FILES ALREADY MODIFIED

| File | Change |
|---|---|
| `components/admin/mock-form-modal.tsx` | Dialog size `max-w-2xl` → `max-w-3xl` |
| `components/admin/question-editor.tsx` | Full rebuild — bigger dialog, MCQ dropdown, MSQ checkboxes, better CSV modal, Clear All |

---

## KEY CONSTRAINTS

- **Auth**: better-auth (not Clerk). Use `auth.api.getSession({ headers: await headers() })` in server components.
- **DB**: Prisma with MongoDB. No `_id` field — use `id` (cuid/nanoid). `MockAttempt` stores `score`, `percentage`, `correctCount` etc. directly — do NOT recalculate on client.
- **Charts**: recharts v3 (already installed). Use `ResponsiveContainer` wrapper.
- **Routing**: No username in URL. Dashboard = `/dashboard`, Performance = `/performance`.
- **UserButton**: Already links to `/dashboard` — just need the page to exist.
- **Testimonials**: Already in DB (`prisma.testimonial`). Already shown on home page via `TestimonialsSectionHome`.
- **Book Trial**: Already exists at `/book-trial`. Just link to it from dashboard.
- **Styling**: Dark/light mode support. Use `cn()` for class merging. Tailwind only — no inline styles.
- **Components**: Reuse existing shadcn/ui primitives. Check `components/ui/` before creating new ones.

---

## TASK EXECUTION ORDER (for switching models per task)

| # | Task | Phase | Complexity |
|---|---|---|---|
| 1 | Verify admin table + question editor works end-to-end | 1C | Low |
| 2 | `app/api/user/profile/route.ts` | 4A | Low |
| 3 | `app/(main)/dashboard/page.tsx` | 2A | Medium |
| 4 | `components/dashboard/DashboardClient.tsx` | 2B | Medium |
| 5 | `components/dashboard/ProfileCard.tsx` | 2C | Medium |
| 6 | `components/dashboard/MockPerformance.tsx` | 2D | Medium |
| 7 | `components/dashboard/QuickActions.tsx` | 2E | Low |
| 8 | `components/dashboard/RecentAttempts.tsx` | 2F | Low |
| 9 | `components/dashboard/BookTrialCTA.tsx` | 2G | Low |
| 10 | `components/dashboard/TestimonialsStrip.tsx` | 2H | Low |
| 11 | Update `components/auth/user-button.tsx` | 4B | Low |
| 12 | `app/(main)/performance/page.tsx` | 3A | Medium |
| 13 | `components/dashboard/PerformanceDashboardClient.tsx` | 3B+3C | High |
| 14 | Fix any frontend mocks bugs | 5B | Medium |
| 15 | `npm run build` + fix all errors | 5D | Medium |
