
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle2, Home, Maximize, Bed, ImageIcon } from "lucide-react"

export const metadata: Metadata = {
  title: 'The Heights - Eighteen Islamabad | Luxury Apartments',
  description: 'The Heights at Eighteen Islamabad offers premium 1-3 bedroom apartments and 5-bedroom penthouses with views of the 18-hole golf course.',
}

// Fallback data in case DB is empty or connection fails
const FALLBACK_APARTMENTS = [
  {
    id: "studio",
    title: "Studio Apartment",
    description: "Compact Luxury",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    beds: "1 Bedroom",
    size: null,
    details: "The studio apartment comes with fully fitted wardrobes, a kitchen, a single bathroom and a bedroom with an en-suite private balcony.",
    link: "/booking?society=Eighteen Heights&size=Studio"
  },
  {
    id: "1-bed",
    title: "1 Bedroom Apartment",
    description: "Modern Living",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    beds: "1 Bedroom",
    size: null,
    details: "This magnificent one-bedroom apartment, located just off the verge of the 18-hole golf course boasts incredible views set in a modern locale.",
    link: "/booking?society=Eighteen Heights&size=1 Bedroom"
  },
  {
    id: "2-bed",
    title: "2 Bedroom Apartment",
    description: "Cosy & Comfortable",
    image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1200&auto=format&fit=crop",
    beds: "2 Bedrooms",
    size: null,
    details: "This cosy two-bedroom apartment comprises two en-suite bathrooms, a powder room and a parking space.",
    link: "/booking?society=Eighteen Heights&size=2 Bedroom"
  },
  {
    id: "3-bed",
    title: "3 Bedroom Apartment",
    description: "Spacious Sophistication",
    image: "https://images.unsplash.com/photo-1502005229766-939cb0a54109?q=80&w=1200&auto=format&fit=crop",
    beds: "3 Beds",
    size: "2,196+ ft²",
    details: "This sophisticated 3-bedroom apartment is sprawled on 2,196 ft² to 2,207 ft² of area in the heart of the development.",
    link: "/booking?society=Eighteen Heights&size=3 Bedroom"
  },
  {
    id: "penthouse",
    title: "Penthouse",
    description: "Ultimate Luxury",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    beds: "5 Beds",
    size: "4,409+ ft²",
    details: "Designed by British and Italian designers, this decadent 5-bedroom penthouse apartment offers a space ranging from 4,409 ft² to 4,579 ft².",
    link: "/booking?society=Eighteen Heights&size=Penthouse",
    isWide: true
  }
]

export default async function TheHeightsPage() {
  let apartmentData = FALLBACK_APARTMENTS
  
  try {
    const page = await prisma.page.findUnique({
      where: { slug: 'eighteen-the-heights' },
      include: { sections: true }
    })
    
    const apartmentsSection = page?.sections.find(s => s.type === 'APARTMENT_LIST')
    if (apartmentsSection?.content) {
      apartmentData = JSON.parse(apartmentsSection.content)
    }
  } catch (error) {
    console.warn("Database connection failed in The Heights page, using fallback data.", error)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden bg-slate-900 text-white">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop"
          alt="The Heights at Eighteen"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl drop-shadow-lg">
            The Heights
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl drop-shadow-md">
            Luxury apartments overlooking the 18-hole golf course.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="container py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Elevated Living In Pakistan</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Heights hosts over 28 pavilion-style buildings, with limited apartments per floor and a maximum of seven stories. Offering premium homes with spacious balconies, these apartments range from studio to three-bedroom apartments and five-bedroom penthouse configurations flexible enough to please a range of needs and lifestyles.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These unique settlement plans are offered on an area from 775 ft² to 4,579 ft². The beauty of interior space is complemented by the views to the 18-hole golf course.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                "18-Hole Golf Course",
                "Contemporary Designs",
                "World Class Amenities",
                "4-Year Easy Payment Plan",
                "Secure Gated Community",
                "Premium Sub Urban Lifestyle",
                "Fully Fitted With High End Fixtures"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-xl overflow-hidden shadow-2xl">
             <Image
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury Apartment Interior"
                fill
                className="object-cover"
              />
          </div>
        </div>
      </section>

      {/* Apartment Types Section */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Apartment Configurations</h2>
            <p className="mt-4 text-lg text-slate-600">Find the perfect space for your lifestyle</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {apartmentData.map((apt: any) => (
              <Card key={apt.id} className={`flex flex-col ${apt.isWide ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <div className={`w-full bg-slate-200 relative overflow-hidden rounded-t-lg ${apt.isWide ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  {apt.image ? (
                    <Image
                      src={apt.image}
                      alt={apt.title}
                      fill
                      className="object-cover"
                      sizes={apt.isWide ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                      <ImageIcon className="h-12 w-12 opacity-50" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{apt.title}</CardTitle>
                  <CardDescription>{apt.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1"><Bed className="h-5 w-5" /> {apt.beds}</div>
                    {apt.size && (
                      <div className="flex items-center gap-1"><Maximize className="h-5 w-5" /> {apt.size}</div>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    {apt.details}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={apt.link}>Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
