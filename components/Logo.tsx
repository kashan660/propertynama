import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showText?: boolean
  colored?: boolean
}

export function Logo({ className, showText = true, colored = true, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none group", className)} {...props}>
      {/* Icon Container */}
      <div className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-105",
        colored 
          ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20" 
          : "bg-current text-background"
      )}>
        {/* Abstract "P" Architectural Monogram */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Vertical Pillar */}
          <path 
            d="M6 4C6 2.89543 6.89543 2 8 2H10C11.1046 2 12 2.89543 12 4V20C12 21.1046 11.1046 22 10 22H8C6.89543 22 6 21.1046 6 20V4Z" 
            fill="currentColor" 
          />
          {/* Cantilever / Roof Structure */}
          <path 
            d="M12 4H16C18.2091 4 20 5.79086 20 8V10C20 12.2091 18.2091 14 16 14H12V4Z" 
            fill="currentColor" 
            fillOpacity="0.8"
          />
        </svg>
        
        {/* Gloss/Sheen Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text Wordmark */}
      {showText && (
        <div className="flex flex-col justify-center -space-y-1">
          <div className={cn("text-xl font-extrabold tracking-tight flex items-center", colored ? "text-foreground" : "text-current")}>
            <span>Property</span>
            <span className={cn(colored ? "text-primary" : "text-current")}>Nama</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-80">
            <div className={cn("h-[1px] w-3 rounded-full", colored ? "bg-primary" : "bg-current")} />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Est. 2013
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
