"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

export function InputExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Input</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Default</h3>
        <div className="w-full max-w-sm">
          <Input placeholder="Default input" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Disabled</h3>
        <div className="w-full max-w-sm">
          <Input disabled placeholder="Disabled input" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Label</h3>
        <div className="w-full max-w-sm grid gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" placeholder="Enter your email" type="email" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Helper Text</h3>
        <div className="w-full max-w-sm grid gap-1.5">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input id="username" placeholder="Enter username" />
          <p className="text-sm text-muted-foreground">
            Username must be at least 4 characters.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Icon</h3>
        <div className="w-full max-w-sm relative">
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <Input className="pl-8" placeholder="Type your message" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Input Types</h3>
        <div className="grid gap-4 w-full max-w-sm">
          <Input type="password" placeholder="Password" />
          <Input type="number" placeholder="Number" />
          <Input type="date" />
          <Input type="file" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Validation States</h3>
        <div className="grid gap-4 w-full max-w-sm">
          <div className="grid gap-1.5">
            <Input 
              className="border-green-500 focus-visible:ring-green-500" 
              placeholder="Valid input" 
            />
            <p className="text-sm text-green-500">This input is valid.</p>
          </div>
          <div className="grid gap-1.5">
            <Input 
              className="border-red-500 focus-visible:ring-red-500" 
              placeholder="Invalid input" 
            />
            <p className="text-sm text-red-500">This input is invalid.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
