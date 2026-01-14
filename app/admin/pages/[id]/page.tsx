
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { updatePage } from "./actions"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function EditPage({ params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({
    where: { id: params.id }
  })

  if (!page) {
    notFound()
  }
  
  const updatePageWithId = updatePage.bind(null, page.id)

  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Page: {page.title}</h2>
          <p className="text-muted-foreground">Update page content and SEO settings.</p>
        </div>

        <form action={updatePageWithId}>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Page Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Page Title</Label>
                            <Input id="title" name="title" defaultValue={page.title} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL)</Label>
                            <Input id="slug" name="slug" defaultValue={page.slug} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SEO Configuration</CardTitle>
                        <CardDescription>Optimize this page for search engines.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="metaTitle">Meta Title</Label>
                            <Input id="metaTitle" name="metaTitle" defaultValue={page.metaTitle || ""} placeholder={page.title} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="metaDescription">Meta Description</Label>
                            <Textarea id="metaDescription" name="metaDescription" defaultValue={page.metaDescription || ""} placeholder="Brief summary of the page content" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input id="keywords" name="keywords" defaultValue={page.keywords || ""} placeholder="comma, separated, keywords" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/pages">
                        <Button variant="outline" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit">Save Changes</Button>
                </div>
            </div>
        </form>
    </div>
  )
}
