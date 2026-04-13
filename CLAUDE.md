# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Scholarship Portal - a Next.js 14 (App Router) web application for discovering scholarships for students from Class 1 to PhD in the Indian education system.

## Commands

```bash
npm run dev        # Start development server at http://localhost:3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run seed       # Re-populate SQLite database with sample data (tsx scripts/seed.ts)
npx tsx scripts/seed_admin.ts  # Create admin user after database setup
```

## Architecture

### Data Flow

- **Client Components** (`ScholarshipList.tsx`, `ScholarshipDetailPage.tsx`) fetch data from API routes
- **API Routes** (`/api/scholarships`, `/api/scholarships/[id]`) serve as intermediaries
- **Server-only modules** (`lib/db.ts`, `lib/scholarships.ts`) handle SQLite directly

### Why API Routes?

`better-sqlite3` uses Node.js `fs` module which cannot be bundled for client-side. Data fetching happens client-side via `/api/*` routes, which call the server-only library functions.

### Key Files

- `lib/db.ts` - SQLite singleton connection (server-only)
- `lib/scholarships.ts` - Data access layer (server-only)
- `lib/utils.ts` - Client-safe utility functions (education level labels, date formatting)
- `lib/auth_admins.ts` - Admin authentication (server-only)
- `lib/admin_scholarships.ts` - Admin CRUD operations (server-only)
- `lib/admin_pending.ts` - Pending scholarship CRUD for auto-fetch feature
- `lib/scrapers/gov.ts` - Government portal scraper module
- `lib/scrapers/scrape-manager.ts` - Scraping coordinator with deduplication
- `auth.ts` - NextAuth.js configuration
- `auth.d.ts` - NextAuth TypeScript type extensions
- `middleware.ts` - Route protection for `/admin/*` routes
- `components/Providers.tsx` - SessionProvider wrapper for client-side session access
- `app/api/scholarships/route.ts` - GET all scholarships with optional `?search=` and `?level=` filters
- `app/api/scholarships/[id]/route.ts` - GET single scholarship with related scholarships
- `app/api/auth/[...nextauth]/route.ts` - NextAuth.js handler (must use `runtime = 'nodejs'`)
- `app/api/admin/scholarships/route.ts` - Admin: GET all, POST create
- `app/api/admin/scholarships/[id]/route.ts` - Admin: GET, PUT, DELETE single
- `app/api/admin/scrape/route.ts` - Admin: Trigger scholarship scraping
- `app/api/admin/pending/route.ts` - Admin: List pending scholarships
- `app/api/admin/pending/[id]/approve/route.ts` - Admin: Approve pending
- `app/api/admin/pending/[id]/reject/route.ts` - Admin: Reject pending
- `app/api/cron/scrape/route.ts` - Cron: Auto-scrape endpoint
- `app/auth/error/page.tsx` - Authentication error page (with Suspense boundary)
- `app/admin/pending/page.tsx` - Admin: Pending approvals UI

### Database

- SQLite stored at `data/scholarships.db`
- Seeded via `scripts/seed.ts` which inserts 20 sample scholarships across 6 education levels
- Schema: `id`, `name`, `provider`, `description`, `eligibility`, `amount`, `deadline`, `website`, `education_level`, `created_at`
- `pending_scholarships` table: stores scraped scholarships awaiting admin approval

### Education Levels

`1-5`, `6-8`, `9-12`, `undergraduate`, `post-graduation`, `phd`

## Deployment

Designed for Vercel deployment. The `data/` directory is gitignored - run `npm run seed` after deployment to populate the database.

## Authentication (Admin Panel)

### Setup

1. Run `npm run seed` to create scholarships database
2. Run `npx tsx scripts/seed_admin.ts` to create admin user
3. Default admin credentials:
   - Email: `admin@scholarshipportal.com`
   - Password: `admin123`

### Admin Routes

- `/admin/login` - Login page
- `/admin` - Admin dashboard (shows pending approval count)
- `/admin/scholarships` - Manage scholarships (list view)
- `/admin/scholarships/new` - Create new scholarship
- `/admin/scholarships/[id]` - View scholarship
- `/admin/scholarships/[id]/edit` - Edit/delete scholarship
- `/admin/pending` - Pending scraped scholarships (approve/reject)

### IMPORTANT: NextAuth Edge Runtime Issues

NextAuth.js v5 (beta) and middleware have specific requirements to avoid edge runtime errors:

1. **API Routes using `auth()` must set `runtime = 'nodejs'`**
   - `/app/api/auth/[...nextauth]/route.ts`
   - `/app/api/admin/scholarships/route.ts`
   - `/app/api/admin/scholarships/[id]/route.ts`
   - Without this, you'll get "The edge runtime does not support Node.js 'fs' module"

2. **Middleware must NOT import from `@/auth`**
   - `auth.ts` imports `lib/auth_admins.ts` which uses `better-sqlite3` (Node.js `fs`)
   - Middleware runs on Edge Runtime and cannot access Node.js modules
   - Use `getToken` from `next-auth/jwt` directly instead of `auth()` from `@/auth`

3. **Admin layout must NOT have async server component with auth check**
   - The redirect in a client-marked layout causes redirect loops
   - Admin authentication is handled entirely by middleware and client-side signIn

### Auth Configuration Files

- `auth.ts` - Full NextAuth config with Credentials provider (Node.js runtime)
- `auth.config.ts` - Minimal config for middleware (if needed separately)
- `middleware.ts` - JWT-based route protection using `getToken` from `next-auth/jwt`
- `auth.d.ts` - Extends NextAuth Session type with `user.id`

### Key Auth Implementation Notes

- Session strategy: JWT (not database sessions)
- Admin users stored in `admins` table with bcrypt-hashed passwords
- Middleware checks JWT token to protect `/admin/*` routes
- Login page is accessible without auth (middleware allows `/admin/login`)
- After successful login, redirect to `/admin`

### Troubleshooting Auth Issues

- **Redirect loops**: Check middleware matcher doesn't include login page incorrectly
- **Edge runtime errors**: Ensure API routes have `export const runtime = 'nodejs'`
- **Session not persisting**: Check `NEXTAUTH_SECRET` is set in `.env.local`
- **Middleware auth check fails**: Use `getToken` from `next-auth/jwt`, not `auth()` from `@/auth`
- **Signout error "missing required error components"**: NextAuth requires an error page at `/auth/error` - this is configured via `pages.error` in `auth.ts` and implemented at `app/auth/error/page.tsx`

# Codex will review your output once you are done.
