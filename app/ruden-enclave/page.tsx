
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Home } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: 'ruden-enclave' } })
  if (!page) return { title: 'Rudn Enclave' }
  
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
    keywords: page.keywords ? page.keywords.split(',') : [],
    openGraph: {
      images: page.ogImage ? [page.ogImage] : [],
    },
  }
}

export default async function RudnEnclavePage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'ruden-enclave' },
    include: { sections: { orderBy: { order: 'asc' } } }
  })

  // Fallback defaults if page is not in DB
  const title = page?.title || 'Rudn Enclave'
  const heroSection = page?.sections.find(s => s.type === 'HERO')
  const heroContent = heroSection ? JSON.parse(heroSection.content) : null
  
  // Hardcoded tabs content fallback or we could model this in DB too
  // For now, I'll keep the complex tab structure static but use the dynamic images/text where applicable
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section from DB */}
      <section className="relative h-[400px] w-full overflow-hidden bg-emerald-900 text-white">
        {heroContent?.backgroundImage && (
          <Image
            src={heroContent.backgroundImage}
            alt="Rudn Enclave"
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl drop-shadow-md">
            {heroContent?.title || title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl drop-shadow-sm">
            {heroContent?.subtitle || "Experience the perfect blend of modern living and natural tranquility."}
          </p>
        </div>
      </section>

      <section className="container py-16">
        <Tabs defaultValue="ringroad" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-[600px] grid-cols-3">
              <TabsTrigger value="ringroad">Ring Road Block</TabsTrigger>
              <TabsTrigger value="executive">Executive Homes</TabsTrigger>
              <TabsTrigger value="overseas">Overseas Block</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ringroad" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold">0 km from Ring Road</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Ring Road Block</h2>
                <p className="text-muted-foreground mb-6">
                  The latest addition strategically positioned for unparalleled connectivity. 
                  Launched in early 2025, offering 3.5 and 5 Marla residential plots.
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border">
                  <h3 className="font-semibold mb-4">5 Marla Payment Plan</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span>Total Price</span>
                      <span className="font-bold">PKR 6,500,000</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Down Payment (20%)</span>
                      <span>PKR 1,300,000</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Monthly Installment</span>
                      <span>PKR 94,791</span>
                    </div>
                     <div className="flex justify-between pt-2">
                      <span>Possession (10%)</span>
                      <span>PKR 650,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-[400px] relative">
                 <Image 
                   src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop" 
                   alt="Ring Road" 
                   fill
                   className="object-cover"
                 />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="executive" className="space-y-8">
             <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Home className="h-5 w-5" />
                  <span className="font-semibold">Ready to Move</span>
                </div>
              <h2 className="text-3xl font-bold mb-4">Rudn Executive Homes</h2>
              <p className="text-muted-foreground">
                A dedicated zone of fully constructed, ready-to-live-in homes. 
                Eliminates construction hassles with modern architecture and premium finishes.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>5 Marla Single Storey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Focuses on smaller families to get their own house in a community built on world standards.
                  </p>
                  <Button variant="outline" className="w-full">View Layout</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                   <CardTitle>5 Marla Double Storey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                     Ideal for growing families needing more space. Includes terrace and servant quarter options.
                  </p>
                  <Button variant="outline" className="w-full">View Layout</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="overseas" className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-4">Overseas Block</h2>
              <p className="text-muted-foreground">
                Exclusively designed for Overseas Pakistanis, offering world-class amenities and a secure investment opportunity.
                Payment Plan with 20% Down Payment.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* 5 Marla Plan */}
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center mb-6 border-b pb-4">
                  <h3 className="text-xl font-bold text-primary">5 Marla</h3>
                  <p className="text-sm text-muted-foreground">25 x 50</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="font-bold">PKR 2,090,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Down Payment (20%)</span>
                    <span className="font-semibold">PKR 418,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">48 Monthly Inst.</span>
                    <span className="font-semibold">PKR 30,479</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Possession (10%)</span>
                    <span className="font-semibold">PKR 209,000</span>
                  </div>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link href="/booking?society=Rudn Enclave Overseas&size=5 Marla">Book Now</Link>
                </Button>
              </div>

              {/* 10 Marla Plan */}
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center mb-6 border-b pb-4">
                  <h3 className="text-xl font-bold text-primary">10 Marla</h3>
                  <p className="text-sm text-muted-foreground">35 x 70</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="font-bold">PKR 3,900,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Down Payment (20%)</span>
                    <span className="font-semibold">PKR 780,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">48 Monthly Inst.</span>
                    <span className="font-semibold">PKR 56,875</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Possession (10%)</span>
                    <span className="font-semibold">PKR 390,000</span>
                  </div>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link href="/booking?society=Rudn Enclave Overseas&size=10 Marla">Book Now</Link>
                </Button>
              </div>

              {/* 1 Kanal Plan */}
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center mb-6 border-b pb-4">
                  <h3 className="text-xl font-bold text-primary">1 Kanal</h3>
                  <p className="text-sm text-muted-foreground">50 x 90</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="font-bold">PKR 5,995,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Down Payment (20%)</span>
                    <span className="font-semibold">PKR 1,199,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">48 Monthly Inst.</span>
                    <span className="font-semibold">PKR 87,427</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Possession (10%)</span>
                    <span className="font-semibold">PKR 599,500</span>
                  </div>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link href="/booking?society=Rudn Enclave Overseas&size=1 Kanal">Book Now</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
