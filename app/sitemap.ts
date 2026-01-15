
import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://propertynama.pk'

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

  try {
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

    // Try to fetch news, but if table doesn't exist or fails, ignore
    let newsRoutes: any[] = []
    try {
      // Check if NewsItem model exists in client before querying (it might not be in the generated client if schema changed)
      // For now, just try-catch the query
      // @ts-ignore
      const news = await prisma.newsItem.findMany({
        select: { slug: true },
      })

      newsRoutes = news.map((item: any) => ({
        url: `${baseUrl}/news-feed/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }))
    } catch (e) {
      // News table might not exist or other error
      console.warn("Could not fetch news items for sitemap")
    }

    return [...routes, ...pageRoutes, ...blogRoutes, ...newsRoutes]
  } catch (error) {
    console.warn("Database connection failed during sitemap generation. Returning static routes only.", error)
    return [...routes]
  }
}
