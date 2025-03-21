"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Define the possible game statuses
type GameStatus = "Upcoming" | "Live" | "Final"

interface GameStatusBadgeProps {
  status: GameStatus | string
  className?: string
}

function GameStatusBadge({ status, className }: GameStatusBadgeProps) {
  // Map the status to a variant
  const getVariant = () => {
    switch (status) {
      case "Upcoming":
        return "upcoming"
      case "Live":
        return "live"
      case "Final":
        return "final"
      case "Complete": // For backward compatibility
        return "final"
      default:
        return "default"
    }
  }

  return (
    <>
      {status === "Live" ? (
        <Badge variant={getVariant()} className={cn("relative overflow-visible", className)}>
          <span className="mr-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          {status}
          <span className="absolute inset-0 rounded-full border border-red-500 animate-slow-ping"></span>
        </Badge>
      ) : (
        <Badge variant={getVariant()} className={className}>
          {status}
        </Badge>
      )}
    </>
  )
}

export { GameStatusBadge }
