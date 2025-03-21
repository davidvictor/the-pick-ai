"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function ThemeToggleExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Theme Toggle</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Default</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <ThemeToggle />
            <span className="text-sm">Toggle between light and dark mode</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">In Context</h3>
        <div className="flex items-center justify-between rounded-md border p-4">
          <div className="text-sm font-medium">Toggle Theme</div>
          <ThemeToggle />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Description</h3>
        <p className="text-muted-foreground">
          The Theme Toggle component provides a simple way for users to switch between light and dark modes. 
          It automatically saves the user's preference and applies the appropriate theme on page load.
        </p>
      </div>
    </div>
  )
}
