import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import EditPropertyForm from './edit-form'

export const dynamic = 'force-dynamic'

interface AdminPropertyEditPageProps {
  params: {
    id: string
  }
}

export default async function AdminPropertyEditPage({ params }: AdminPropertyEditPageProps) {
  let property = null

  try {
    property = await prisma.property.findUnique({
      where: {
        id: params.id,
      },
    })
  } catch (error) {
    console.error('Failed to fetch property for editing:', error)
  }

  if (!property) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Property</h1>
      <EditPropertyForm property={property} />
    </div>
  )
}
