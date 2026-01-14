
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle2, Home, Maximize, Bed } from "lucide-react"

export const metadata: Metadata = {
  title: 'The Heights - Eighteen Islamabad | Luxury Apartments',
  description: 'The Heights at Eighteen Islamabad offers premium 1-3 bedroom apartments and 5-bedroom penthouses with views of the 18-hole golf course.',
}

export default function TheHeightsPage() {
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
            {/* Studio */}
            <Card className="flex flex-col">
              <div className="aspect-[4/3] w-full bg-slate-200 relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/apartments/studio.svg"
                  alt="Studio Apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Studio Apartment</CardTitle>
                <CardDescription>Compact Luxury</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Bed className="h-5 w-5" />
                  <span>1 Bedroom</span>
                </div>
                <p className="text-sm text-slate-600">
                  The studio apartment comes with fully fitted wardrobes, a kitchen, a single bathroom and a bedroom with an en-suite private balcony.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/booking?society=Eighteen Heights&size=Studio">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* 1 Bedroom */}
            <Card className="flex flex-col">
               <div className="aspect-[4/3] w-full bg-slate-200 relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/apartments/1-bedroom.svg"
                  alt="1 Bedroom Apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>1 Bedroom Apartment</CardTitle>
                <CardDescription>Modern Living</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                 <div className="flex items-center gap-2 text-muted-foreground">
                  <Bed className="h-5 w-5" />
                  <span>1 Bedroom</span>
                </div>
                <p className="text-sm text-slate-600">
                  This magnificent one-bedroom apartment, located just off the verge of the 18-hole golf course boasts incredible views set in a modern locale.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/booking?society=Eighteen Heights&size=1 Bedroom">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* 2 Bedroom */}
            <Card className="flex flex-col">
               <div className="aspect-[4/3] w-full bg-slate-200 relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/apartments/2-bedroom.svg"
                  alt="2 Bedroom Apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>2 Bedroom Apartment</CardTitle>
                <CardDescription>Cosy & Comfortable</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                 <div className="flex items-center gap-2 text-muted-foreground">
                  <Bed className="h-5 w-5" />
                  <span>2 Bedrooms</span>
                </div>
                <p className="text-sm text-slate-600">
                  This cosy two-bedroom apartment comprises two en-suite bathrooms, a powder room and a parking space.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/booking?society=Eighteen Heights&size=2 Bedroom">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* 3 Bedroom */}
            <Card className="flex flex-col">
               <div className="aspect-[4/3] w-full bg-slate-200 relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/apartments/3-bedroom.svg"
                  alt="3 Bedroom Apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>3 Bedroom Apartment</CardTitle>
                <CardDescription>Spacious Sophistication</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                 <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1"><Bed className="h-5 w-5" /> 3 Beds</div>
                  <div className="flex items-center gap-1"><Maximize className="h-5 w-5" /> 2,196+ ft²</div>
                </div>
                <p className="text-sm text-slate-600">
                  This sophisticated 3-bedroom apartment is sprawled on 2,196 ft² to 2,207 ft² of area in the heart of the development.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/booking?society=Eighteen Heights&size=3 Bedroom">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

             {/* Penthouse */}
            <Card className="flex flex-col md:col-span-2 lg:col-span-2">
               <div className="aspect-[21/9] w-full bg-slate-200 relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/apartments/penthouse.svg"
                  alt="Penthouse"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Penthouse</CardTitle>
                <CardDescription>Ultimate Luxury</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                 <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1"><Bed className="h-5 w-5" /> 5 Beds</div>
                  <div className="flex items-center gap-1"><Maximize className="h-5 w-5" /> 4,409+ ft²</div>
                </div>
                <p className="text-sm text-slate-600">
                  Designed by British and Italian designers, this decadent 5-bedroom penthouse apartment offers a space ranging from 4,409 ft² to 4,579 ft².
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/booking?society=Eighteen Heights&size=Penthouse">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
