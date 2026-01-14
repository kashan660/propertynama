import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth-options"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500">
              {session.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h3 className="text-xl font-medium">{session.user?.name}</h3>
              <p className="text-muted-foreground">{session.user?.email}</p>
              <p className="text-sm text-muted-foreground mt-1">Role: {session.user?.role}</p>
            </div>
          </div>
          
          <div className="pt-6 border-t">
            {session.user?.role === 'ADMIN' && (
              <Button asChild className="mr-4">
                <Link href="/admin">Access Admin Dashboard</Link>
              </Button>
            )}
            <Button variant="outline" asChild>
               <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
