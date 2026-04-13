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
