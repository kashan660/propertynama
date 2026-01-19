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

export default async function AdminBookingsPage() {
  let bookings: any[] = []
  try {
    bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error) {
    console.warn("Database connection failed in Admin Bookings page.", error)
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Booking Requests</h1>
        <Badge variant="outline" className="text-lg py-1 px-4">
          Total: {bookings.length}
        </Badge>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of recent booking requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="whitespace-nowrap">
                    {format(booking.createdAt, 'MMM d, yyyy')}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {format(booking.createdAt, 'h:mm a')}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{booking.fullName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span className="flex items-center gap-1">
                        📞 {booking.contactNo}
                      </span>
                      <span className="flex items-center gap-1 text-green-600">
                        💬 {booking.whatsappNo}
                      </span>
                      {booking.contactTime && (
                         <span className="text-xs text-muted-foreground mt-1">
                           🕒 {booking.contactTime}
                         </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {booking.cityName}, {booking.country}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.society}</div>
                    <div className="text-sm text-muted-foreground">{booking.plotSize}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={booking.paymentPlan === 'cash' ? 'default' : 'secondary'}>
                      {booking.paymentPlan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={booking.status === 'PENDING' ? 'outline' : 'default'}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
