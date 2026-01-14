
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/ContactForm"

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } })
  if (!page) return { title: 'PropertyNama - Real Estate Pakistan' }
  
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
    keywords: page.keywords ? page.keywords.split(',') : [],
    openGraph: {
      images: page.ogImage ? [page.ogImage] : [],
    },
  }
}

export default async function Home() {
  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: { orderBy: { order: 'asc' } } }
  })

  // Defaults if DB is not ready
  const heroSection = page?.sections.find(s => s.type === 'HERO')
  const heroContent = heroSection ? JSON.parse(heroSection.content) : null
  
  const featuredSection = page?.sections.find(s => s.type === 'FEATURED_PROJECTS')
  const featuredContent = featuredSection ? JSON.parse(featuredSection.content) : null

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-slate-900 text-white">
          <Image 
            src={heroContent?.backgroundImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"}
            alt={heroContent?.backgroundImageAlt || "Luxury Modern Property in Pakistan - PropertyNama"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative container flex h-full flex-col items-center justify-center text-center z-10">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
              {(heroContent?.title === 'Invest in Pakistan with Confidence' || !heroContent?.title) 
                ? "RIGHT PLACE TO SECURE YOUR INVESTMENT" 
                : heroContent.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl drop-shadow-md">
              {(heroContent?.subtitle?.includes('trusted real estate partner') || !heroContent?.subtitle)
                ? "We Suggest The Best Investment Opportunity"
                : heroContent.subtitle}
            </p>
            <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row justify-center">
              <Link href={heroContent?.ctaLink || "/faisal-town/phase-2"}>
                 <Button size="lg" className="h-12 w-full sm:w-auto bg-primary text-black hover:bg-primary/90 font-bold px-8">
                   {heroContent?.ctaText || "Explore Prime Locations"}
                 </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="container py-16 md:py-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {featuredContent?.title || "Top Rated Projects"}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Handpicked investment opportunities for overseas Pakistanis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredContent?.projects ? (
              featuredContent.projects.map((project: any, index: number) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg group">
                  <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                     <Image 
                       src={project.image} 
                       alt={project.title} 
                       fill
                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.location}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={project.title === 'Rudn Enclave' ? '/ruden-enclave-details' : project.link} className="w-full">
                      <Button className="w-full" variant="secondary">View Project</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
               <div className="col-span-full text-center py-10 text-muted-foreground">
                 Loading projects...
               </div>
            )}
          </div>
        </section>
        
        {/* Featured Opportunities & News */}
        <section className="bg-slate-50 py-16">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2 items-stretch">
              {/* Faisal Town Phase 2 Promo */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-xl flex flex-col justify-center">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2">
                     <Badge className="bg-white/20 text-white hover:bg-white/30 border-none px-3 py-1">Hot Investment</Badge>
                     <Badge className="bg-amber-400 text-black hover:bg-amber-500 border-none px-3 py-1">High ROI</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                      Faisal Town Phase 2
                    </h3>
                    <p className="text-xl font-medium text-blue-100">
                      The Future of Islamabad Real Estate
                    </p>
                  </div>

                  <p className="text-lg text-blue-50 max-w-lg leading-relaxed">
                    Don't miss this golden chance to invest in the most rapidly developing society. Secure your plot today at pre-launch rates and watch your investment grow.
                  </p>

                  <div className="pt-4">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 h-12 text-lg" asChild>
                      <Link href="/faisal-town/phase-2">
                        Invest Now &rarr;
                      </Link>
                    </Button>
                  </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 translate-x-12" />
                <div className="absolute right-0 bottom-0 h-64 w-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>

              {/* Latest Updates Section */}
              <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-white border border-slate-200 shadow-sm h-full">
                 <div className="space-y-6 max-w-md">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                      Latest Market Updates
                    </h2>
                    <p className="text-lg text-slate-600">
                       Stay ahead of the market with our expert analysis, property news, and latest development updates from across Pakistan.
                    </p>
                    <Button variant="outline" size="lg" className="border-2 h-12 px-8 text-lg" asChild>
                      <Link href="/news-feed">Read Real Estate News</Link>
                    </Button>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container py-16">
          <div className="max-w-2xl mx-auto text-center mb-8">
             <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Have Questions?</h2>
             <p className="mt-4 text-lg text-slate-600">
               Send us a message and our team will get back to you shortly.
             </p>
          </div>
          <div className="max-w-xl mx-auto">
             <Card>
                <CardContent className="pt-6">
                   <ContactForm />
                </CardContent>
             </Card>
          </div>
        </section>
    </div>
  )
}
