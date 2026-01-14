
import { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://propertynama.com' // Replace with actual domain

  // Static routes
  const routes = [
    '',
    '/about-us',
    '/contact-us',
    '/news-feed',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic routes from Pages
  const pages = await prisma.page.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  })

  const pageRoutes = pages.map((page) => ({
    url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: page.slug === 'home' ? 1 : 0.8,
  }))

  // Dynamic routes from Blog Posts
  const blogs = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  })

  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Dynamic routes from News
  const news = await prisma.newsItem.findMany({
    select: { slug: true },
  })

  const newsRoutes = news.map((item) => ({
    url: `${baseUrl}/news-feed/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [...routes, ...pageRoutes, ...blogRoutes, ...newsRoutes]
}
