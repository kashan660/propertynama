import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Top Picks - Faisal Town Group | PropertyNama",
  description: "Explore our top recommendation: Faisal Town Group - Building Tomorrow Together.",
}

export default function TopPicksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Our Top Pick: Faisal Town Group
          </h1>
          <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
            Building Tomorrow Together - A Legacy of Excellence
          </p>
        </div>
      </section>

      {/* About Faisal Town Group */}
      <section className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
              Est. 2013
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Transforming Lives, Building Legacies</h2>
            <p className="text-lg text-slate-600 mb-4">
              Faisal Town Group is a trailblazer in Pakistan's real estate industry, setting benchmarks for innovation, quality, and excellence.
            </p>
            <p className="text-slate-600 mb-6">
              Under Chaudhry Abdul Majeed’s leadership, it grew by delivering modern, affordable communities with transparency and timely development, continually enriching lives and shaping Pakistan’s future through purposeful, people-focused progress.
            </p>
            <Button asChild>
              <Link href="/faisal-town/phase-2">View Projects</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
              alt="Faisal Town Development"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Residential Communities</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Integrated townships designed for holistic living experiences.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Faisal Hills</CardTitle>
                <CardDescription>Total Area: 15 Million SQM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                   <Image 
                     src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop" 
                     alt="Faisal Hills"
                     fill
                     className="object-cover"
                   />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  A premium community nestled in the foothills of Margalla, offering serene views and modern amenities.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faisal Town-II</CardTitle>
                <CardDescription>Total Area: 40 Million SQM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                   <Image 
                     src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000&auto=format&fit=crop" 
                     alt="Faisal Town II"
                     fill
                     className="object-cover"
                   />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The flagship project redefining luxury living with state-of-the-art infrastructure and prime location.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/faisal-town/phase-2">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faisal Margalla City</CardTitle>
                <CardDescription>Total Area: 2.2 Million SQM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                   <Image 
                     src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=1000&auto=format&fit=crop" 
                     alt="Faisal Margalla City"
                     fill
                     className="object-cover"
                   />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                   Designed for those who seek perfection, offering a blend of natural beauty and urban convenience.
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* High Rise Projects */}
      <section className="container py-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Master Planned High Rise Projects</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Iconic developments that set new benchmarks in architectural excellence.
            </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
             <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-6 rounded-xl">
                <div className="w-full md:w-1/2 relative h-[250px] rounded-lg overflow-hidden">
                   <Image 
                     src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop" 
                     alt="Faisal Heights"
                     fill
                     className="object-cover"
                   />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                   <h3 className="text-2xl font-bold">Faisal Heights</h3>
                   <p className="text-sm text-muted-foreground">Total Area: 1.2 Million Sq ft</p>
                   <p className="text-slate-600">A vertical masterpiece offering luxury apartments and commercial spaces.</p>
                   <Button>Enquire Now</Button>
                </div>
             </div>

             <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-6 rounded-xl">
                <div className="w-full md:w-1/2 relative h-[250px] rounded-lg overflow-hidden">
                   <Image 
                     src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
                     alt="Faisal Jewel"
                     fill
                     className="object-cover"
                   />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                   <h3 className="text-2xl font-bold">Faisal Jewel</h3>
                   <p className="text-sm text-muted-foreground">Total Area: 1.1 Million SQ FT</p>
                   <p className="text-slate-600">The crown jewel of Faisal Town, featuring premium amenities and stunning architecture.</p>
                   <Button>Enquire Now</Button>
                </div>
             </div>
        </div>
      </section>
    </div>
  )
}
