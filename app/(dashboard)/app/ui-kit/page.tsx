"use client"

import * as React from "react"
import Link from "next/link"

interface ComponentCategory {
  title: string
  description: string
  href: string
}

const componentCategories: ComponentCategory[] = [
  {
    title: "Buttons",
    description: "Interactive elements for user actions",
    href: "/ui-kit/buttons",
  },
  {
    title: "Data Display",
    description: "Components for displaying information",
    href: "/ui-kit/data-display",
  },
  {
    title: "Inputs",
    description: "Form controls and user input components",
    href: "/ui-kit/inputs",
  },
  {
    title: "Navigation",
    description: "Components for site navigation",
    href: "/ui-kit/navigation",
  },
  {
    title: "Layout",
    description: "Structural and layout components",
    href: "/ui-kit/layout",
  },
  {
    title: "Feedback",
    description: "Components for user feedback and notifications",
    href: "/ui-kit/feedback",
  },
  {
    title: "Sport Icons",
    description: "Custom sport icon components",
    href: "/ui-kit/sport-icons",
  },
]

export default function UIKitPage() {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-6">Component Categories</h2>
      <p className="text-lg mb-8">
        This UI Kit provides a collection of reusable components for building consistent user interfaces.
        Select a category below to explore the available components.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="block p-6 border rounded-lg hover:border-primary transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-muted-foreground">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
