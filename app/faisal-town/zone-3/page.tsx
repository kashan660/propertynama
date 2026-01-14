import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Cpu, GraduationCap } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faisal Town Phase 2 Zone 3 | Silicon City & Tech Zone",
  description: "Explore Silicon City and Education City in Faisal Town Phase 2 Zone 3. A tech-inspired residential zone with smart infrastructure and high investment potential.",
  keywords: ["faisal town phase 2 zone 3", "silicon city", "tech zone", "smart city islamabad", "where to invest in pakistan", "which society is best", "best overseas investment society", "plot for sale"],
}

export default function Zone3Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden bg-black/60">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
          alt="Silicon & Education City"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-900/40 to-blue-900/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <Badge className="mb-4 bg-cyan-500 hover:bg-cyan-600 text-white text-lg py-1 px-4">Zone 3</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Silicon & Education City
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl">
            A tech-inspired residential zone with advanced infrastructure and academic excellence.
          </p>
        </div>
      </section>

      {/* Main Highlights */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Education City</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Replacing traditional block names with a smartly planned cluster of I, J, K, and L Blocks. Designed around an academic and modern living concept, offering residents direct access to quality educational facilities.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-blue-500"/> I, J, K, L Blocks</li>
                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-blue-500"/> Plot sizes 5.5 Marla to 2.5 Kanal</li>
                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-blue-500"/> Integrated Academic Zones</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-8 w-8 text-cyan-600" />
                <h2 className="text-2xl font-bold">Silicon City</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                A modern, tech-inspired residential zone designed to deliver a smart, connected, and future-ready lifestyle. With advanced infrastructure, wide roads, and planned commercial avenues.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-cyan-500"/> Smart Infrastructure</li>
                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-cyan-500"/> Tech-inspired Lifestyle</li>
                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-cyan-500"/> High Investment Potential</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block Details Table */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Education City – Block Details</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { block: "I", size: "5.5 Marla – 1.5 Kanal", feature: "Balanced academic + residential environment", ideal: "Families, Students" },
              { block: "J", size: "7 Marla – 2 Kanal", feature: "Modern planning with organized academic zones", ideal: "Professionals" },
              { block: "K", size: "5.5 Marla – 2 Kanal", feature: "Residential comfort with nearby educational institutes", ideal: "Investors" },
              { block: "L", size: "10 Marla – 2.5 Kanal", feature: "Premium plots with top-tier educational access", ideal: "High-End Buyers" },
            ].map((item, i) => (
              <Card key={i} className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl">Block {item.block}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">Plot Sizes</p>
                    <p className="font-medium">{item.size}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">Key Features</p>
                    <p className="text-sm">{item.feature}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">Ideal For</p>
                    <p className="text-sm text-blue-600 font-semibold">{item.ideal}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
