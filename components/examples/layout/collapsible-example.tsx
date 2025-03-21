"use client"

import * as React from "react"
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible"

export function CollapsibleExample() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpenSecond, setIsOpenSecond] = React.useState(false)

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Collapsible</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic</h3>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full max-w-md space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 rounded-md border px-4 py-3">
            <h4 className="text-sm font-semibold">
              What is a collapsible component?
            </h4>
            <CollapsibleTrigger asChild>
              <button className="rounded-full p-1 hover:bg-muted">
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
                  className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <span className="sr-only">Toggle</span>
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="rounded-md border px-4 py-3 text-sm">
            <p>
              A collapsible component is a UI element that can be expanded or collapsed to show or hide content.
              It's commonly used for FAQs, accordion menus, and other interfaces where you want to save space
              by hiding content until it's needed.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Animation</h3>
        <Collapsible
          open={isOpenSecond}
          onOpenChange={setIsOpenSecond}
          className="w-full max-w-md space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 rounded-md border px-4 py-3">
            <h4 className="text-sm font-semibold">
              Animated Collapsible
            </h4>
            <CollapsibleTrigger asChild>
              <button className="rounded-full p-1 hover:bg-muted">
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
                  className={`h-4 w-4 transition-transform duration-200 ${isOpenSecond ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <span className="sr-only">Toggle</span>
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden rounded-md border px-4 py-3 text-sm">
            <div className="space-y-2">
              <p>
                This collapsible content has a smooth animation when opening and closing.
                The animation is achieved using CSS transitions and transforms.
              </p>
              <p>
                You can customize the animation duration and easing function to match your design system.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Use Cases</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Collapsible components are useful for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>FAQ sections</li>
            <li>Accordion menus</li>
            <li>Expandable details</li>
            <li>Settings panels</li>
            <li>Mobile navigation menus</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
