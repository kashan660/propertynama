
'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updatePage(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const metaTitle = formData.get("metaTitle") as string
  const metaDescription = formData.get("metaDescription") as string
  const keywords = formData.get("keywords") as string
  
  await prisma.page.update({
    where: { id },
    data: {
      title,
      slug,
      metaTitle,
      metaDescription,
      keywords
    }
  })

  revalidatePath("/admin/pages")
  revalidatePath(`/admin/pages/${id}`)
  redirect("/admin/pages")
}
