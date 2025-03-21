"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuExample() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Dropdown Menu</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic</h3>
        <div className="flex flex-wrap items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Open Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Icons</h3>
        <div className="flex flex-wrap items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Open Menu with Icons
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
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
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Shortcuts</h3>
        <div className="flex flex-wrap items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Open Menu with Shortcuts
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                New Tab
                <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                New Window
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                New Incognito Window
                <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Print
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Submenus</h3>
        <div className="flex flex-wrap items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Open Menu with Submenus
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                      <DropdownMenuItem>Privacy</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>API Keys</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Radio Group</h3>
        <div className="flex flex-wrap items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Open Radio Group Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Current: <span className="ml-2 font-medium">{position}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
