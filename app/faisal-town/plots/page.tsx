import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faisal Town Phase 2 Plots for Sale | Best Investment",
  description: "Explore residential and commercial plots in Faisal Town Phase 2. Located near Thalian Interchange, offering high investment potential and modern amenities.",
  keywords: ["plot sale", "faisaltown phase 2", "faisal town phase 2", "overseas block", "best overseas investment society", "trusted islamabad real estate", "how to buy plots", "trusted socities in pakistan" , "rda approved socities", "cda approved socities list", "best location commercial plots"],
}

export default function FaisalTownPlots() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1920&q=80"
          alt="Faisal Town Phase 2 Plots Development"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <Badge className="mb-4 bg-primary text-white hover:bg-primary/90 text-lg py-1 px-4">Govt Approved</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Faisal Town Phase 2 Plots
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl">
            Lucrative options for residential and commercial plots near Thalian Interchange.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Overview</h2>
              <p className="text-muted-foreground text-lg">
                Faisal Town Phase 2 is an ambitious housing project strategically located near the Thalian Interchange on Chakri Road with excellent connectivity to the M-2 Lahore-Islamabad Motorway, Rawalpindi Ring Road, and Islamabad International Airport.
              </p>
              <p className="text-muted-foreground">
                This prime positioning makes it a compelling choice for homeowners and real estate investors alike, combining modern amenities with a serene living environment.
              </p>
            </div>
            <div className="grid gap-4">
              <Card>
                 <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Prime Location</h3>
                    <p className="text-sm text-muted-foreground">Strategically located near Thalian Interchange with M-2 Motorway connectivity.</p>
                 </CardContent>
              </Card>
              <Card>
                 <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Modern Infrastructure</h3>
                    <p className="text-sm text-muted-foreground">Wide carpeted roads, underground utilities, and green belts.</p>
                 </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Plots Section */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-primary">Residential Plots</h2>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
             {[
               { size: "5.56 Marla", dim: "25 x 50" },
               { size: "8 Marla", dim: "30 x 60" },
               { size: "10.89 Marla", dim: "35 x 70" },
               { size: "14.22 Marla", dim: "40 x 80" },
               { size: "1 Kanal", dim: "50 x 90" },
               { size: "2 Kanal", dim: "75 x 120" },
             ].map((plot, i) => (
               <Card key={i} className="hover:shadow-lg transition-shadow">
                 <CardHeader className="bg-primary/5">
                   <CardTitle className="text-xl text-center">{plot.size}</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 text-center">
                   <p className="text-2xl font-bold text-primary mb-2">{plot.dim}</p>
                   <p className="text-muted-foreground">Dimensions (ft)</p>
                   <Link href="/faisaltown-payment-plan">
                     <Button className="mt-4 w-full">View Payment Plan</Button>
                   </Link>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Commercial Plots Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-primary">Commercial Plots</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
             {[
               { size: "5.33 Marla", purpose: "Commercial Shopping Center" },
               { size: "8.88 Marla", purpose: "Shopping / Boulevard" },
               { size: "12.22 Marla", purpose: "Main Boulevard" },
               { size: "13.33 Marla", purpose: "Commercial Markaz" },
             ].map((plot, i) => (
               <Card key={i} className="hover:shadow-lg transition-shadow border-primary/20">
                 <CardHeader>
                   <CardTitle className="text-lg text-center">{plot.size}</CardTitle>
                 </CardHeader>
                 <CardContent className="p-4 text-center">
                   <p className="text-sm font-medium mb-2">{plot.purpose}</p>
                 </CardContent>
               </Card>
             ))}
          </div>
          <div className="mt-8 text-center max-w-2xl mx-auto text-muted-foreground">
             These plots are suitable for retail outlets, corporate offices, showrooms, and mixed-use developments, positioned to capture business potential and foot traffic.
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-primary">Key Features & Amenities</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Educational Institutions",
              "Healthcare Facilities",
              "Commercial Centers",
              "Green Spaces & Parks",
              "24/7 Security",
              "Wide Roads & Drainage",
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                <Check className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
