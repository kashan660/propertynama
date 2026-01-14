import Link from 'next/link'
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, MapPin, ShieldCheck, Home } from "lucide-react"

export default function FaisalTownPhase2() {
  return (
    <div className="flex min-h-screen flex-col">
      
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden bg-slate-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="relative container flex h-full flex-col items-center justify-center text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">New Launch</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Faisal Town Phase 2
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
            Paving the path towards a lavish lifestyle. A project by Zedem International.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/booking?society=Faisal Town Phase 2">
              <Button size="lg" className="font-bold">Book Now</Button>
            </Link>
            <Link href="/faisaltown-payment-plan">
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">View Payment Plan</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Overview</h2>
            <p className="text-lg text-slate-600 mb-4">
              Faisal Town Phase 2 is a state-of-the-art housing project by Zedem International, strategically located near Thalian Interchange. It offers a perfect blend of modernity and natural beauty, designed to meet the future urban needs of Islamabad and Rawalpindi.
            </p>
            <p className="text-slate-600 mb-6">
              With plot sizes ranging from 5.56 Marla to 2 Kanal, and a flexible 4-5 year payment plan, it presents a golden investment opportunity. The project features wide roads, underground electrification, and world-class amenities.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Thalian Interchange Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>M-2 Motorway Frontage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>RDA Approved (In Process)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Gated Community</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000&auto=format&fit=crop" 
              alt="Faisal Town Phase 2 Master Plan" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Location Features */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Prime Location</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Strategically positioned for maximum connectivity and accessibility.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Direct Access</CardTitle>
              </CardHeader>
              <CardContent>
                Located at Thalian Interchange with direct access from M-2 Motorway and Chakri Road.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure Environment</CardTitle>
              </CardHeader>
              <CardContent>
                A fully secure gated community with 24/7 surveillance and security patrols.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Home className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Near Airport</CardTitle>
              </CardHeader>
              <CardContent>
                Just a few minutes drive from New Islamabad International Airport.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Plan */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Payment Plan</h2>
          <p className="text-slate-600">Flexible installment options spanning 4.5 years.</p>
        </div>
        
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Plot Size</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Down Payment (20%)</th>
                <th className="px-6 py-3">Installments (18 Qtr)</th>
                <th className="px-6 py-3">Possession (20%)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">5.56 Marla</td>
                <td className="px-6 py-4">PKR 2,795,000</td>
                <td className="px-6 py-4">PKR 595,000</td>
                <td className="px-6 py-4">PKR 120,000</td>
                <td className="px-6 py-4">PKR 540,000</td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">8 Marla</td>
                <td className="px-6 py-4">PKR 3,825,000</td>
                <td className="px-6 py-4">PKR 725,000</td>
                <td className="px-6 py-4">PKR 170,000</td>
                <td className="px-6 py-4">PKR 840,000</td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">10.89 Marla</td>
                <td className="px-6 py-4">PKR 4,925,000</td>
                <td className="px-6 py-4">PKR 845,000</td>
                <td className="px-6 py-4">PKR 225,000</td>
                <td className="px-6 py-4">PKR 1,130,000</td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">14.22 Marla</td>
                <td className="px-6 py-4">PKR 6,095,000</td>
                <td className="px-6 py-4">PKR 1,125,000</td>
                <td className="px-6 py-4">PKR 275,000</td>
                <td className="px-6 py-4">PKR 1,420,000</td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">1 Kanal</td>
                <td className="px-6 py-4">PKR 8,055,000</td>
                <td className="px-6 py-4">PKR 1,265,000</td>
                <td className="px-6 py-4">PKR 375,000</td>
                <td className="px-6 py-4">PKR 2,040,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">* Prices are subject to change. Development charges are not included.</p>
            <Link href="/booking?society=Faisal Town Phase 2">
              <Button size="lg">Contact for Booking</Button>
            </Link>
        </div>
      </section>
    </div>
  )
}
