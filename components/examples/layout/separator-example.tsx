"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"

export function SeparatorExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Separator</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Horizontal</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Default</h4>
            <p className="text-sm text-muted-foreground">
              A horizontal separator with default styling.
            </p>
            <div className="my-4">
              <Separator />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Custom Color</h4>
            <p className="text-sm text-muted-foreground">
              A separator with custom color styling.
            </p>
            <div className="my-4">
              <Separator className="bg-primary" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Custom Thickness</h4>
            <p className="text-sm text-muted-foreground">
              A separator with custom thickness.
            </p>
            <div className="my-4">
              <Separator className="h-[2px]" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">With Content</h4>
            <div className="my-4 flex items-center">
              <div className="flex-1">
                <Separator />
              </div>
              <div className="mx-4 text-sm text-muted-foreground">OR</div>
              <div className="flex-1">
                <Separator />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Vertical</h3>
        <div className="flex h-20 items-center">
          <div className="flex items-center gap-6">
            <div className="text-sm">Account</div>
            <Separator orientation="vertical" className="h-full" />
            <div className="text-sm">Settings</div>
            <Separator orientation="vertical" className="h-full" />
            <div className="text-sm">Messages</div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">In Context</h3>
        <div className="rounded-md border p-4">
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">Profile</h4>
            <p className="text-sm text-muted-foreground">
              Manage your profile settings and preferences.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Account</div>
            <Separator orientation="vertical" />
            <div>Security</div>
            <Separator orientation="vertical" />
            <div>Notifications</div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Decorative</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <div className="text-sm font-medium">Section Title</div>
            <Separator className="flex-1" />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Start</div>
            <Separator className="flex-1" />
            <div className="text-sm font-medium">End</div>
          </div>
        </div>
      </div>
    </div>
  )
}
