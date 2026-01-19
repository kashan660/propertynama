import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Hammer, Home, Ruler } from "lucide-react"

export const metadata: Metadata = {
  title: "House Construction Services | PropertyNama",
  description: "Premium construction services for houses, villas, and farmhouses.",
}

export default function HouseConstructionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            House Construction Services
          </h1>
          <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
            Building your dream home with precision, quality, and excellence.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" asChild>
              <Link href="/contact-us">Get a Quote</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
              View Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Construction Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We offer comprehensive construction solutions tailored to your needs.
            </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                   <Home className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Luxury Houses</CardTitle>
                <CardDescription>Modern homes with premium finishes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We specialize in constructing luxury homes that blend aesthetics with functionality. From foundation to finishing, we ensure every detail is perfect.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                   <Ruler className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Villas</CardTitle>
                <CardDescription>Spacious and elegant villa construction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team has extensive experience in building spacious villas that offer comfort and style. We use high-quality materials to ensure durability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                 <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                   <Hammer className="h-8 w-8 text-primary" />
                 </div>
                <CardTitle>Farmhouses</CardTitle>
                <CardDescription>Serene retreats built to nature</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                   Create your perfect getaway with our farmhouse construction services. We design and build structures that harmonize with their natural surroundings.
                </p>
              </CardContent>
            </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
               <Image
                 src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop"
                 alt="Construction Site"
                 fill
                 className="object-cover"
                 placeholder="blur"
                 blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
               />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Why Choose PropertyNama Construction?</h2>
              <div className="space-y-4">
                 <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                       <h3 className="font-semibold">Quality Assurance</h3>
                       <p className="text-slate-600">We never compromise on the quality of materials and workmanship.</p>
                    </div>
                 </div>
                 <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                       <h3 className="font-semibold">Timely Delivery</h3>
                       <p className="text-slate-600">We respect your time and ensure projects are completed within the agreed timeline.</p>
                    </div>
                 </div>
                 <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                       <h3 className="font-semibold">Transparent Pricing</h3>
                       <p className="text-slate-600">No hidden costs. We provide detailed estimates and keep you informed throughout the process.</p>
                    </div>
                 </div>
                 <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                       <h3 className="font-semibold">Expert Team</h3>
                       <p className="text-slate-600">Our team consists of experienced architects, engineers, and skilled laborers.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 text-center">
         <div className="bg-primary/5 rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Home?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
               Contact us today for a free consultation and estimate. Let's turn your vision into reality.
            </p>
            <Button size="lg" asChild>
               <Link href="/contact-us">Start Your Project</Link>
            </Button>
         </div>
      </section>
    </div>
  )
}
