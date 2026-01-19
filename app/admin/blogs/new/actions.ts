'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createBlogPost(data: any) {
  try {
    const post = await prisma.blogPost.create({
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
    revalidatePath('/admin/blogs')
    revalidatePath('/sitemap.xml')
    
    return { success: true, id: post.id }
  } catch (error) {
    console.error('Failed to create blog post:', error)
    throw new Error('Failed to create blog post')
  }
}
