import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faisal Town Phase 2 Zone 2 | Education City & Sectors",
  description: "Discover Zone 2 of Faisal Town Phase 2, featuring Education City and Sectors I, J, K, L. Prime location near Islamabad with modern infrastructure.",
  keywords: ["faisal town phase 2 zone 2", "education city", "sector i", "sector j", "sector k", "sector l", "plot sale", "islamabad housing society"],
}

export default function Zone2Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden bg-black/60">
        <div className="absolute inset-0 z-0">
           <div className="h-full w-full bg-gradient-to-bl from-teal-900 to-emerald-900" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <Badge className="mb-4 bg-teal-500 hover:bg-teal-600 text-white text-lg py-1 px-4">Zone 2</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Education City & Modern Living
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl">
            Thoughtfully planned sectors I, J, K, and L with a focus on education and connectivity.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6 text-center max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Zone 2 is strategically located to provide easy access to both Islamabad and Rawalpindi. The area is thoughtfully planned with wide roads, green spaces, and modern infrastructure. It includes Education City and is divided into several well-organized sectors: E, I, J, K, and L.
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">Sector Details</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {[
               {
                 name: "Sector I",
                 plots: "5.5 Marla – 1.5 Kanal",
                 desc: "Balanced mix of residential plots and commercial spaces. Ideal for investors looking for high-value properties.",
                 features: ["Schools", "Marts", "Parks"]
               },
               {
                 name: "Sector J",
                 plots: "7 Marla – 2 Kanal",
                 desc: "Emphasizes modern urban living with planned recreational areas and educational facilities.",
                 features: ["Educational Facilities", "Healthcare", "Smooth Traffic"]
               },
               {
                 name: "Sector K",
                 plots: "5.5 Marla – 2 Kanal",
                 desc: "Combines residential comfort with convenient access to shopping and commercial areas.",
                 features: ["Malls", "Masjids", "Wide Roads"]
               },
               {
                 name: "Sector L",
                 plots: "10 Marla – 2.5 Kanal",
                 desc: "Designed for premium living with larger plots, proximity to hospitals, and recreational zones.",
                 features: ["Hospitals", "Mini Zoo", "Premium Plots"]
               },
               {
                 name: "Sector E",
                 plots: "5.5 Marla – 1 Kanal",
                 desc: "Family-friendly layout with abundant green spaces and walking tracks.",
                 features: ["Walking Tracks", "Schools", "Parks"]
               }
             ].map((sector, i) => (
               <Card key={i} className="hover:border-teal-500 transition-colors">
                 <CardHeader>
                   <CardTitle className="text-xl text-teal-800">{sector.name}</CardTitle>
                   <p className="text-sm font-semibold text-muted-foreground">{sector.plots}</p>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm mb-4 text-slate-600">{sector.desc}</p>
                   <div className="flex flex-wrap gap-2">
                     {sector.features.map((f, idx) => (
                       <Badge key={idx} variant="secondary" className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                         {f}
                       </Badge>
                     ))}
                   </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Amenities & Livability</h2>
          <div className="grid gap-8 md:grid-cols-2">
             <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-teal-100 p-3 rounded-full h-fit"><Check className="h-6 w-6 text-teal-700" /></div>
                  <div>
                    <h3 className="font-bold text-lg">Parks and Green Spaces</h3>
                    <p className="text-muted-foreground">Numerous parks across all sectors with jogging tracks, play zones, and landscaped gardens.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-teal-100 p-3 rounded-full h-fit"><Check className="h-6 w-6 text-teal-700" /></div>
                  <div>
                    <h3 className="font-bold text-lg">Education City</h3>
                    <p className="text-muted-foreground">Integrated layout with academic institutions providing quality learning opportunities close to home.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-teal-100 p-3 rounded-full h-fit"><Check className="h-6 w-6 text-teal-700" /></div>
                  <div>
                    <h3 className="font-bold text-lg">Shopping Malls</h3>
                    <p className="text-muted-foreground">Dedicated spaces for malls, shopping plazas, and community retail centers.</p>
                  </div>
                </div>
             </div>
             <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-teal-100 p-3 rounded-full h-fit"><Check className="h-6 w-6 text-teal-700" /></div>
                  <div>
                    <h3 className="font-bold text-lg">Mini Zoo & Recreation</h3>
                    <p className="text-muted-foreground">Family-friendly mini zoo and wildlife areas adding value to the community.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-teal-100 p-3 rounded-full h-fit"><Check className="h-6 w-6 text-teal-700" /></div>
                  <div>
                    <h3 className="font-bold text-lg">Masjids</h3>
                    <p className="text-muted-foreground">Mosques strategically located in every sector for easy access.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-teal-100 p-3 rounded-full h-fit"><Check className="h-6 w-6 text-teal-700" /></div>
                  <div>
                    <h3 className="font-bold text-lg">Healthcare</h3>
                    <p className="text-muted-foreground">Proximity to hospitals and clinics ensuring top-notch medical services.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
