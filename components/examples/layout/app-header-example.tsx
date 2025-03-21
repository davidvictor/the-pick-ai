"use client"

import { AppHeader } from "@/components/ui/app-header"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"

export function AppHeaderExample() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Basic Header</h3>
        <div className="border rounded-md overflow-hidden">
          <SidebarProvider defaultOpen={false}>
            <AppHeader
              breadcrumbItems={[
                { label: "Example Page", isCurrentPage: true }
              ]}
            />
          </SidebarProvider>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">With Multiple Breadcrumb Items</h3>
        <div className="border rounded-md overflow-hidden">
          <SidebarProvider defaultOpen={true}>
            <AppHeader
              breadcrumbItems={[
                { href: "#", label: "Home" },
                { href: "#", label: "Category" },
                { label: "Current Page", isCurrentPage: true }
              ]}
            />
          </SidebarProvider>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">With Back Button</h3>
        <div className="border rounded-md overflow-hidden">
          <SidebarProvider defaultOpen={false}>
            <AppHeader
              breadcrumbItems={[
                { href: "#", label: "Home" },
                { label: "Details Page", isCurrentPage: true }
              ]}
              showBackButton={true}
              onBack={() => alert("Back button clicked")}
            />
          </SidebarProvider>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">With Custom Content</h3>
        <div className="border rounded-md overflow-hidden">
          <SidebarProvider defaultOpen={false}>
            <AppHeader
              breadcrumbItems={[
                { href: "#", label: "Dashboard" },
                { label: "Settings", isCurrentPage: true }
              ]}
              leftContent={
                <div className="ml-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    New
                  </span>
                </div>
              }
              rightContent={
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">Cancel</Button>
                  <Button size="sm">Save</Button>
                </div>
              }
            />
          </SidebarProvider>
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold">Usage</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            {`import { AppHeader } from "@/components/ui/app-header"
import { SidebarProvider } from "@/components/ui/sidebar"

// Basic usage
<SidebarProvider defaultOpen={true}>
  <AppHeader
    breadcrumbItems={[
      { label: "Page Title", isCurrentPage: true }
    ]}
  />
</SidebarProvider>

// With navigation
<SidebarProvider defaultOpen={true}>
  <AppHeader
    breadcrumbItems={[
      { href: "/home", label: "Home" },
      { href: "/categories", label: "Categories" },
      { label: "Current Page", isCurrentPage: true }
    ]}
  />
</SidebarProvider>

// With back button
<SidebarProvider defaultOpen={true}>
  <AppHeader
    breadcrumbItems={[
      { href: "/dashboard", label: "Dashboard" },
      { label: "Item Details", isCurrentPage: true }
    ]}
    showBackButton={true}
    onBack={() => router.back()}
  />
</SidebarProvider>

// With custom content
<SidebarProvider defaultOpen={true}>
  <AppHeader
    breadcrumbItems={[
      { href: "/dashboard", label: "Dashboard" },
      { label: "Settings", isCurrentPage: true }
    ]}
    leftContent={<Badge>Pro</Badge>}
    rightContent={<Button>Action</Button>}
  />
</SidebarProvider>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
