"use client"

import * as React from "react"
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar"

export function SidebarExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Sidebar</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Default</h3>
        <div className="border rounded-lg h-[400px] overflow-hidden">
          <div className="flex h-full">
            <SidebarProvider defaultOpen={true}>
              <Sidebar className="w-64 border-r">
                <SidebarContent>
                  <SidebarGroup>
                    <div className="p-4">
                      <h3 className="font-semibold">My App</h3>
                    </div>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive={true}>
                          <svg
                            className="mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          Dashboard
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <svg
                            className="mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          Users
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <svg
                            className="mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <line x1="10" y1="9" x2="8" y2="9" />
                          </svg>
                          Documents
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>
                  <SidebarGroup className="mt-auto">
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <svg
                            className="mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Settings
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-4">Main Content</h2>
                <p className="text-muted-foreground">
                  This is the main content area that appears next to the sidebar.
                </p>
              </div>
            </SidebarProvider>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Collapsible Sections</h3>
        <div className="border rounded-lg h-[400px] overflow-hidden">
          <div className="flex h-full">
            <SidebarProvider defaultOpen={true}>
              <Sidebar className="w-64 border-r">
                <SidebarContent>
                  <SidebarGroup>
                    <div className="p-4">
                      <h3 className="font-semibold">My App</h3>
                    </div>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton isActive={true}>Dashboard</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Analytics</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Reports</SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Projects</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Tasks</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Calendar</SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>Team</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Members</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Invitations</SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-4">Main Content</h2>
                <p className="text-muted-foreground">
                  This is the main content area that appears next to the sidebar.
                </p>
              </div>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
