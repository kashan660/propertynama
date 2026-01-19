'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createProperty(data: any) {
  try {
    // Process images: ensure it's a JSON string
    let imagesJson = '[]';
    if (Array.isArray(data.images)) {
      imagesJson = JSON.stringify(data.images);
    } else if (typeof data.images === 'string') {
      // If it's a string, try to parse it as JSON or treat it as a comma-separated list
      try {
        JSON.parse(data.images);
        imagesJson = data.images;
      } catch (e) {
        // Not valid JSON, treat as comma/newline separated list
        const urls = data.images.split(/[\n,]+/).map((url: string) => url.trim()).filter((url: string) => url.length > 0);
        imagesJson = JSON.stringify(urls);
      }
    }

    const property = await prisma.property.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: parseFloat(data.price),
        location: data.location,
        area: data.area,
        type: data.type,
        images: imagesJson,
        video: data.video || null,
        featured: data.featured || false,
      },
    })
    
    revalidatePath('/properties')
    revalidatePath('/admin/properties')
    revalidatePath('/sitemap.xml')
    
    return { success: true, id: property.id }
  } catch (error) {
    console.error('Failed to create property:', error)
    throw new Error('Failed to create property')
  }
}
