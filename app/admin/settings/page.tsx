import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst()
  } catch (error) {
    console.warn("Database connection failed in Admin Settings page.", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Site Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your website's global configuration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue={settings?.siteName || "PropertyNama"} />
            </div>
            
            <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Verification Codes</h3>
                <div className="space-y-4">
                    <div className="grid gap-2">
                    <Label htmlFor="google">Google Verification Code</Label>
                    <Input id="google" defaultValue={settings?.googleVerification || ""} />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="yandex">Yandex Verification Code</Label>
                    <Input id="yandex" defaultValue={settings?.yandexVerification || ""} />
                    </div>
                </div>
            </div>

            <Button className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
