import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Download } from "lucide-react"

export const metadata: Metadata = {
  title: 'Faisal Town Phase 2 Payment Plan | PropertyNama',
  description: 'Detailed payment plan for Faisal Town Phase 2. 5 Marla, 8 Marla, 10 Marla, 14 Marla, 1 Kanal and 2 Kanal residential plots.',
}

export default function FaisalTownPaymentPlanPage() {
  const plans = [
    {
      size: "5.56 Marla",
      dimensions: "25 x 50",
      total: "2,795,000",
      downPayment: "595,000",
      installment: "120,000",
      possession: "540,000",
      features: ["3.5 Years Plan", "18 Quarterly Installments"]
    },
    {
      size: "8 Marla",
      dimensions: "30 x 60",
      total: "3,825,000",
      downPayment: "725,000",
      installment: "170,000",
      possession: "840,000",
      features: ["3.5 Years Plan", "18 Quarterly Installments"]
    },
    {
      size: "10.89 Marla",
      dimensions: "35 x 70",
      total: "4,925,000",
      downPayment: "845,000",
      installment: "225,000",
      possession: "1,130,000",
      features: ["3.5 Years Plan", "18 Quarterly Installments"]
    },
    {
      size: "14.22 Marla",
      dimensions: "40 x 80",
      total: "6,095,000",
      downPayment: "1,125,000",
      installment: "275,000",
      possession: "1,420,000",
      features: ["3.5 Years Plan", "18 Quarterly Installments"]
    },
    {
      size: "1 Kanal",
      dimensions: "50 x 90",
      total: "8,055,000",
      downPayment: "1,265,000",
      installment: "375,000",
      possession: "2,040,000",
      features: ["3.5 Years Plan", "18 Quarterly Installments"]
    },
    {
      size: "2 Kanal",
      dimensions: "75 x 120",
      total: "15,000,000", // Estimated based on 1 Kanal * ~1.9
      downPayment: "2,500,000",
      installment: "600,000",
      possession: "Call for Details",
      isEstimate: true,
      features: ["3.5 Years Plan", "Premium Location"]
    }
  ]

  return (
    <div className="container py-16 space-y-12">
      <div className="text-center space-y-4">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Payment Schedule 2024</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Faisal Town Phase 2 Payment Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Flexible installment options designed for your convenience. Secure your future with affordable rates.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.size} className="flex flex-col border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="bg-primary/5 border-b border-primary/5 pb-8">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-primary">{plan.size}</CardTitle>
                <p className="text-muted-foreground font-medium">{plan.dimensions} ft</p>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-8 space-y-6">
              <div className="flex justify-between items-end border-b pb-4">
                <span className="text-muted-foreground">Total Price</span>
                <span className="text-2xl font-bold">PKR {plan.total}</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Down Payment</span>
                  <span className="font-semibold">PKR {plan.downPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quarterly Installment</span>
                  <span className="font-semibold">PKR {plan.installment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Possession</span>
                  <span className="font-semibold">{plan.possession.includes('PKR') || plan.possession.includes('Call') ? plan.possession : `PKR ${plan.possession}`}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-6 pb-8">
              <Link href={`/booking?society=Faisal Town Phase 2&size=${encodeURIComponent(plan.size)}`} className="w-full">
                <Button className="w-full text-lg h-12" size="lg">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 bg-slate-50 p-8 rounded-xl border border-dashed">
        <h3 className="text-2xl font-bold">Download Full Payment Schedule</h3>
        <p className="text-muted-foreground text-center max-w-xl">
          Get the complete detailed payment plan in PDF format including terms and conditions.
        </p>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
