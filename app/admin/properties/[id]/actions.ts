'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const propertySchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  location: z.string().min(3, 'Location is required'),
  area: z.string().min(1, 'Area is required'),
  type: z.string().min(1, 'Type is required'),
  video: z.string().optional().or(z.literal('')),
  featured: z.coerce.boolean(),
  // images are handled separately or as a JSON string
  images: z.string().optional(), 
})

export async function updateProperty(id: string, formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    price: formData.get('price'),
    location: formData.get('location'),
    area: formData.get('area'),
    type: formData.get('type'),
    video: formData.get('video'),
    featured: formData.get('featured') === 'on',
    images: formData.get('images'),
  }

  const result = propertySchema.safeParse(rawData)

  if (!result.success) {
    return {
      error: 'Validation failed',
      details: result.error.flatten()
    }
  }

  try {
    await prisma.property.update({
      where: { id },
      data: {
        ...result.data,
        // Ensure images is a valid JSON string if provided, or default to empty array
        images: result.data.images || '[]' 
      },
    })
  } catch (error) {
    console.error('Database Error:', error)
    return {
      error: 'Database Error: Failed to update property.'
    }
  }

  revalidatePath('/admin/properties')
  revalidatePath(`/admin/properties/${id}`)
  redirect('/admin/properties')
}
