"use client"

import * as React from "react"
import { GameStatusBadge } from "@/components/ui/game-status-badge"

export function GameStatusBadgeExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Game Status Badge</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Game States</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <GameStatusBadge status="Upcoming" />
            <span className="text-sm">Upcoming</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <GameStatusBadge status="Live" />
            <span className="text-sm">Live</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <GameStatusBadge status="Final" />
            <span className="text-sm">Final</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Custom Status Text</h3>
        <div className="flex flex-wrap items-center gap-4">
          <GameStatusBadge status="Starting Soon" />
          <GameStatusBadge status="Live Now" />
          <GameStatusBadge status="Game Over" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Time Information</h3>
        <div className="flex flex-wrap items-center gap-4">
          <GameStatusBadge status="Today 7:30 PM" />
          <GameStatusBadge status="Q3 5:42" />
          <GameStatusBadge status="2nd Half" />
          <GameStatusBadge status="Bottom 7th" />
        </div>
      </div>
    </div>
  )
}
