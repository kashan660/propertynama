
import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MapPin, Mail, MessageSquare, Facebook } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Contact Us | PropertyNama",
  description: "The Geniune Real Estate Consultant Service Provider in Pakistan.",
}

export default function ContactPage() {
  return (
    <div className="container py-10 md:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            The Only Trusted Property Consultant for Pakistani and Overseas Investors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-muted-foreground">
                    Phase 7, Anarkali Restaurant,<br />
                    Bahria Town
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">03336113698</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a href="https://wa.me/923336113698" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    03336113698
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">info@propertynama.pk</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Facebook className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Follow Us</h3>
                  <a href="https://www.facebook.com/people/PropertyNama/61581929672390/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    Facebook Page
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
