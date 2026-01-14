# PropertyNama Clone with Admin Dashboard

This is a modern, full-stack real estate application built with Next.js 14, Tailwind CSS, and Prisma. It features a comprehensive Admin Dashboard for managing pages, sections, properties, and blogs.

## Features

- **Stunning UI**: Built with Tailwind CSS and Shadcn UI components.
- **Admin Dashboard**: Full control to create, edit, and delete pages and sections.
- **Dynamic Content**: Homepage content is manageable via the database.
- **Responsive Design**: Mobile-first approach.

## Getting Started

Follow these steps to set up the project locally:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Database

This project uses SQLite for local development. Initialize the database with Prisma:

```bash
npx prisma generate
npx prisma db push
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Access the Admin Panel at [http://localhost:3000/admin](http://localhost:3000/admin).

## Admin Panel

The Admin Panel allows you to:
- **Dashboard**: View site statistics.
- **Pages**: Manage website pages and their layout sections.
- **Properties**: Add and edit real estate listings.
- **Blogs**: Manage news and articles.

## Project Structure

- `/app`: App Router pages (Public and Admin).
- `/components`: Reusable UI components.
- `/lib`: Utilities and Database client.
- `/prisma`: Database schema.
