"use client"

import * as React from "react"
import { AppFooter } from "@/components/ui/app-footer"

export function AppFooterExample() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">App Footer</h3>
        <p className="text-muted-foreground mb-4">
          The AppFooter component provides a consistent footer for the application.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Default Footer</h4>
          <div className="border rounded-md overflow-hidden">
            <div className="p-4 bg-background">
              <AppFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
