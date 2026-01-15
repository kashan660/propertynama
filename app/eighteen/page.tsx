
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await prisma.page.findUnique({ where: { slug: 'eighteen' } })
    if (!page) return { title: 'Eighteen Islamabad' }
    
    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
      keywords: page.keywords ? page.keywords.split(',') : [],
      openGraph: {
        images: page.ogImage ? [page.ogImage] : [],
      },
    }
  } catch (error) {
    return { title: 'Eighteen Islamabad' }
  }
}

export default async function EighteenPage() {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: 'eighteen' },
      include: { sections: { orderBy: { order: 'asc' } } }
    })
  } catch (error) {
    console.warn("Database connection failed in Eighteen page.", error);
  }

  const title = page?.title || 'Eighteen Islamabad'
  const heroSection = page?.sections.find(s => s.type === 'HERO')
  const heroContent = heroSection ? JSON.parse(heroSection.content) : null

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden bg-slate-900 text-white">
        {heroContent?.backgroundImage && (
          <Image
            src={heroContent.backgroundImage}
            alt="Eighteen Islamabad"
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {heroContent?.title || title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
            {heroContent?.subtitle || "A World-Class Lifestyle Destination. Experience the height of luxury living."}
          </p>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="container py-16">
        <Tabs defaultValue="villas" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-[600px] grid-cols-3">
              <TabsTrigger value="villas">The Villas</TabsTrigger>
              <TabsTrigger value="heights">The Heights</TabsTrigger>
              <TabsTrigger value="core">The Core</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="villas" className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">The Villas</h2>
              <p className="text-muted-foreground">
                Designed for those with a taste for the finer things in life. Available in 1/2, 1, 2, 4, and 8 Kanal sizes, 
                these villas combine luxury, comfort, and sustainability.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden rounded-t-lg">
                   <Image 
                     src="https://images.unsplash.com/photo-1600596542815-27bf90994155?q=80&w=800&auto=format&fit=crop" 
                     alt="4 Kanal Villa" 
                     fill
                     className="object-cover"
                   />
                </div>
                <CardHeader>
                  <CardTitle>4 Kanal Villa</CardTitle>
                  <CardDescription>6 Bedrooms • Temperature Controlled Pool</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Spacious Lawn</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Modern Architecture</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Exclusive Views</li>
                  </ul>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
              <Card>
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden rounded-t-lg">
                   <Image 
                     src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" 
                     alt="1 Kanal Villa" 
                     fill
                     className="object-cover"
                   />
                </div>
                <CardHeader>
                  <CardTitle>1 Kanal Villa</CardTitle>
                  <CardDescription>5 Bedrooms • 5 En-suite Bathrooms</CardDescription>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Powder Room</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Scenic Views</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Luxury Finishes</li>
                  </ul>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
               <Card>
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden rounded-t-lg">
                   <Image 
                     src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" 
                     alt="1/2 Kanal Villa" 
                     fill
                     className="object-cover"
                   />
                </div>
                <CardHeader>
                  <CardTitle>1/2 Kanal Villa</CardTitle>
                  <CardDescription>4 Bedrooms • Perfect for Small Families</CardDescription>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Indoor/Outdoor Features</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Modern Design</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Smart Living</li>
                  </ul>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="heights">
             <div className="text-center py-10 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">The Heights</h3>
              <p className="text-muted-foreground mb-8">
                The Heights host over 28 pavilion-style buildings, offering premium homes with spacious balconies and views of the 18-hole golf course. 
                Apartments range from studios to 5-bedroom penthouses.
              </p>
              <Link href="/eighteen/the-heights">
                <Button size="lg">View The Heights</Button>
              </Link>
            </div>
          </TabsContent>
          
           <TabsContent value="core">
             <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-4">The Core</h3>
              <p className="text-muted-foreground">The commercial hub of Eighteen. Business opportunities arriving soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
