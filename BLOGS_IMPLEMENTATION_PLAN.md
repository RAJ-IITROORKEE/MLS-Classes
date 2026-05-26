# BLOGS SYSTEM — Implementation Plan

> Tech Stack: Next.js 15 App Router · TypeScript · Tailwind · shadcn/ui · Prisma · MongoDB · Framer Motion
> Approach: Frontend-first (static/sample data) → Backend integration later

---

## OVERVIEW

Build a professional blogging system with:
- **Admin Panel**: Full CRUD for blogs (similar to mocks management)
- **Public Pages**: Modern listing with search, categories, filters
- **Design**: Premium monochrome aesthetic, full dark/light mode support, responsive

---

## PHASE 1 — Database Schema Updates

### 1A — Add Blog Models to Prisma
**File:** `prisma/schema.prisma`

```prisma
enum BlogStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model BlogCategory {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  name          String   @unique
  slug          String   @unique
  description   String?
  color         String?  @default("#000000")
  icon          String?
  order         Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  blogs Blog[]

  @@index([slug])
}

model Blog {
  id              String       @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  slug            String       @unique
  excerpt         String
  content         String       // Markdown or HTML
  author          String?      @default("MLS Classes")
  categoryId      String       @db.ObjectId
  imageUrl        String?
  imagePublicId   String?
  featured        Boolean      @default(false)
  readingTime     Int?         // minutes
  views           Int          @default(0)
  status          BlogStatus   @default(DRAFT)
  publishedAt     DateTime?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  category BlogCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@index([slug])
  @@index([status])
  @@index([categoryId])
  @@index([featured])
  @@index([publishedAt])
}
```

---

## PHASE 2 — Route Structure

```
app/
├── (admin)/
│   └── admin/
│       └── blogs/
│           ├── page.tsx                 ← Admin blogs list
│           ├── [id]/
│           │   └── page.tsx             ← Edit blog (redirect to modal)
│           └── new/
│               └── page.tsx             ← Create new blog (redirect to modal)
│
└── (main)/
    └── blogs/
        ├── page.tsx                     ← Public blogs listing
        └── [slug]/
            └── page.tsx                 ← Individual blog detail
```

---

## PHASE 3 — Admin Side Components & Pages

### 3A — Admin Blogs List Page
**File:** `app/(admin)/admin/blogs/page.tsx`
- Server component
- Fetch all blogs (paginated)
- Display in table format
- Search by title
- Filter by category & status
- Quick actions: Edit, Publish, Archive, Delete

### 3B — Blogs Table Component
**File:** `components/admin/blogs-table.tsx`
- Similar to mocks-table.tsx
- Columns: Title, Category, Status, Views, Created, Updated, Actions
- Sorting by title, date, views
- Pagination (10-20 per page)
- Bulk actions (delete multiple)
- Inline status badge (Draft, Published, Archived)

### 3C — Blog Form Modal
**File:** `components/admin/blog-form-modal.tsx`
- Dialog: max-w-4xl, max-h-[92vh]
- Fields:
  - Title (required)
  - Slug (auto-generate from title, editable)
  - Excerpt (short description)
  - Category dropdown
  - Featured checkbox
  - Status: Draft/Published/Archived (card picker)
  - Image upload (Cloudinary)
  - Content editor (rich text or markdown)
  - Reading time (auto-calculated or manual)
  - Author field
- Actions: Save, Save & Publish, Cancel

### 3D — Blog Content Editor
**File:** `components/admin/blog-content-editor.tsx`
- Rich text editor (or simple textarea for MVP)
- Preview pane
- Markdown support
- Insert image/link helpers
- Character count

### 3E — Admin Blogs Create/Edit Pages
**File:** `app/(admin)/admin/blogs/[id]/page.tsx`
- Render `<BlogFormModal />` on page load
- On save, redirect to `/admin/blogs` with success toast

---

## PHASE 4 — Public Pages & Components

### 4A — Public Blogs Listing Page
**File:** `app/(main)/blogs/page.tsx`
- **Server Component** fetching published blogs
- Hero section: "Insights & Resources"
- Featured blogs carousel (3-4 featured blogs)
- Search bar (client-side filtering for MVP)
- Category filter sidebar
- Blog grid (responsive: 1 col mobile, 2 tablet, 3 desktop)
- Pagination or "Load More"
- Footer CTA section

### 4B — Blogs Listing Client Component
**File:** `components/blogs/blogs-listing-client.tsx`
- Client component for interactivity
- State: selectedCategory, searchQuery, currentPage
- Render filtered blogs
- Smooth category transitions
- Search suggestions

### 4C — Blog Card Component
**File:** `components/blogs/blog-card.tsx`
- Image with overlay gradient
- Category badge
- Title (2-3 lines max)
- Excerpt (2 lines max)
- Meta: Author, Date, Reading Time
- Hover effect with link
- Dark mode optimized

### 4D — Featured Blogs Carousel
**File:** `components/blogs/featured-carousel.tsx`
- Embla carousel or simple grid
- 3-4 featured blogs
- Large image, title, excerpt
- Auto-play with manual controls
- Smooth transitions

### 4E — Category Sidebar Filter
**File:** `components/blogs/category-sidebar.tsx`
- List of categories with color coding
- Active state highlighting
- Blog count per category
- Responsive: sidebar on desktop, dropdown on mobile

### 4F — Search Bar Component
**File:** `components/blogs/blog-search.tsx`
- Autocomplete suggestions
- Clear button
- Icon & styling

