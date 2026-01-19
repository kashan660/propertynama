import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash } from "lucide-react"
import prisma from "@/lib/prisma"

export const dynamic = 'force-dynamic'

async function getPages() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' }
    })
    return pages
  } catch (e) {
    console.error("Failed to fetch pages:", e)
    return []
  }
}

export default async function AdminPages() {
  const pages = await getPages()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pages</h2>
          <p className="text-muted-foreground">Manage your website pages and content sections.</p>
        </div>
        <Link href="/admin/pages/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Page
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="flex items-center justify-between border-b bg-muted/50 p-4 font-medium">
              <div className="w-1/3">Title</div>
              <div className="w-1/3">Slug</div>
              <div className="w-1/3 text-right">Actions</div>
            </div>
            {pages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No pages found. Create one to get started.
              </div>
            ) : (
              pages.map((page) => (
                <div key={page.id} className="flex items-center justify-between border-b p-4 last:border-0">
                  <div className="w-1/3 font-medium">{page.title}</div>
                  <div className="w-1/3 text-muted-foreground">/{page.slug}</div>
                  <div className="flex w-1/3 justify-end space-x-2">
                    <Link href={`/admin/pages/${page.id}`}>
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
            
            {/* Demo Item if DB is empty */}
            {pages.length === 0 && (
               <div className="flex items-center justify-between border-b p-4 last:border-0 opacity-50">
                  <div className="w-1/3 font-medium">Home (Demo)</div>
                  <div className="w-1/3 text-muted-foreground">/home</div>
                  <div className="flex w-1/3 justify-end space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" disabled>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
