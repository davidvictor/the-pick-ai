"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SideNavItem {
  title: string
  href: string
}

const sideNavItems: SideNavItem[] = [
  { title: "Overview", href: "/ui-kit" },
  { title: "Buttons", href: "/ui-kit/buttons" },
  { title: "Data Display", href: "/ui-kit/data-display" },
  { title: "Inputs", href: "/ui-kit/inputs" },
  { title: "Navigation", href: "/ui-kit/navigation" },
  { title: "Layout", href: "/ui-kit/layout" },
  { title: "Feedback", href: "/ui-kit/feedback" },
  { title: "Sport Icons", href: "/ui-kit/sport-icons" },
]

export default function UIKitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">UI Kit</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <Link 
            href="/" 
            className="flex items-center mb-6 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
          <nav className="sticky top-24 space-y-1">
            {sideNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
