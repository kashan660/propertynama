import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash } from "lucide-react"
import prisma from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function AdminBlogsPage() {
  let blogs: any[] = [];
  try {
    blogs = await prisma.blogPost.findMany({
      orderBy: { updatedAt: 'desc' }
    })
  } catch (error) {
    console.warn("Database connection failed in Admin Blogs page.", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/blogs/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-card">
        <div className="flex items-center justify-between border-b p-4 font-medium">
          <div className="w-1/3">Title</div>
          <div className="w-1/3">Status</div>
          <div className="w-1/3 text-right">Actions</div>
        </div>
        {blogs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No blog posts found. Create one to get started.
          </div>
        ) : (
          blogs.map((post) => (
            <div key={post.id} className="flex items-center justify-between border-b p-4 last:border-0">
              <div className="w-1/3 font-medium truncate pr-4">{post.title}</div>
              <div className="w-1/3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  post.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex w-1/3 justify-end space-x-2">
                <Link href={`/admin/blogs/${post.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
