
import { Metadata } from 'next'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await prisma.page.findUnique({ where: { slug: 'about-us' } })
    if (!page) return { title: 'About Us' }
    
    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
      keywords: page.keywords ? page.keywords.split(',') : [],
      openGraph: {
        images: page.ogImage ? [page.ogImage] : [],
      },
    }
  } catch (error) {
    return { title: 'About Us' }
  }
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function AboutUsPage() {
  let page;
  try {
    page = await prisma.page.findUnique({
      where: { slug: 'about-us' },
      include: { sections: { orderBy: { order: 'asc' } } }
    })
  } catch (error) {
    console.warn("Database connection failed in About Us page.", error);
    page = null;
  }

  if (!page) {
    // Return a default About Us page structure if DB fails or page not found
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 bg-muted/30">
           <div className="container">
             <div className="max-w-3xl mx-auto text-center space-y-6">
               <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About PropertyNama</h1>
               <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground">
                 <p>Leading Real Estate Consultants in Pakistan.</p>
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
      {/* Hero / Intro */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{page.title}</h1>
            {page.content && (
              <div 
                className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: page.content }} 
              />
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
