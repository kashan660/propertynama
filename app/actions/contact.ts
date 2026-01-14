'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  try {
    const validatedData = contactFormSchema.parse(data)

    await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      },
    })

    revalidatePath('/admin/messages')
    
    return { success: true, message: 'Message sent successfully! We will get back to you soon.' }
  } catch (error) {
    console.error('Contact form submission error:', error)
    if (error instanceof z.ZodError) {
        return { success: false, message: 'Invalid data', errors: error.errors }
    }
    return { success: false, message: 'Failed to send message. Please try again.' }
  }
}
