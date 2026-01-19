
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon } from "lucide-react"

export const metadata: Metadata = {
  title: 'Real Estate Blog | PropertyNama',
  description: 'Expert insights, investment guides, and market analysis for buying property in Pakistan.',
  keywords: ['Real Estate Blog Pakistan', 'Investment Guide', 'Property Tips', 'Overseas Pakistanis Real Estate'],
}

export const revalidate = 3600

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.warn("Database connection failed in Blog page.", error)
  }

  return (
    <div className="container py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">Property Insights & Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert analysis and guides to help you make informed real estate decisions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow group">
            <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] w-full block bg-muted">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                  <ImageIcon className="h-12 w-12 opacity-50" />
                </div>
              )}
            </Link>
            <CardHeader>
              <CardTitle className="line-clamp-2 text-xl hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </CardTitle>
              <div className="flex items-center space-x-2 pt-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>PN</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{post.author || 'PropertyNama Team'}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                Read Article &rarr;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
