import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash } from "lucide-react"
import prisma from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function AdminPropertiesPage() {
  let properties: any[] = [];
  try {
    properties = await prisma.property.findMany({
      orderBy: { updatedAt: 'desc' }
    })
  } catch (error) {
    console.warn("Database connection failed in Admin Properties page.", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Link href="/admin/properties/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {property.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{property.price}</div>
              <p className="text-xs text-muted-foreground">
                {property.location}
              </p>
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/properties/${property.id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {properties.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">
                No properties found. Click "Add New Property" to create one.
            </div>
        )}
      </div>
    </div>
  )
}
