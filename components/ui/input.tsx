import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-9 px-3 py-1 text-sm",
        xs: "h-7 px-2 py-0.5 text-xs rounded-sm",
        sm: "h-8 px-2 py-1 text-xs rounded-md",
        lg: "h-10 px-4 py-2 text-sm rounded-md",
        xl: "h-12 px-5 py-3 text-base rounded-md"
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Input({ 
  className, 
  type, 
  sizeVariant,
  ...props 
}: React.ComponentProps<"input"> & { 
  sizeVariant?: "default" | "xs" | "sm" | "lg" | "xl" 
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({ size: sizeVariant }),
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input, inputVariants }
