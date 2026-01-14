import Link from "next/link"
import { LayoutDashboard, FileText, Settings, Home, PlusCircle, List, LogOut, MessageSquare, Calendar, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-slate-900 text-slate-50">
      <div className="flex h-16 items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <Link href="/admin" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        
        <div className="pt-4 pb-2">
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Leads</h2>
        </div>
        
        <Link href="/admin/bookings" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <Calendar className="h-5 w-5" />
          <span>Bookings</span>
        </Link>
        <Link href="/admin/messages" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <MessageSquare className="h-5 w-5" />
          <span>Messages</span>
        </Link>

        <div className="pt-4 pb-2">
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Content</h2>
        </div>
        
        <Link href="/admin/pages" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <FileText className="h-5 w-5" />
          <span>Pages</span>
        </Link>
        <Link href="/admin/properties" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <Home className="h-5 w-5" />
          <span>Properties</span>
        </Link>
        <Link href="/admin/blogs" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <List className="h-5 w-5" />
          <span>Blogs</span>
        </Link>

        <div className="pt-4 pb-2">
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">System</h2>
        </div>

        <Link href="/admin/seo" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <Globe className="h-5 w-5" />
          <span>SEO Settings</span>
        </Link>
        <Link href="/admin/settings" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-primary transition-colors">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="border-t border-slate-800 p-4">
        <Link href="/" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-red-400 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Exit to Site</span>
        </Link>
      </div>
    </div>
  )
}
