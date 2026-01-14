
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"

export const metadata: Metadata = {
  title: 'Top 4 Real Estate Investment Projects in Islamabad | PropertyNama',
  description: 'Discover the best investment opportunities in Islamabad: Faisal Town Phase 2, Rudn Enclave, Eighteen, and Bahria Town Phase 8. Expert analysis for 2024.',
  keywords: ['Best Investment Islamabad', 'Faisal Town Phase 2', 'Rudn Enclave', 'Eighteen Islamabad', 'Bahria Town Phase 8', 'Real Estate Pakistan', 'Property Investment'],
}

export const revalidate = 3600 // Revalidate every hour

export default async function NewsFeedPage() {
  const newsItems = await prisma.newsItem.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">Real Estate News & Insights</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert analysis and latest updates on Pakistan's property market.
        </p>
      </div>

      {/* SEO Content Section */}
      <section className="mb-16 space-y-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Top 4 Projects in Islamabad for Best Investment
          </h2>
          <p className="text-lg text-muted-foreground">
            For investors seeking high returns and secure assets, we have curated the ultimate list of the top 4 real estate projects in Islamabad. Whether you are an overseas Pakistani or a local investor, these societies offer the perfect blend of growth, luxury, and reliability.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 1. Faisal Town Phase 2 */}
          <Card className="border-2 border-primary/10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg font-bold text-sm">
              #1 Choice
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Faisal Town Phase 2</CardTitle>
              <CardDescription>The Flagship Investment Opportunity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Faisal Town Phase 2 stands as our top recommendation for investment in Islamabad. Launched by the renowned Zedem International and Chaudhry Abdul Majeed, this project has shattered records in development speed and delivery.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Location:</strong> Prime location near Thalian Interchange with direct access from Motorway.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Why Invest:</strong> High appreciation potential, transparent NOC status, and rapid on-ground development.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 2. Rudn Enclave */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
             <CardHeader>
              <CardTitle className="text-2xl">Rudn Enclave</CardTitle>
              <CardDescription>The Jewel of Ring Road</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Rudn Enclave is a masterpiece designed by NESPAK, located at the zero point of the Rawalpindi Ring Road. It connects seamlessly to the CPEC route and offers breathtaking views of the Khasala Dam.
              </p>
              <ul className="space-y-2 text-sm">
                 <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Location:</strong> Adiala Road, adjacent to Ring Road Interchange.
                </li>
                 <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Why Invest:</strong> Strategic location gain from Ring Road, affordable payment plans, and world-class planning.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. Eighteen Islamabad */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
             <CardHeader>
              <CardTitle className="text-2xl">Eighteen Islamabad</CardTitle>
              <CardDescription>Elite Luxury Living</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For those who seek the finest lifestyle, Eighteen offers an exclusive gated community with a championship 18-hole golf course. It is the gold standard for high-end living in the capital.
              </p>
               <ul className="space-y-2 text-sm">
                 <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Location:</strong> Kashmir Highway, minutes from New Islamabad Airport.
                </li>
                 <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Why Invest:</strong> Ready-to-move options, title deed available, and dollar-pegged asset value protection.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 4. Bahria Town Phase 8 */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
             <CardHeader>
              <CardTitle className="text-2xl">Bahria Town Phase 8</CardTitle>
              <CardDescription>The Established Giant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Bahria Town Phase 8 is a developed and inhabited sector offering immediate ROI. With its commercial hub and upcoming extension, it remains a favorite for safe and steady gains.
              </p>
               <ul className="space-y-2 text-sm">
                 <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Location:</strong> Connected via GT Road and upcoming Ring Road access.
                </li>
                 <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <strong>Why Invest:</strong> Developed infrastructure, active commercial district, and secure rental income.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold tracking-tight">Latest News</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Card key={item.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video w-full">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{item.source || 'PropertyNama'}</Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                <Link href={`/news-feed/${item.slug}`}>
                  {item.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                {item.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/news-feed/${item.slug}`} className="text-sm font-medium text-primary hover:underline">
                Read full story &rarr;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
