'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateBlogPost(id: string, data: any) {
  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image || null,
        video: data.video || null,
        author: data.author || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        keywords: data.keywords || null,
        isPublished: data.isPublished,
      },
    })
    revalidatePath('/blog')
    revalidatePath(`/blog/${data.slug}`)
    revalidatePath('/admin/blogs')
    revalidatePath('/sitemap.xml')
  } catch (error) {
    console.error('Failed to update blog post:', error)
    throw new Error('Failed to update blog post')
  }
}
