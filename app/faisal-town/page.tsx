import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FaisalTown() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <section className="relative h-[400px] w-full overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="relative z-20 container flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Faisal Town
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
            A Premium Housing Project in Islamabad
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Faisal Town Phase 1</h2>
            <p className="text-muted-foreground mb-6">
              The flagship project that set new standards for luxury living in Islamabad. 
              Located near Fateh Jang Interchange, offering fully developed plots and houses.
            </p>
            <Link href="/faisal-town/phase-1">
              <Button>Explore Phase 1</Button>
            </Link>
          </div>
          <div className="rounded-lg border p-8 hover:shadow-lg transition-shadow bg-slate-50">
            <h2 className="text-2xl font-bold mb-4">Faisal Town Phase 2</h2>
            <p className="text-muted-foreground mb-6">
              The latest addition offering modern infrastructure and a prime location near Thalian Interchange.
              An excellent investment opportunity with flexible payment plans.
            </p>
            <Link href="/faisal-town/phase-2">
              <Button>Explore Phase 2</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
