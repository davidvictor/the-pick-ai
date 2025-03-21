"use client"

import * as React from "react"
import { Suspense } from "react"
import {
  LifeBuoy,
  Trophy,
  Send,
  Settings2,
  History,
  Palette,
  Rss
} from "lucide-react"
import { 
  Basketball, 
  Football, 
  Baseball, 
  Hockey, 
  Soccer 
} from "@/components/ui/sport-icon"

import { NavTop } from "@/components/nav/nav-top"
import { NavMain } from "@/components/nav/nav-main"
import { NavLeaguesPro } from "@/components/nav/nav-leagues-pro"
import { NavLeaguesNCAA } from "@/components/nav/nav-leagues-ncaa"
import { NavSecondary } from "@/components/nav/nav-secondary"
import { NavUser } from "@/components/nav/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ROUTES } from "@/lib/routes"
import { League } from "@/services/api-types"

const data = {
  user: {
    name: "Dave Moneyline",
    email: "dave@thepick.ai",
    avatar: "/avatar-dv.png",
  },
  navTop: [
    {
      title: "Best Bets",
      url: ROUTES.BEST_BETS,
      icon: Trophy,
    },
  ],
  navLeaguesPro: [
    {
      title: "NFL",
      url: ROUTES.LEAGUES.DETAIL("NFL" as League),
      icon: Football,
      isActive: true,
    },
    {
      title: "NBA",
      url: ROUTES.LEAGUES.DETAIL("NBA" as League),
      icon: Basketball,
    },
    {
      title: "NHL",
      url: ROUTES.LEAGUES.DETAIL("NHL" as League),
      icon: Hockey,
    },
    {
      title: "MLB",
      url: ROUTES.LEAGUES.DETAIL("MLB" as League),
      icon: Baseball,
    },
    {
      title: "MLS",
      url: ROUTES.LEAGUES.DETAIL("MLS" as League),
      icon: Soccer,
    },
  ],
  navLeaguesNCAA: [
    {
      title: "Football",
      url: ROUTES.LEAGUES.DETAIL("NCAAF" as League),
      icon: Football,
    },
    {
      title: "Basketball",
      url: ROUTES.LEAGUES.DETAIL("NCAAB" as League),
      icon: Basketball,
    },
  ],
  navMain: [
    // {
    //   title: "Sportsbook",
    //   url: "#",
    //   icon: SquareTerminal,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "History",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "History",
      url: ROUTES.HISTORY,
      icon: History,
    },
    {
      title: "Settings",
      url: ROUTES.ACCOUNT.INDEX,
      icon: Settings2,
    },
    {
      title: "UI Kit",
      url: ROUTES.UI_KIT,
      icon: Palette,
    },
  ],
  navSecondary: [
    {
      title: "Updates",
      url: "#",
      icon: Rss,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" >
              <a href="#" className='logo dark:logo-dark'></a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavTop items={data.navTop} />     */}
        <NavLeaguesPro items={data.navLeaguesPro} />
        <NavLeaguesNCAA items={data.navLeaguesNCAA} />
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<div className="h-16 w-full animate-pulse bg-muted/10 rounded"></div>}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  )
}
