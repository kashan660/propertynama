import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: 'Rudn Enclave Details | PropertyNama',
  description: 'Detailed information about Rudn Enclave blocks, payment plans, and amenities.',
}

export default async function RudnEnclaveDetailsPage() {
  // Fetch page data if it exists, otherwise use defaults
  const page = await prisma.page.findUnique({
    where: { slug: 'ruden-enclave' }, // Re-using Rudn Enclave data for hero/meta
    include: { sections: true }
  })

  const title = page?.title || 'Rudn Enclave'
  // Use hero content if available, or fallback
  const heroSection = page?.sections.find(s => s.type === 'HERO')
  const heroContent = heroSection ? JSON.parse(heroSection.content) : null

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden bg-slate-900 text-white">
        {heroContent?.backgroundImage ? (
          <Image
            src={heroContent.backgroundImage}
            alt="Rudn Enclave"
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
           <div className="absolute inset-0 bg-emerald-900/80" />
        )}
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {heroContent?.title || title} Details
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
            {heroContent?.subtitle || "Explore the detailed master plan, blocks, and investment options."}
          </p>
        </div>
      </section>

      {/* Content Tabs - Structure from Eighteen Page */}
      <section className="container py-16">
        <Tabs defaultValue="general" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-[600px] grid-cols-3">
              <TabsTrigger value="general">General Block</TabsTrigger>
              <TabsTrigger value="executive">Executive Block</TabsTrigger>
              <TabsTrigger value="overseas">Overseas Block</TabsTrigger>
            </TabsList>
          </div>

          {/* General Block Content */}
          <TabsContent value="general" className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">General Block</h2>
              <p className="text-muted-foreground">
                The heart of Rudn Enclave, designed for affordable luxury. Featuring residential plots ranging from 5 Marla to 1 Kanal.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden rounded-t-lg">
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-200">
                     5 Marla Plot Image
                   </div>
                </div>
                <CardHeader>
                  <CardTitle>5 Marla Plot</CardTitle>
                  <CardDescription>Residential • 25x50 Dimensions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Affordable Entry Point</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Near Ring Road</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Parks & Amenities</li>
                  </ul>
                  <Link href="/booking?society=Rudn Enclave General&size=5 Marla">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden rounded-t-lg">
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-200">
                     10 Marla Plot Image
                   </div>
                </div>
                <CardHeader>
                  <CardTitle>10 Marla Plot</CardTitle>
                  <CardDescription>Residential • 35x70 Dimensions</CardDescription>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Spacious Living</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Wide Streets</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Modern Infrastructure</li>
                  </ul>
                  <Link href="/booking?society=Rudn Enclave General&size=10 Marla">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>

               <Card>
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden rounded-t-lg">
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-200">
                     1 Kanal Plot Image
                   </div>
                </div>
                <CardHeader>
                  <CardTitle>1 Kanal Plot</CardTitle>
                  <CardDescription>Residential • 50x90 Dimensions</CardDescription>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Luxury Lifestyle</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Premium Location</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> Exclusive Community</li>
                  </ul>
                  <Link href="/booking?society=Rudn Enclave General&size=1 Kanal">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Executive Block Content */}
          <TabsContent value="executive">
             <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-4">Executive Block</h3>
              <p className="text-muted-foreground">Premium living standards with enhanced security and features. Details coming soon.</p>
            </div>
          </TabsContent>
          
           {/* Overseas Block Content */}
           <TabsContent value="overseas">
             <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-4">Overseas Block</h3>
              <p className="text-muted-foreground">Exclusively for Overseas Pakistanis. High-end amenities and smart features.</p>
              <div className="mt-6">
                 <Link href="/ruden-enclave">
                   <Button variant="outline">View Payment Plans</Button>
                 </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
