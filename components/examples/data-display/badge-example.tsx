"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"

export function BadgeExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Badge</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Variants</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Icons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge>
            <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            Verified
          </Badge>
          <Badge variant="secondary">
            <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M15 9h-6v6h6V9z" />
            </svg>
            Paused
          </Badge>
          <Badge variant="outline">
            <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            Info
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Custom Colors</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge className="bg-blue-500 hover:bg-blue-600">Blue</Badge>
          <Badge className="bg-green-500 hover:bg-green-600">Green</Badge>
          <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">Yellow</Badge>
          <Badge className="bg-purple-500 hover:bg-purple-600">Purple</Badge>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge className="text-xs py-0 px-2">Small</Badge>
          <Badge>Default</Badge>
          <Badge className="text-base py-1 px-4">Large</Badge>
        </div>
      </div>
    </div>
  )
}
