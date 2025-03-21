"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Define the alignment type
type PaginationAlign = 'left' | 'center' | 'right';

// Main pagination container
const Pagination = ({ 
  className, 
  align = 'center', // Default to center for backward compatibility
  ...props 
}: React.ComponentProps<"nav"> & {
  align?: PaginationAlign
}) => {
  // Map alignment to justify class
  const justifyClass = {
    'left': 'justify-start',
    'center': 'justify-center',
    'right': 'justify-end'
  }[align];

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(`mx-auto flex w-full ${justifyClass}`, className)}
      {...props}
    />
  );
};

// Pagination content wrapper
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

// Individual pagination item
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

// Link button for pagination
const PaginationLink = ({
  className,
  isActive,
  ...props
}: React.ComponentProps<typeof Button> & {
  isActive?: boolean
}) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "outline" : "ghost"}
    size="sm"
    className={cn(
      "min-w-8 h-8",
      isActive && "pointer-events-none text-accent",
      className
    )}
    {...props}
  />
)

// Previous page button
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="sm"
    className={cn("gap-1", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)

// Next page button
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="sm"
    className={cn("gap-1", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)

// Ellipsis for pagination
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
}
