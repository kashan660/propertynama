# Deployment Guide for Property Nama

## 1) Push to GitHub

Run these commands from the project folder:

```bash
git remote add origin https://github.com/<your-username>/propertynama.git
git branch -M main
git push -u origin main
```

## 2) Deploy with Vercel CLI

```bash
vercel
```

When prompted:
- Set the project name to `propertynama`
- Link it to the GitHub repository
- Confirm the root folder

## 3) Add environment variables in Vercel

Set these in the Vercel project settings:

```text
DB_DIALECT=postgres
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-db-user
DB_PASS=your-db-password
SESSION_SECRET=your-random-secret
NODE_ENV=production
```

## 4) Recommended database

Use Neon, Supabase Postgres, or another managed PostgreSQL service.

Once the database is connected, the app will create the required tables automatically.
