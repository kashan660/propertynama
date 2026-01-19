import { Metadata } from 'next'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await prisma.page.findUnique({ where: { slug: 'about-us' } })
    if (!page) {
      return {
        title: "About PropertyNama | Trusted Real Estate for Overseas Pakistanis",
        description: "PropertyNama.pk helps overseas Pakistanis invest in verified plots, villas, apartments, and commercial property in Pakistan. Secure, high-ROI, and fully transparent services.",
        keywords: [
          "overseas Pakistanis property investment",
          "property investment in Pakistan",
          "buy property in Pakistan from abroad",
          "real estate Pakistan",
          "Islamabad property",
          "Rawalpindi real estate",
          "Lahore property investment"
        ],
        openGraph: { images: [] },
      }
    }

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || "PropertyNama.pk helps overseas Pakistanis invest in verified plots, villas, apartments, and commercial property in Pakistan. Secure, high-ROI, and fully transparent services.",
      keywords: page.keywords ? page.keywords.split(',') : [
        "overseas Pakistanis property investment",
        "property investment in Pakistan",
        "buy property in Pakistan from abroad",
        "real estate Pakistan",
        "Islamabad property",
        "Rawalpindi real estate",
        "Lahore property investment"
      ],
      openGraph: {
        images: page.ogImage ? [page.ogImage] : [],
      },
    }
  } catch {
    return { title: "About PropertyNama" }
  }
}

export default async function AboutUsPage() {
  let page;
  try {
    page = await prisma.page.findUnique({
      where: { slug: 'about-us' },
      include: { sections: { orderBy: { order: 'asc' } } }
    })
  } catch {
    page = null;
  }

  if (!page) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 bg-muted/30">
           <div className="container">
             <div className="max-w-3xl mx-auto text-center space-y-6">
               <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About PropertyNama</h1>
               <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground">
                 <p>Leading Real Estate Consultants in Pakistan for Overseas Pakistanis.</p>
               </div>
             </div>
           </div>
        </section>
      </div>
    )
  }

  // Parse sections
  const teamSection = page.sections.find(s => s.type === 'TEAM')
  const teamContent = teamSection ? JSON.parse(teamSection.content) : null

  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO / INTRO */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About PropertyNama</h1>
            <div
              className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground"
            >
              <p>
                PropertyNama.pk is Pakistan's leading real estate consultancy for <strong>overseas Pakistanis</strong>,
                helping them invest safely in verified plots, luxury villas, apartments, and commercial properties.
              </p>

              <h2>Our Mission</h2>
              <p>
                To provide <strong>transparent, secure, and high-return property investment opportunities</strong>
                while simplifying the buying process for clients abroad. Our goal is to ensure every overseas Pakistani can invest confidently in Pakistan.
              </p>

              <h2>Why Choose PropertyNama.pk?</h2>
              <ul>
                <li><strong>Expertise:</strong> Deep market knowledge of Islamabad, Rawalpindi, Lahore, and emerging CPEC-linked developments.</li>
                <li><strong>Trust:</strong> Verified listings with legally sound documentation.</li>
                <li><strong>Dedicated Support:</strong> 24/7 assistance for international clients, remote booking, and virtual consultation.</li>
                <li><strong>High ROI:</strong> Carefully selected properties with strong appreciation and rental demand.</li>
                <li><strong>End-to-End Service:</strong> From property selection to ownership transfer, we guide you every step.</li>
              </ul>

              <h2>Build Your Dream Home or Invest in Business</h2>
              <p>
                Whether you want to <strong>build your dream house</strong> or invest in commercial properties, PropertyNama.pk ensures a secure and hassle-free experience. We provide personalized guidance tailored to your investment goals.
              </p>

              <h2>Our Services for Overseas Pakistanis</h2>
              <ul>
                <li>Verified residential plots and luxury villas</li>
                <li>Commercial properties for business and rental income</li>
                <li>Market analysis and investment advisory</li>
                <li>Documentation verification and legal support</li>
                <li>Remote assistance and online consultations</li>
              </ul>

              <h2>FAQs – Overseas Pakistanis Property Investment</h2>
              <ul>
                <li><strong>Can overseas Pakistanis buy property in Pakistan?</strong> Yes, with verified documentation and approved societies, overseas Pakistanis can legally buy residential and commercial property.</li>
                <li><strong>Which cities are best for investment?</strong> Islamabad, Rawalpindi, and Lahore are top choices due to approved societies and strong capital growth.</li>
                <li><strong>Does PropertyNama assist remotely?</strong> Yes, we provide remote consultations, verification, and ownership transfer assistance for international clients.</li>
              </ul>

              <p>
                <strong>Contact PropertyNama.pk today</strong> to start your investment journey and secure high-ROI, verified properties in Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      {teamContent && (
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">{teamContent.title}</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {teamContent.members.map((member: any, index: number) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-background shadow-xl bg-muted flex items-center justify-center">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Avatar className="h-full w-full">
                        <AvatarFallback className="text-4xl">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
