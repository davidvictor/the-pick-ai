"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Define badge variants using cva
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        // Game status variants
        upcoming: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        live: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        final: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        complete: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", // Keep for backward compatibility
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
