# Scholarship Portal

A Next.js 14 (App Router) web application for discovering scholarships for students from Class 1 to PhD in the Indian education system.

## Features

- Search and filter scholarships by name, provider, or keyword
- Filter by education level (Class 1-5, Class 6-8, Class 9-12, Undergraduate, Post-Graduation, PhD)
- Detailed scholarship pages with eligibility criteria and deadlines
- Admin panel for managing scholarships
- Responsive design with modern playful UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite with better-sqlite3
- **Auth**: NextAuth.js v5 (beta)
- **Language**: TypeScript

## Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Seed the database with sample scholarships
npm run seed

# Create admin user
npx tsx scripts/seed_admin.ts
```

### Default Admin Credentials

- **Email**: `admin@scholarshipportal.com`
- **Password**: `admin123`

### Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin panel pages
│   ├── auth/              # Auth error page
│   └── scholarship/       # Scholarship detail page
├── components/            # React components
├── lib/                   # Server-only modules (db, auth, scholarships)
├── scripts/               # Database seeding scripts
└── data/                  # SQLite database (gitignored)
```

## API Routes

- `GET /api/scholarships` - List all scholarships (supports `?search=` and `?level=` filters)
- `GET /api/scholarships/[id]` - Get single scholarship with related scholarships
- `POST /api/admin/scholarships` - Create scholarship (admin)
- `PUT /api/admin/scholarships/[id]` - Update scholarship (admin)
- `DELETE /api/admin/scholarships/[id]` - Delete scholarship (admin)
- `POST /api/admin/scrape` - Fetch scholarships from government portals (admin)
- `GET /api/admin/pending` - List pending scraped scholarships (admin)
- `POST /api/admin/pending/[id]/approve` - Approve pending scholarship (admin)
- `POST /api/admin/pending/[id]/reject` - Reject pending scholarship (admin)
- `POST /api/cron/scrape` - Cron endpoint for scheduled scraping

## Auto-Fetch Feature

The portal can automatically fetch scholarships from government portals (like scholarships.gov.in) and add them for admin review.

### How it works
1. Admin clicks "Fetch New Scholarships" in `/admin/pending`
2. Scholarships are scraped and stored in a pending table
3. Admin reviews and approves/rejects each scholarship
4. Approved scholarships are added to the main listing

### Scheduling (Vercel)
For production, set up a cron job to trigger `/api/cron/scrape` daily:
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/scrape",
    "schedule": "0 6 * * *"
  }]
}
```

## Deployment

Designed for Vercel deployment. The `data/` directory is gitignored — run `npm run seed` after deployment to populate the database.

## Education Levels

| Level | Label |
|-------|-------|
| 1-5 | Class 1-5 |
| 6-8 | Class 6-8 |
| 9-12 | Class 9-12 |
| undergraduate | Undergraduate |
| post-graduation | Post-Graduation |
| phd | PhD |
