
'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updatePage(id: string, data: any) {
  try {
    await prisma.page.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        ogImage: data.ogImage,
        isPublished: data.isPublished,
      }
    })

    revalidatePath("/admin/pages")
    revalidatePath(`/admin/pages/${id}`)
    revalidatePath(`/${data.slug}`) // Revalidate the public page
    
    return { success: true }
  } catch (error) {
    console.error("Failed to update page:", error)
    throw new Error("Failed to update page. Please check database connection.")
  }
}
