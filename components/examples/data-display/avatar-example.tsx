"use client"

import * as React from "react"
import { Avatar } from "@/components/ui/avatar"

export function AvatarExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Avatar</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Default</h3>
        <div className="flex items-center gap-4">
          <Avatar>
            <img src="/avatar-dv.png" alt="User avatar" />
          </Avatar>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Sizes</h3>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <img src="/avatar-dv.png" alt="Small avatar" />
          </Avatar>
          <Avatar>
            <img src="/avatar-dv.png" alt="Default avatar" />
          </Avatar>
          <Avatar className="h-12 w-12">
            <img src="/avatar-dv.png" alt="Large avatar" />
          </Avatar>
          <Avatar className="h-16 w-16">
            <img src="/avatar-dv.png" alt="Extra large avatar" />
          </Avatar>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Fallback (Initials)</h3>
        <div className="flex items-center gap-4">
          <Avatar>
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              JD
            </div>
          </Avatar>
          <Avatar>
            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-white">
              AB
            </div>
          </Avatar>
          <Avatar>
            <div className="flex h-full w-full items-center justify-center rounded-full bg-green-500 text-white">
              CD
            </div>
          </Avatar>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Border</h3>
        <div className="flex items-center gap-4">
          <Avatar className="border-2 border-primary">
            <img src="/avatar-dv.png" alt="Avatar with border" />
          </Avatar>
          <Avatar className="border-2 border-blue-500">
            <img src="/avatar-dv.png" alt="Avatar with colored border" />
          </Avatar>
        </div>
      </div>
    </div>
  )
}
