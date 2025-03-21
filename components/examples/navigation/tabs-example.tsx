"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Tabs</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Default</h3>
        <Tabs defaultValue="account" className="w-full max-w-3xl">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-4 border rounded-lg mt-2">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Account Settings</h4>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="password" className="p-4 border rounded-lg mt-2">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Password Settings</h4>
              <p className="text-muted-foreground">
                Change your password and security settings.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="p-4 border rounded-lg mt-2">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">General Settings</h4>
              <p className="text-muted-foreground">
                Configure your application preferences.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Icons</h3>
        <Tabs defaultValue="profile" className="w-full max-w-3xl">
          <TabsList>
            <TabsTrigger value="profile">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Notifications
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M18 17V9" />
                <path d="M13 17V5" />
                <path d="M8 17v-3" />
              </svg>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="p-4 border rounded-lg mt-2">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Profile</h4>
              <p className="text-muted-foreground">
                View and edit your profile information.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="p-4 border rounded-lg mt-2">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Notifications</h4>
              <p className="text-muted-foreground">
                Manage your notification preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="p-4 border rounded-lg mt-2">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Analytics</h4>
              <p className="text-muted-foreground">
                View your usage statistics and analytics.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Vertical Layout</h3>
        <div className="flex gap-4 w-full max-w-3xl">
          <Tabs defaultValue="messages" orientation="vertical" className="w-full">
            <TabsList className="flex flex-col h-auto w-48">
              <TabsTrigger value="messages" className="justify-start">Messages</TabsTrigger>
              <TabsTrigger value="contacts" className="justify-start">Contacts</TabsTrigger>
              <TabsTrigger value="archive" className="justify-start">Archive</TabsTrigger>
            </TabsList>
            <div className="flex-1">
              <TabsContent value="messages" className="p-4 border rounded-lg">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Messages</h4>
                  <p className="text-muted-foreground">
                    View and manage your messages.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="contacts" className="p-4 border rounded-lg">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Contacts</h4>
                  <p className="text-muted-foreground">
                    View and manage your contacts.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="archive" className="p-4 border rounded-lg">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Archive</h4>
                  <p className="text-muted-foreground">
                    View your archived messages.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
