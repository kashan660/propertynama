
'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateSiteSettings(formData: FormData) {
  const siteName = formData.get("siteName") as string
  const googleVerification = formData.get("googleVerification") as string
  const yandexVerification = formData.get("yandexVerification") as string
  const bingVerification = formData.get("bingVerification") as string
  const defaultMetaTitle = formData.get("defaultMetaTitle") as string
  const defaultMetaDescription = formData.get("defaultMetaDescription") as string
  const defaultKeywords = formData.get("defaultKeywords") as string

  const existing = await prisma.siteSettings.findFirst()

  if (existing) {
    await prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        siteName,
        googleVerification,
        yandexVerification,
        bingVerification,
        defaultMetaTitle,
        defaultMetaDescription,
        defaultKeywords
      }
    })
  } else {
    await prisma.siteSettings.create({
      data: {
        siteName,
        googleVerification,
        yandexVerification,
        bingVerification,
        defaultMetaTitle,
        defaultMetaDescription,
        defaultKeywords
      }
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/seo")
}
