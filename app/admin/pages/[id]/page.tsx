
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import EditPageForm from './edit-form'

export const dynamic = 'force-dynamic'

interface AdminPageEditPageProps {
  params: {
    id: string
  }
}

export default async function AdminPageEditPage({ params }: AdminPageEditPageProps) {
  let page = null

  try {
    page = await prisma.page.findUnique({
      where: {
        id: params.id,
      },
    })
  } catch (error) {
    console.error('Failed to fetch page for editing:', error)
  }

  if (!page) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Page</h1>
      <EditPageForm page={page} />
    </div>
  )
}
