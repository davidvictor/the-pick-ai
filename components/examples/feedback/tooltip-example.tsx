"use client"

import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Tooltip</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic</h3>
        <div className="flex flex-wrap items-center gap-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Hover Me
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a basic tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help underline decoration-dotted">
                  Hover for more info
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Additional information appears here</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Positions</h3>
        <div className="flex flex-wrap items-center gap-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                  Top
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip appears on top</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                  Right
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltip appears on right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                  Bottom
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip appears on bottom</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                  Left
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Tooltip appears on left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Icons</h3>
        <div className="flex flex-wrap items-center gap-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-full p-2 hover:bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span className="sr-only">Help</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-full p-2 hover:bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="sr-only">User</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>User profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-full p-2 hover:bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span className="sr-only">Edit</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit item</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Delay</h3>
        <div className="flex flex-wrap items-center gap-8">
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Hover (500ms delay)
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This tooltip has a 500ms delay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider delayDuration={1000}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Hover (1000ms delay)
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This tooltip has a 1000ms delay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
