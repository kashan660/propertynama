#!/bin/bash
echo "Pushing Schema to Database..."
npx prisma db push
echo ""
echo "Updating Blog Post..."
npx ts-node prisma/update_faisal_town_blog.ts
