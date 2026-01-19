import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ArrowLeftIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface NewsItemPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: NewsItemPageProps): Promise<Metadata> {
  try {
    const item = await prisma.newsItem.findUnique({
      where: { slug: params.slug }
    })

    if (!item) {
      return {
        title: 'News Not Found | PropertyNama',
      }
    }

    return {
      title: item.metaTitle || item.title,
      description: item.metaDescription || item.excerpt,
      keywords: item.keywords ? item.keywords.split(',') : [],
      openGraph: {
        images: item.image ? [item.image] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Real Estate News | PropertyNama',
    }
  }
}

export default async function NewsItemPage(props: NewsItemPageProps) {
  const params = await props.params
  let item = null
  try {
    item = await prisma.newsItem.findUnique({
      where: { slug: params.slug, isPublished: true }
    })
  } catch (error) {
    console.warn("Database connection failed in News Item page.", error)
  }

  if (!item) {
    notFound()
  }

  return (
    <div className="container py-10 max-w-4xl">
      <Link href="/news-feed" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to News
      </Link>

      <article className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              {item.source || 'PropertyNama News'}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight">{item.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
             <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={item.createdAt.toISOString()}>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
             </div>
          </div>
        </div>

        {item.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 900px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
            />
          </div>
        )}

        <div className="prose prose-slate max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </article>

      <hr className="my-12 border-slate-200" />
      
      <div className="flex justify-center">
        <Button size="lg" variant="secondary" asChild>
          <Link href="/contact">
            Contact for More Info
          </Link>
        </Button>
      </div>
    </div>
  )
}
