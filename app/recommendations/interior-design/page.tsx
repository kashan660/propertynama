import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Palette, Sofa, LayoutTemplate, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Interior Design Services | PropertyNama",
  description: "Luxury interior design services for homes, villas, and apartments.",
}

export default function InteriorDesignPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Interior Design Excellence
          </h1>
          <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
            Transforming spaces into timeless masterpieces of comfort and style.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link href="/contact-us">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative h-[500px] w-full">
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-xl overflow-hidden z-10 shadow-lg">
               <Image 
                 src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=1000&auto=format&fit=crop" 
                 alt="Modern Living Room"
                 fill
                 className="object-cover"
               />
            </div>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-xl overflow-hidden z-20 shadow-xl border-4 border-white">
               <Image 
                 src="https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=1000&auto=format&fit=crop" 
                 alt="Luxury Bedroom"
                 fill
                 className="object-cover"
               />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Elevating Lifestyle Through Design</h2>
            <p className="text-lg text-slate-600 mb-4">
              We believe that interior design is more than just arranging furniture; it's about creating an atmosphere that reflects your personality and enhances your daily life.
            </p>
            <p className="text-slate-600 mb-6">
              Our team of expert designers specializes in creating bespoke interiors for luxury homes, villas, and apartments. We blend modern trends with timeless elegance to deliver spaces that are both beautiful and functional.
            </p>
            <ul className="space-y-3 mb-8">
               <li className="flex items-center text-slate-700">
                  <Sparkles className="h-5 w-5 text-primary mr-3" />
                  Custom Furniture Design
               </li>
               <li className="flex items-center text-slate-700">
                  <Sparkles className="h-5 w-5 text-primary mr-3" />
                  Lighting & Color Consultation
               </li>
               <li className="flex items-center text-slate-700">
                  <Sparkles className="h-5 w-5 text-primary mr-3" />
                  Space Planning & Optimization
               </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Expertise</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Tailored solutions for every corner of your home.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
             <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                   <Sofa className="h-10 w-10 text-primary mb-2" />
                   <CardTitle>Luxury Homes</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">
                      Complete interior solutions for large residences, ensuring a cohesive and sophisticated look throughout the property.
                   </p>
                </CardContent>
             </Card>

             <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                   <LayoutTemplate className="h-10 w-10 text-primary mb-2" />
                   <CardTitle>Villas</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">
                      Designing expansive villa interiors that maximize natural light and connect indoor spaces with the outdoors.
                   </p>
                </CardContent>
             </Card>

             <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                   <Palette className="h-10 w-10 text-primary mb-2" />
                   <CardTitle>Apartments</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">
                      Smart and stylish designs for urban apartments, focusing on space optimization without compromising on luxury.
                   </p>
                </CardContent>
             </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Highlight */}
      <section className="container py-16">
         <h2 className="text-3xl font-bold tracking-tight mb-8">Recent Projects</h2>
         <div className="grid gap-4 md:grid-cols-4 h-[500px]">
            <div className="md:col-span-2 relative rounded-xl overflow-hidden group">
               <Image 
                 src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" 
                 alt="Modern Kitchen"
                 fill
                 className="object-cover transition-transform group-hover:scale-105"
                 placeholder="blur"
                 blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                     <h3 className="text-xl font-bold">Modern Kitchen Redesign</h3>
                     <p className="text-sm">Bahria Town Phase 8</p>
                  </div>
               </div>
            </div>
            <div className="relative rounded-xl overflow-hidden group">
               <Image 
                 src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop" 
                 alt="Living Area"
                 fill
                 className="object-cover transition-transform group-hover:scale-105"
                 placeholder="blur"
                 blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                     <h3 className="text-lg font-bold">Living Area</h3>
                     <p className="text-xs">DHA Phase 2</p>
                  </div>
               </div>
            </div>
            <div className="relative rounded-xl overflow-hidden group">
               <Image 
                 src="https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=1000&auto=format&fit=crop" 
                 alt="Master Bedroom"
                 fill
                 className="object-cover transition-transform group-hover:scale-105"
                 placeholder="blur"
                 blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                     <h3 className="text-lg font-bold">Master Suite</h3>
                     <p className="text-xs">Faisal Hills</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}
