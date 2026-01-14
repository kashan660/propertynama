'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
  fullName: z.string().min(2),
  cityName: z.string().min(2),
  country: z.string().min(2),
  society: z.string().min(1),
  plotSize: z.string().min(1),
  paymentPlan: z.enum(["cash", "installments"]),
  whatsappNo: z.string().min(10),
  contactNo: z.string().min(10),
  contactTime: z.string().optional(),
})

export async function submitBooking(data: z.infer<typeof formSchema>) {
  try {
    const validatedData = formSchema.parse(data)

    await prisma.booking.create({
      data: {
        ...validatedData,
        status: 'PENDING',
      },
    })

    revalidatePath('/admin/bookings')
    
    return { success: true, message: 'Booking submitted successfully!' }
  } catch (error) {
    console.error('Booking submission error:', error)
    return { success: false, message: 'Failed to submit booking. Please try again.' }
  }
}
