
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { updateSiteSettings } from "./actions"

export default async function SEOSettingsPage() {
  const settings = await prisma.siteSettings.findFirst()

  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SEO Settings</h2>
          <p className="text-muted-foreground">Manage global search engine optimization settings and verification codes.</p>
        </div>

        <form action={updateSiteSettings}>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Default meta tags for your website.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Site Name</Label>
                            <Input id="siteName" name="siteName" defaultValue={settings?.siteName || "PropertyNama"} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="defaultMetaTitle">Default Meta Title</Label>
                            <Input id="defaultMetaTitle" name="defaultMetaTitle" defaultValue={settings?.defaultMetaTitle || ""} placeholder="e.g. PropertyNama | Leading Real Estate Portal" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                            <Textarea id="defaultMetaDescription" name="defaultMetaDescription" defaultValue={settings?.defaultMetaDescription || ""} placeholder="Default description for pages without specific SEO" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="defaultKeywords">Default Keywords</Label>
                            <Input id="defaultKeywords" name="defaultKeywords" defaultValue={settings?.defaultKeywords || ""} placeholder="real estate, pakistan, property, buy house" />
                            <p className="text-sm text-muted-foreground">Comma separated keywords</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Webmaster Verification</CardTitle>
                        <CardDescription>Enter verification codes from search engines to prove site ownership.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="googleVerification">Google Search Console</Label>
                            <Input id="googleVerification" name="googleVerification" defaultValue={settings?.googleVerification || ""} placeholder="Google verification code" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bingVerification">Bing Webmaster Tools</Label>
                            <Input id="bingVerification" name="bingVerification" defaultValue={settings?.bingVerification || ""} placeholder="Bing verification code" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="yandexVerification">Yandex Webmaster</Label>
                            <Input id="yandexVerification" name="yandexVerification" defaultValue={settings?.yandexVerification || ""} placeholder="Yandex verification code" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                </div>
            </div>
        </form>
    </div>
  )
}
