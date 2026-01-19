#!/bin/bash
echo "Generating Prisma Client..."
npx prisma generate
echo ""
echo "Running Build..."
npm run build
echo ""
echo "Updating Blog Post..."
npx ts-node prisma/update_faisal_town_blog.ts
