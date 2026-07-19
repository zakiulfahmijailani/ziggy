# Ziggy ✦

**Ziggy** is a cheerful personal work OS for PhD applications: it puts the next worthwhile task, application readiness, deadlines, requirements, and Google Drive document links in one place.

The current MVP is intentionally demo-first. It has a polished responsive UI and realistic sample data out of the box, so it can be explored immediately before authentication, Drive syncing, and database-backed editing are connected.

## What’s included

- A “what should I do now?” dashboard with deadline horizon, risk and readiness signals
- Application portfolio with stages, search, filtering, and responsive project cards
- Project detail pages with requirements, document links, milestones, tasks, countdown, and risk
- Playful Ziggy visual identity (no generic corporate dashboard energy)
- Prisma schema designed for Neon PostgreSQL
- Demo seed data plus environment-variable and Vercel Cron starter configuration

## Run locally

1. Install Node.js 20.9 or later.
2. In this folder, install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The visual demo works without a database. It currently uses `lib/demo-data.ts` to make the design easy to review.

## Connect Neon PostgreSQL

1. Create a Neon project and database.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to Neon’s pooled connection string.
3. Generate Prisma’s client and create the tables:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

The schema lives at `prisma/schema.prisma`. It models projects, tasks, milestones, requirements, reusable documents, and many-to-many project/document links. The next implementation step is to replace the demo-data selectors with Prisma queries and add server actions for writes.

## Deploy to Vercel

1. Push this folder to a Git repository and import it into Vercel (the framework is detected as Next.js).
2. Add `DATABASE_URL` and a strong `CRON_SECRET` under **Project Settings → Environment Variables**.
3. Deploy.

`vercel.json` schedules a daily call to `/api/cron/deadline-digest` at 07:00 UTC. The endpoint already checks Vercel’s bearer token; connect it to the notification channel you prefer when email or push reminders are added.

## Google Drive approach

The MVP keeps Google Drive as the source of truth for files. Each application stores a Drive folder URL, and the UI opens documents there. The supplied `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` entries are reserved for a later Google OAuth + Drive API integration, where file metadata can be synced without duplicating PDFs or Docs into the database.

## Suggested next upgrades

1. Google sign-in and per-user access control.
2. Persist projects/tasks through Prisma server actions.
3. Google Drive folder picker and document metadata sync.
4. Requirement extraction from a vacancy page or pasted text.
5. Daily deadline digest delivery by email or calendar notification.
