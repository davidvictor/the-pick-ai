import { Skeleton } from "@/components/ui/skeleton"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavLeaguesSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Leagues</SidebarGroupLabel>
      <SidebarMenu>
        {Array(5).fill(0).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton>
              <Skeleton className="h-5 w-5 mr-2" />
              <Skeleton className="h-5 w-16" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
