import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import prisma from '@/lib/prisma'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.siteSettings.findFirst()

    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://propertynama.pk'),
      title: {
        default: settings?.siteName || 'PropertyNama | Leading Real Estate Portal',
        template: `%s | ${settings?.siteName || 'PropertyNama'}`,
      },
      description: settings?.defaultMetaDescription || 'Find your dream property with PropertyNama.pk',
      keywords: settings?.defaultKeywords ? settings.defaultKeywords.split(',') : ['Real Estate Pakistan', 'PropertyNama'],
      verification: {
        google: settings?.googleVerification || undefined,
        yandex: settings?.yandexVerification || undefined,
        other: settings?.bingVerification ? { 'msvalidate.01': settings.bingVerification } : undefined,
      },
    }
  } catch (error) {
    console.warn("Database connection failed during metadata generation, using defaults.", error)
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://propertynama.pk'),
      title: {
        default: 'PropertyNama | Leading Real Estate Portal',
        template: `%s | PropertyNama`,
      },
      description: 'Find your dream property with PropertyNama.pk',
      keywords: ['Real Estate Pakistan', 'PropertyNama'],
    }
  }
}

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased flex flex-col")}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Toaster />
      </body>
    </html>
  )
}
