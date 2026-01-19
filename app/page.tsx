import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/ContactForm"
import { ImageIcon } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await prisma.page.findUnique({ where: { slug: 'home' } })
    if (!page) {
      return {
        title: 'Best Property Investment in Pakistan for Overseas Pakistanis | PropertyNama.pk',
        description:
          'PropertyNama.pk helps overseas Pakistanis invest safely in verified plots, villas, and commercial property across Pakistan with high ROI.',
      }
    }

    return {
      title:
        page.metaTitle ||
        'Best Property Investment in Pakistan for Overseas Pakistanis | PropertyNama.pk',
      description: page.metaDescription,
      keywords: page.keywords
        ? page.keywords.split(',')
        : [
            'property investment in pakistan',
            'overseas pakistanis property',
            'plots for sale in pakistan',
            'islamabad real estate',
            'best housing societies pakistan',
          ],
      openGraph: {
        images: page.ogImage ? [page.ogImage] : [],
      },
    }
  } catch {
    return {
      title: 'Best Property Investment in Pakistan | PropertyNama.pk',
    }
  }
}

export default async function Home() {
  let page
  try {
    page = await prisma.page.findUnique({
      where: { slug: 'home' },
      include: { sections: { orderBy: { order: 'asc' } } },
    })
  } catch {
    page = null
  }

  const heroSection = page?.sections.find(s => s.type === 'HERO')
  const heroContent = heroSection ? JSON.parse(heroSection.content) : null

  const featuredSection = page?.sections.find(s => s.type === 'FEATURED_PROJECTS')
  const featuredContent = featuredSection ? JSON.parse(featuredSection.content) : null

  return (
    <div className="flex min-h-screen flex-col">

      {/* HERO SECTION */}
      <section className="relative h-[600px] w-full overflow-hidden bg-slate-900 text-white">
        <Image
          src={
            heroContent?.backgroundImage ||
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
          }
          alt="Best property investment opportunities in Pakistan for overseas Pakistanis"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative container flex h-full flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
            Best Property Investment Opportunities in Pakistan
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl drop-shadow-md">
            Helping overseas Pakistanis invest safely in verified plots, villas,
            apartments & commercial property with high ROI.
          </p>

          <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row justify-center">
            <Link href="/faisal-town/phase-2">
              <Button size="lg" className="h-12 bg-primary text-black font-bold px-8">
                Explore Prime Locations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container py-16 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Top Rated Property Investment Projects in Pakistan
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Handpicked opportunities for overseas Pakistanis and serious investors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredContent?.projects?.map((project: any, index: number) => (
            <Card key={index} className="overflow-hidden shadow-lg group">
              <div className="aspect-video relative">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} property investment Pakistan`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <ImageIcon className="h-10 w-10 opacity-50" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.location}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={project.link} className="w-full">
                  <Button variant="secondary" className="w-full">
                    View Project
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
      <section className="container py-16">
        <div className="max-w-5xl mx-auto space-y-10">

          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Trusted Property Consultants in Pakistan for Overseas Pakistanis
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed">
            PropertyNama.pk is a professional real estate consultancy helping overseas Pakistanis
            and local investors invest in safe, approved, and high-return property projects across Pakistan.
            We specialize in plots, villas, apartments, and commercial property investments in Islamabad,
            Rawalpindi, and emerging CPEC-linked developments.
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="bg-slate-50 p-6 rounded-xl border">
              <h3 className="text-xl font-semibold mb-3">
                Why Overseas Pakistanis Choose PropertyNama.pk
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Verified & approved housing societies</li>
                <li>Dedicated overseas client support</li>
                <li>High ROI investment guidance</li>
                <li>Transparent pricing & documentation</li>
                <li>End-to-end ownership assistance</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border">
              <h3 className="text-xl font-semibold mb-3">
                Popular Investment Locations
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <Link href="/faisal-town/phase-2" className="text-primary font-medium">
                    Faisal Town Phase 2 Islamabad
                  </Link>
                </li>
                <li>
                  <Link href="/eighteen-islamabad" className="text-primary font-medium">
                    Eighteen Islamabad Luxury Villas
                  </Link>
                </li>
                <li>Approved societies in Rawalpindi</li>
                <li>Commercial property investment in Pakistan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="container py-16">
        <div className="max-w-xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Talk to a Property Expert</h2>
          <p className="mt-4 text-slate-600">
            Get professional guidance for safe property investment in Pakistan.
          </p>
        </div>

        <Card className="max-w-xl mx-auto">
          <CardContent className="pt-6">
            <ContactForm />
          </CardContent>
        </Card>
      </section>

    </div>
  )
}
