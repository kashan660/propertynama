import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Home, Paintbrush } from "lucide-react"

export const metadata: Metadata = {
  title: "Trending in Real Estate | PropertyNama",
  description: "Discover the latest trends in real estate, construction, and interior design.",
}

export default function TrendingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="relative container flex h-full flex-col items-center justify-center text-center z-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Trending Now
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Stay ahead of the curve with our curated selection of top trends.
          </p>
        </div>
      </section>

      {/* Trending Articles */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-3">
            {/* Faisal Town Article */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop" 
                   alt="Faisal Town"
                   fill
                   className="object-cover transition-transform duration-300 hover:scale-105"
                 />
                 <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> Hot
                 </div>
              </div>
              <CardHeader>
                <div className="text-sm text-primary font-medium mb-2">Real Estate</div>
                <CardTitle className="line-clamp-2">Why Faisal Town is the Best Investment in 2024</CardTitle>
                <CardDescription className="line-clamp-3">
                   Discover how Faisal Town Group is transforming the real estate landscape with its innovative projects and commitment to excellence. A deep dive into their legacy and future plans.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                 <Button variant="ghost" className="w-full justify-between group" asChild>
                    <Link href="/recommendations/top-picks">
                       Read More <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                 </Button>
              </CardFooter>
            </Card>

            {/* Construction Article */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop" 
                   alt="Modern Construction"
                   fill
                   className="object-cover transition-transform duration-300 hover:scale-105"
                 />
              </div>
              <CardHeader>
                <div className="text-sm text-primary font-medium mb-2">Construction</div>
                <CardTitle className="line-clamp-2">The Rise of Sustainable Luxury Farmhouses</CardTitle>
                <CardDescription className="line-clamp-3">
                   Explore the growing trend of eco-friendly luxury farmhouses. Learn how modern construction techniques are blending sustainability with high-end living.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                 <Button variant="ghost" className="w-full justify-between group" asChild>
                    <Link href="/recommendations/house-construction">
                       Read More <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                 </Button>
              </CardFooter>
            </Card>

            {/* Interior Design Article */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop" 
                   alt="Interior Design"
                   fill
                   className="object-cover transition-transform duration-300 hover:scale-105"
                 />
              </div>
              <CardHeader>
                <div className="text-sm text-primary font-medium mb-2">Interior Design</div>
                <CardTitle className="line-clamp-2">Minimalism Meets Luxury: 2024 Design Trends</CardTitle>
                <CardDescription className="line-clamp-3">
                   Interior design is evolving. See how the fusion of minimalist aesthetics and luxurious textures is creating timeless spaces in modern homes.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                 <Button variant="ghost" className="w-full justify-between group" asChild>
                    <Link href="/recommendations/interior-design">
                       Read More <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                 </Button>
              </CardFooter>
            </Card>
        </div>
      </section>

      {/* Newsletter Signup (Optional) */}
      <section className="bg-slate-50 py-16">
         <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Never Miss a Trend</h2>
            <p className="text-slate-600 mb-6">Subscribe to our newsletter for the latest updates in real estate and design.</p>
            <div className="flex max-w-md mx-auto gap-2">
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
               />
               <Button>Subscribe</Button>
            </div>
         </div>
      </section>
    </div>
  )
}
