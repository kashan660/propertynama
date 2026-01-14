import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faisal Town Phase 2 Zone 1 | Overseas & General Block",
  description: "Detailed information about Faisal Town Phase 2 Zone 1, featuring General Block, Overseas Block, and Model Block. Best investment options for families and overseas Pakistanis.",
  keywords: ["faisal town phase 2 zone 1", "overseas block", "general block", "model block", "best overseas investment society", "plot sale islamabad"],
}

export default function Zone1Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden bg-black/60">
        <div className="absolute inset-0 z-0">
           <div className="h-full w-full bg-gradient-to-br from-indigo-900 to-purple-900" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <Badge className="mb-4 bg-indigo-500 hover:bg-indigo-600 text-white text-lg py-1 px-4">Zone 1</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            The Core Residential District
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl">
            Featuring General, Overseas, and Model Blocks with premium amenities.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6 text-center max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Faisal Town Phase 2 Zone 1 is structured around four major residential blocks—Q, R, S, and T—each designed to offer a distinct blend of living comfort, accessibility, and investment potential. These blocks form the core of the residential district and are supported by multiple sub-categories of development.
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-slate-50">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="general" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-3xl grid-cols-4">
                <TabsTrigger value="general">General Block</TabsTrigger>
                <TabsTrigger value="overseas">Overseas Block</TabsTrigger>
                <TabsTrigger value="model">Model Block</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Block – Standard Residential Living</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>The General Block is designed for families seeking well-organized living at an affordable cost. It features smooth road networks, parks, mosques, and proximity to commercial areas.</p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Plot Sizes</span>
                      <span className="text-lg font-semibold">5.56 Marla – 2 Kanal</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Purpose</span>
                      <span className="text-lg font-semibold">Standard Residential</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Ideal For</span>
                      <span className="text-lg font-semibold">Families & First-time Builders</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overseas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overseas Block – Premium Zone for International Buyers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>The Overseas Block offers upgraded features, enhanced security, and prime locations within Zone 1. It is tailored for Pakistanis living abroad who want a safe, well-managed investment.</p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Plot Sizes</span>
                      <span className="text-lg font-semibold">5.56 Marla – 2 Kanal</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Purpose</span>
                      <span className="text-lg font-semibold">High-Standard Living</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Ideal For</span>
                      <span className="text-lg font-semibold">Overseas Pakistanis</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="model" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Model Block (Sector O) – Semi-Developed Premium District</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>The Model Block, also referred to as Sector O, is planned with future-ready residential layouts. It has a more premium feel due to its strategic location and early development focus.</p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Plot Sizes</span>
                      <span className="text-lg font-semibold">5.56 Marla – 1 Kanal+</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Purpose</span>
                      <span className="text-lg font-semibold">Elevated Living</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Ideal For</span>
                      <span className="text-lg font-semibold">Early Builders & Premium Investors</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commercial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Commercial Corridors – Retail & Business Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Strategic commercial belts run across Zone 1, ensuring that all blocks—including Q, R, S, and T—have convenient access to shopping and business spaces.</p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Allocation</span>
                      <span className="text-lg font-semibold">Designated Commercial Zones</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Purpose</span>
                      <span className="text-lg font-semibold">Retail, Offices, Marts</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <span className="block font-bold text-sm uppercase text-muted-foreground">Ideal For</span>
                      <span className="text-lg font-semibold">Business Owners</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Blocks Grid */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Residential Blocks Q, R, S, T</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
             {[
               { name: "Q Block", desc: "Community-focused residential living.", ideal: "Families" },
               { name: "R Block", desc: "Prime connectivity & high investment potential.", ideal: "Investors" },
               { name: "S Block", desc: "Spacious, green, family-oriented living.", ideal: "Fitness-minded" },
               { name: "T Block", desc: "Mixed-use integrated living.", ideal: "Business Owners" },
             ].map((block, i) => (
               <Card key={i} className="bg-secondary/10 border-none">
                 <CardHeader>
                   <CardTitle>{block.name}</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm mb-4">{block.desc}</p>
                   <p className="text-xs font-semibold text-primary">Ideal for: {block.ideal}</p>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>
    </div>
  )
}
