'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPage(data: any) {
  try {
    const page = await prisma.page.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        keywords: data.keywords || null,
        ogImage: data.ogImage || null,
        isPublished: data.isPublished,
      },
    })
    
    revalidatePath('/admin/pages')
    revalidatePath(`/${data.slug}`)
    revalidatePath('/sitemap.xml')
    
    return { success: true, id: page.id }
  } catch (error) {
    console.error('Failed to create page:', error)
    throw new Error('Failed to create page')
  }
}