### 4G — Individual Blog Detail Page
**File:** `app/(main)/blogs/[slug]/page.tsx`
- **Server Component**
- Hero section: large image + title
- Metadata: Author, Published Date, Category, Reading Time
- Breadcrumb navigation
- Table of Contents (auto-generated from headings)
- Blog content
- Related blogs section (3-4 related posts)
- Share buttons (social)
- Comments section (static placeholder for now)
- Navigation: Previous/Next blog

### 4H — Blog Detail Client Components
**File:** `components/blogs/blog-detail-client.tsx`
- Client wrapper for interactivity
- TOC scroll sync
- Mobile-friendly layout

### 4I — Related Blogs Section
**File:** `components/blogs/related-blogs.tsx`
- Fetch 3-4 blogs from same category
- Card grid display

### 4J — Blog TOC (Table of Contents)
**File:** `components/blogs/blog-toc.tsx`
- Auto-generate from h2/h3 headings
- Sticky sidebar (desktop) or collapsible (mobile)
- Active section highlighting

---

## PHASE 5 — Styling & UX

### Design System
- **Colors**: Monochrome (black/white/grays)
- **Accent**: Subtle gradient or highlight color
- **Typography**: Clean sans-serif (Roboto)
- **Spacing**: Consistent rhythm (4px grid)
- **Borders**: Minimal, subtle grays
- **Shadows**: Soft, subtle for depth

### Dark Mode
- All components support dark mode via `next-themes`
- Blog content readable in both themes
- Images with proper contrast

### Responsive Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

### Animations
- Framer Motion for subtle transitions
- Image fade-in on scroll
- Category filter smooth transition
- Page transitions

---

## PHASE 6 — Sample Data & Testing

### 6A — Create Sample Blogs
Generate 12-15 sample blogs covering:
- "10 Tips for JEE Preparation"
- "SAT vs ACT: Which is Right for You?"
- "How to Manage Time During Exams"
- "Understanding Mock Tests"
- "Best Study Strategies for Different Learning Styles"
- etc.

### 6B — Categories
- Exam Prep
- Study Tips
- Student Stories
- College Guidance
- Academics

---

## PHASE 7 — Backend Integration (Later)

### 7A — Dynamic Content
- API endpoints: `GET /api/blogs`, `GET /api/blogs/[slug]`, etc.
- Query caching with Next.js
- Revalidation strategy

### 7B — Admin API Routes
- `POST /api/admin/blogs` (create)
- `PATCH /api/admin/blogs/[id]` (update)
- `DELETE /api/admin/blogs/[id]` (delete)
- Authentication guard on all routes

### 7C — View Tracking
- Increment views on blog detail page load
- Display view counts on listing

### 7D — Comments System
- Replace static placeholder with real comments
- Moderation queue for admin

---

## FILE STRUCTURE OVERVIEW

```
app/
├── (admin)/
│   └── admin/
│       └── blogs/
│           ├── page.tsx                 ✨ NEW
│           ├── [id]/
│           │   └── page.tsx             ✨ NEW
│           └── new/
│               └── page.tsx             ✨ NEW

└── (main)/
    └── blogs/
        ├── page.tsx                     ✨ NEW
        └── [slug]/
            └── page.tsx                 ✨ NEW

components/
├── admin/
│   ├── blogs-table.tsx                  ✨ NEW
│   ├── blog-form-modal.tsx              ✨ NEW
│   └── blog-content-editor.tsx          ✨ NEW

└── blogs/
    ├── blog-card.tsx                    ✨ NEW
    ├── blogs-listing-client.tsx         ✨ NEW
    ├── featured-carousel.tsx            ✨ NEW
    ├── category-sidebar.tsx             ✨ NEW
    ├── blog-search.tsx                  ✨ NEW
    ├── blog-detail-client.tsx           ✨ NEW
    ├── related-blogs.tsx                ✨ NEW
    ├── blog-toc.tsx                     ✨ NEW
    └── blog-meta.tsx                    ✨ NEW

lib/
└── blog-data.ts                         ✨ NEW (sample data for MVP)
```

---

## EXECUTION ORDER

| # | Task | Complexity | Priority |
|---|---|---|---|
| 1 | Update Prisma schema with Blog models | Low | 🔴 High |
| 2 | Create sample blog data (lib/blog-data.ts) | Low | 🔴 High |
| 3 | Build admin blogs table + modal UI | High | 🔴 High |
| 4 | Build public blogs listing page & components | High | 🟠 Medium |
| 5 | Build blog detail page & components | High | 🟠 Medium |
| 6 | Implement dark mode & responsive design | Medium | 🟠 Medium |
| 7 | Add animations & polish | Low | 🟡 Low |
| 8 | Backend integration (later phase) | High | 🟡 Low |

---

## KEY FEATURES (MVP)

✅ Admin blog CRUD (Create, Read, Update, Delete)
✅ Public blog listing with search & filters
✅ Individual blog detail pages
✅ Category management & filtering
✅ Featured blogs carousel
✅ Responsive & mobile-first design
✅ Dark/light mode support
✅ Reading time estimation
✅ Related blogs suggestions
✅ SEO-friendly URLs (slug-based)

---

## STYLING APPROACH

- **Tailwind CSS** for all styling
- **shadcn/ui** components where applicable
- **Framer Motion** for animations
- **next-themes** for dark mode
- **Responsive first**: Mobile → Tablet → Desktop

---

## NEXT STEPS

1. ✅ Read this plan
2. ⏳ Update Prisma schema
3. ⏳ Generate Prisma client
4. ⏳ Create sample data file
5. ⏳ Build admin UI
6. ⏳ Build public UI
7. ⏳ Test & polish
