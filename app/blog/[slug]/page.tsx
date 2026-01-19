import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon, ArrowLeftIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ShareButtons from '@/components/ShareButtons'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug }
    })

    if (!post) {
      return {
        title: 'Post Not Found | PropertyNama',
      }
    }

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      keywords: post.keywords ? post.keywords.split(',') : [],
      openGraph: {
        images: post.image ? [post.image] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post | PropertyNama',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post = null
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: params.slug, isPublished: true }
    })
  } catch (error) {
    console.warn("Database connection failed in Blog Post page.", error)
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-10 max-w-4xl">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <article className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>PN</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{post.author || 'PropertyNama Team'}</span>
             </div>
             <span>•</span>
             <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.createdAt.toISOString()}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
             </div>
          </div>
        </div>

        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 900px"
            />
          </div>
        )}

        <div className="prose prose-slate max-w-none dark:prose-invert">
          {/* 
            Note: In a real app, you might want to use a markdown parser or HTML sanitizer here.
            For now, we'll assume content is safe HTML or plain text. 
            If it's just plain text with newlines, we can render it simply.
            If it's HTML from a WYSIWYG editor, we need dangerouslySetInnerHTML.
          */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Share this post</h3>
            <ShareButtons 
                url={`${process.env.NEXTAUTH_URL || 'https://propertynaama.com'}/blog/${post.slug}`} 
                title={post.title} 
            />
        </div>
      </article>

      <hr className="my-12 border-slate-200" />

      <div className="flex justify-center">
        <Button size="lg" asChild>
          <Link href="/contact">
            Interested? Contact Us
          </Link>
        </Button>
      </div>
    </div>
  )
}
