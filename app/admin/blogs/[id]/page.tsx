
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import EditBlogForm from './edit-form'

export const dynamic = 'force-dynamic'

interface AdminBlogEditPageProps {
  params: {
    id: string
  }
}

export default async function AdminBlogEditPage({ params }: AdminBlogEditPageProps) {
  let post = null

  try {
    post = await prisma.blogPost.findUnique({
      where: {
        id: params.id,
      },
    })
  } catch (error) {
    console.error('Failed to fetch blog post for editing:', error)
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      <EditBlogForm post={post} />
    </div>
  )
}
