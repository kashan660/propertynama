"use client"

import * as React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Menu, X, ChevronDown, Phone, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/Logo"

export function Navbar() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center outline-none hover:text-primary transition-colors">
              Faisal Town <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/faisal-town/plots" className="w-full">Faisal Town Plots</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/faisal-town/zone-1" className="w-full">Zone 1</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/faisal-town/zone-2" className="w-full">Zone 2</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/faisal-town/zone-3" className="w-full">Zone 3</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/ruden-enclave" className="transition-colors hover:text-primary">Ruden Enclave</Link>
          <Link href="/eighteen" className="transition-colors hover:text-primary">Eighteen</Link>
          <Link href="/news-feed" className="transition-colors hover:text-primary">News Feed</Link>
          <Link href="/blog" className="transition-colors hover:text-primary">Blog</Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center outline-none hover:text-primary transition-colors">
              Our Rec <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/recommendations/top-picks" className="w-full">Top Picks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/recommendations/trending" className="w-full">Trending</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/recommendations/house-construction" className="w-full">House Construction</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/recommendations/interior-design" className="w-full">Interior Design</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/about-us" className="transition-colors hover:text-primary">About Us</Link>
          <Link href="/contact-us" className="transition-colors hover:text-primary">Contact Us</Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {session?.user?.role === 'ADMIN' && (
            <Link href="/admin" className="flex items-center space-x-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t p-4 space-y-4 bg-background absolute w-full shadow-lg">
          <div className="flex flex-col space-y-3">
             <div className="space-y-2">
                <div className="font-semibold text-primary">Faisal Town</div>
                <div className="pl-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                   <Link href="/faisal-town" onClick={toggleMobileMenu} className="font-semibold text-foreground">Faisal Town Main</Link>
                   <Link href="/faisal-town/phase-1" onClick={toggleMobileMenu}>Phase 1</Link>
                   <Link href="/faisal-town/phase-2" onClick={toggleMobileMenu}>Phase 2</Link>
                </div>
             </div>
             
             <Link href="/ruden-enclave" className="font-medium hover:text-primary" onClick={toggleMobileMenu}>Ruden Enclave</Link>
             <Link href="/eighteen" className="font-medium hover:text-primary" onClick={toggleMobileMenu}>Eighteen</Link>
             <Link href="/news-feed" className="font-medium hover:text-primary" onClick={toggleMobileMenu}>News Feed</Link>
             <Link href="/blog" className="font-medium hover:text-primary" onClick={toggleMobileMenu}>Blog</Link>
             
             <div className="space-y-2">
                <div className="font-semibold text-primary">Our Rec</div>
                <div className="pl-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                   <Link href="/recommendations/top-picks" onClick={toggleMobileMenu}>Top Picks</Link>
                   <Link href="/recommendations/trending" onClick={toggleMobileMenu}>Trending</Link>
                   <Link href="/recommendations/house-construction" onClick={toggleMobileMenu}>House Construction</Link>
                   <Link href="/recommendations/interior-design" onClick={toggleMobileMenu}>Interior Design</Link>
                </div>
             </div>

             <Link href="/about-us" className="font-medium hover:text-primary" onClick={toggleMobileMenu}>About Us</Link>
             <Link href="/contact-us" className="font-medium hover:text-primary" onClick={toggleMobileMenu}>Contact Us</Link>
             
             {session?.user?.role === 'ADMIN' && (
               <Link href="/admin" className="font-medium text-primary flex items-center" onClick={toggleMobileMenu}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Admin Dashboard
               </Link>
             )}

             {session?.user && (
               <button 
                 onClick={() => {
                   toggleMobileMenu();
                   signOut({ callbackUrl: '/' });
                 }}
                 className="font-medium text-destructive flex items-center w-full text-left"
               >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
               </button>
             )}
          </div>
          <div className="pt-4 flex flex-col space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm font-medium text-muted-foreground pb-2">
              <Phone className="h-4 w-4" />
              <span>03336113698</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
