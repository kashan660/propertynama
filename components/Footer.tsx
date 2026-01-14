import { Logo } from "@/components/Logo"
import { Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Most Trusted Real Estate Company in Pakistan.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Home</a></li>
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Projects</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Phase 7, Anarkali Restaurant, Bahria Town</li>
              <li>Mobile: <a href="tel:03336113698" className="hover:text-primary transition-colors">03336113698</a></li>
              <li>WhatsApp: <a href="https://wa.me/923336113698" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">03336113698</a></li>
              <li>info@propertynama.pk</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Subscribe to get the latest news.</p>
            {/* Add newsletter form here */}
            
            <div className="pt-4">
              <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/people/PropertyNama/61581929672390/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © 15 January 2013 PropertyNama. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
