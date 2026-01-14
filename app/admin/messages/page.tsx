import prisma from '@/lib/prisma'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  // We'll just return an empty UI for now since there's no Contact/Message model yet
  // Or we can assume there might be a ContactMessage model later
  
  // const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  const messages: any[] = [] 

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
        <Badge variant="outline" className="text-lg py-1 px-4">
          Total: {messages.length}
        </Badge>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of recent contact form submissions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>{format(new Date(), 'PP')}</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>+123456789</TableCell>
                  <TableCell>Inquiry</TableCell>
                  <TableCell>Hello...</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
