# Linkpulse

A production-grade URL shortener with real-time analytics, built as a portfolio project to demonstrate full-stack engineering, DevOps, and UI/UX design skills.

**Live demo:** [linkpulse-phi.vercel.app](https://linkpulse-phi.vercel.app/login)

## Demo account

You can log in with the following credentials to explore the app without creating an account:

| Field | Value |
|---|---|
| Email | `test@gmail.com` |
| Password | `123456789` |

> This is a shared demo account. Please do not change the password or delete existing links.

![CI](https://github.com/sacroudr/linkpulse/actions/workflows/ci.yml/badge.svg)



---

## What it does

Linkpulse lets you shorten any URL and track every click — who clicked, from where, on what device, and when. It's the kind of tool developers, marketers, and content creators actually use.

- **Shorten URLs** — generate a 6-character short code instantly
- **Track clicks** — every redirect logs the visitor's country, region, OS, and referer
- **Visualize analytics** — per-link charts with 7d / 30d / 90d / all-time filters
- **Manage links** — activate, deactivate, bulk delete, export to CSV
- **Customize the UI** — live design system with color, typography, shape, and density controls

---

## Tech stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Full-stack React with server components, route handlers, and middleware |
| Language | TypeScript | End-to-end type safety |
| Database | Neon PostgreSQL | Serverless Postgres with connection pooling — zero cold start |
| ORM | Drizzle ORM | Lightweight, type-safe, close to raw SQL |
| Auth | NextAuth v5 | JWT sessions with credentials provider and bcrypt password hashing |
| Styling | Tailwind CSS + CSS variables | Utility-first with a live theme system |
| Charts | Recharts | React-native charting library |
| Validation | Zod v4 | Schema validation on all API inputs |
| Geo | ip-api.com | Free IP geolocation (country and region) |
| UA Parsing | ua-parser-js | OS detection from user-agent header |
| Deployment | Vercel | Zero-config Next.js deployment with automatic HTTPS |
| CI | GitHub Actions | Type-check, lint, and build on every push |
| Containers | Docker + Docker Compose | Containerized local development environment |

---

## Architecture

The app is built around three core flows:

**1 — Link creation**
```
User submits URL → POST /api/links → Zod validation → nanoid(6) short code → insert to DB → return short URL
```

**2 — Redirect + click tracking**
```
Visitor hits /{code} → lookup short_code in DB → check isActive → log click (geo + OS + referer) → redirect to original URL
```

**3 — Analytics**
```
User opens stats page → GET /api/links/[id]/stats → aggregate clicks by day → group by country/region/OS/referer → render charts
```

**Database schema**

```
users          links              clicks
────────────   ─────────────────  ──────────────────
id (PK)        id (PK)            id (PK)
email          user_id (FK)       link_id (FK)
password       original_url       clicked_at
created_at     short_code         user_agent
               is_active          country
               created_at         city
                                  os
                                  referer
```

All tables use UUID primary keys. Foreign keys cascade on delete — removing a link removes all its click history.

---

## Project structure

```
linkpulse/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── [code]/route.ts          ← redirect handler
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── links/route.ts       ← GET + POST
│   │   ├── links/[id]/route.ts  ← DELETE + PATCH
│   │   ├── links/[id]/stats/route.ts
│   │   ├── links/bulk/route.ts  ← bulk DELETE
│   │   └── register/route.ts
│   ├── dashboard/
│   │   ├── analytics/page.tsx
│   │   ├── design/page.tsx
│   │   ├── stats/[id]/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── design/                  ← theme panel + component showcase
│   ├── links/                   ← link table, chart, form, breakdown
│   └── ui/                      ← shared primitives
├── lib/
│   ├── auth.ts                  ← NextAuth config
│   ├── csv.ts                   ← CSV export utility
│   ├── db.ts                    ← Drizzle + Neon client
│   ├── geo.ts                   ← IP geolocation
│   ├── nanoid.ts                ← short code generator
│   ├── queries.ts               ← all DB queries
│   ├── schema.ts                ← Drizzle schema
│   ├── theme.tsx                ← theme context
│   └── ua.ts                    ← user agent parser
├── .github/workflows/ci.yml     ← GitHub Actions CI
├── Dockerfile                   ← multi-stage production build
├── docker-compose.yml           ← local container setup
└── drizzle.config.ts
```

---

## Getting started

### Prerequisites

- Node.js 22+
- A [Neon](https://neon.tech) PostgreSQL project
- npm

### 1 — Clone and install

```bash
git clone https://github.com/sacroudr/linkpulse.git
cd linkpulse
npm install
```

### 2 — Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```bash
# .env.local
DATABASE_URL=your_neon_pooled_connection_string
NEXTAUTH_SECRET=your_secret              # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your_secret                  # same as NEXTAUTH_SECRET
AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3 — Push schema to database

```bash
npm run db:push
```

### 4 — Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Running with Docker

### Prerequisites

- Docker Desktop installed and running

### Build and run

```bash
# Copy and fill in your env vars
cp .env.example .env.docker

# Start the container
docker compose --env-file .env.docker up --build
```

Visit [http://localhost:3000](http://localhost:3000).

```bash
# Stop the container
docker compose down
```

The Dockerfile uses a **multi-stage build**:
- `deps` — installs dependencies
- `builder` — builds the Next.js app with standalone output
- `runner` — minimal Alpine image with only what's needed to run the app

---

## CI/CD pipeline

**Continuous Integration** — GitHub Actions runs on every push to `main`:

```
Push to main
    ↓
Type check (tsc --noEmit)
    ↓
Lint (eslint)
    ↓
Build (next build)
    ↓
✓ All green → Vercel deploys automatically
```

**Continuous Deployment** — Vercel auto-deploys on every push to `main` that passes CI. Database migrations run automatically as part of the build step.

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Neon pooled connection string |
| `NEXTAUTH_SECRET` | ✅ | Secret for signing JWT tokens |
| `NEXTAUTH_URL` | ✅ | Full URL of your app |
| `AUTH_SECRET` | ✅ | Same as NEXTAUTH_SECRET (NextAuth v5) |
| `AUTH_URL` | ✅ | Same as NEXTAUTH_URL (NextAuth v5) |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public URL used to build short links |

---

## Key technical decisions

**Why Drizzle over Prisma?**
Drizzle is closer to raw SQL, has a smaller bundle size, and works better with Neon's serverless driver. The query builder feels more explicit and predictable.

**Why NextAuth v5 with credentials?**
For a portfolio project, credentials (email + password) demonstrates the full auth flow including password hashing, JWT session management, and protected routes — more educational than OAuth alone.

**Why Neon over a traditional Postgres instance?**
Neon's serverless driver works without persistent connections, which is essential for Vercel's serverless functions. It also has a generous free tier and built-in branching for dev/prod separation.

**Why ip-api.com for geolocation?**
No API key required, 45 requests/minute on the free tier — more than enough for a portfolio project. City-level accuracy is limited by ISP registration, but country and region are reliable.

**Why standalone output for Docker?**
Next.js standalone output bundles everything needed to run the app into a single directory, producing a much smaller Docker image (~150MB vs ~1GB for a full node_modules install).

---

## Features overview

### Dashboard
- Create short links with a single URL input
- View all links with click counts, creation date, and status
- Copy, delete, or view stats for any link
- Select multiple links for bulk deletion
- Export links to CSV (all or selected)

### Analytics (per link)
- Total clicks, peak day, average clicks per day
- Clicks over time chart with 7d / 30d / 90d / all-time filter
- Breakdown by country, region, OS, and referer
- Activate / deactivate link toggle

### Design system
- Live theme editor — change accent color, saturation, font, size, shape, density
- Changes apply instantly across the entire app
- Theme persists across sessions via localStorage
- Full component showcase (buttons, inputs, cards, badges, stat cards, toasts, skeletons)

---

## Scripts reference

```bash
npm run dev          # Start development server
npm run build        # Run migrations + production build (used by Vercel)
npm run build:ci     # Production build without migrations (used by GitHub Actions)
npm run lint         # Run ESLint
npm run db:push      # Push schema changes to database (development)
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply pending migrations
npm run db:studio    # Open Drizzle Studio (database browser)
```

---

## License

MIT
