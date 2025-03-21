"use client"

import * as React from "react"
import { TeamMatchup } from "@/components/ui/team-matchup"

export function TeamMatchupExample() {
  const exampleTeams = {
    home: {
      name: "Lakers",
      city: "Los Angeles",
      logo: "/logos/nba/lakers.svg"
    },
    away: {
      name: "Warriors",
      city: "Golden State",
      logo: "/logos/nba/warriors.svg"
    }
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Team Matchup</h3>
        <p className="text-muted-foreground mb-4">
          The TeamMatchup component displays a matchup between two teams with their logos and names.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Default Size</h4>
          <div className="border p-4 rounded-md">
            <TeamMatchup 
              homeTeam={exampleTeams.home}
              awayTeam={exampleTeams.away}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Large Size</h4>
          <div className="border p-4 rounded-md">
            <TeamMatchup 
              homeTeam={exampleTeams.home}
              awayTeam={exampleTeams.away}
              size="large"
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Without City Names</h4>
          <div className="border p-4 rounded-md">
            <TeamMatchup 
              homeTeam={exampleTeams.home}
              awayTeam={exampleTeams.away}
              showCity={false}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Without Logos (Fallback)</h4>
          <div className="border p-4 rounded-md">
            <TeamMatchup 
              homeTeam={{
                name: "Team A",
                city: "City A"
              }}
              awayTeam={{
                name: "Team B",
                city: "City B"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
