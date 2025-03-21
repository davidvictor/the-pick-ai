// Re-export all sidebar components to maintain the current API

// Export constants
export * from "./constants"

// Export context and hooks
export { SidebarContext, SidebarProvider, useSidebar } from "./context"

// Export core components
export {
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
} from "./core"

// Export group components
export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
} from "./group"

// Export menu components
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./menu"
