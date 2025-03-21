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
import { useLeaguesLoading } from "@/hooks/use-leagues-loading"
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

const data = {
  user: {
    name: "Dave Moneyline",
    email: "dave@thepick.ai",
    avatar: "/avatar-dv.png",
  },
  navTop: [
    {
      title: "Best Bets",
      url: "/best-bets",
      icon: Trophy,
    },
  ],
  navLeaguesPro: [
    {
      title: "NFL",
      url: "/leagues/NFL",
      icon: Football,
      isActive: true,
    },
    {
      title: "NBA",
      url: "/leagues/NBA",
      icon: Basketball,
    },
    {
      title: "NHL",
      url: "/leagues/NHL",
      icon: Hockey,
    },
    {
      title: "MLB",
      url: "/leagues/MLB",
      icon: Baseball,
    },
    {
      title: "MLS",
      url: "/leagues/MLS",
      icon: Soccer,
    },
  ],
  navLeaguesNCAA: [
    {
      title: "Football",
      url: "/leagues/NCAAF",
      icon: Football,
    },
    {
      title: "Basketball",
      url: "/leagues/NCAAB",
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
      url: "/history",
      icon: History,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "UI Kit",
      url: "/ui-kit",
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
  const { isLoading } = useLeaguesLoading();
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
