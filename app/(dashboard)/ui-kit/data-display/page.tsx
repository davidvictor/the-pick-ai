"use client"

import { AvatarExample } from "@/components/examples/data-display/avatar-example"
import { BadgeExample } from "@/components/examples/data-display/badge-example"
import { GameStatusBadgeExample } from "@/components/examples/data-display/game-status-badge-example"
import { MarkdownRendererExample } from "@/components/examples/data-display/markdown-renderer-example"
import { SkeletonExample } from "@/components/examples/data-display/skeleton-example"
import { SportIconExample } from "@/components/examples/sport-icons/sport-icon-example"
import { TableExample } from "@/components/examples/data-display/table-example"
import { TeamMatchupExample } from "@/components/examples/data-display/team-matchup-example"
import { WeatherIconExample } from "@/components/examples/data-display/weather-icon-example"

export default function DataDisplayPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Data Display</h2>
      <p className="text-lg mb-8">
        Components for displaying information and data in various formats.
      </p>
      
      <div className="space-y-10">
        <section>
          <div className="border rounded-lg overflow-hidden">
            <AvatarExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <BadgeExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <GameStatusBadgeExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <SkeletonExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <MarkdownRendererExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <TeamMatchupExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <TableExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <WeatherIconExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <SportIconExample />
          </div>
        </section>
      </div>
    </div>
  )
}
