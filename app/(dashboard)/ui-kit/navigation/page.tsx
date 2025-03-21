"use client"

import { BreadcrumbExample } from "@/components/examples/navigation/breadcrumb-example"
import { PaginationExample } from "@/components/examples/navigation/pagination-example"
import { TabsExample } from "@/components/examples/navigation/tabs-example"

export default function NavigationPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Navigation</h2>
      <p className="text-lg mb-8">
        Components for site navigation and user wayfinding.
      </p>
      
      <div className="space-y-10">
        <section>
          <div className="border rounded-lg overflow-hidden">
            <TabsExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden">
            <BreadcrumbExample />
          </div>
        </section>
        
        <section>
          <div className="border rounded-lg overflow-hidden p-6">
            <h3 className="text-2xl font-bold mb-4">Pagination</h3>
            <PaginationExample />
          </div>
        </section>
        
        <section>
          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-bold">Usage</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// Tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>

// Breadcrumb
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// Pagination
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Default (centered)
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={() => {}} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={() => {}}>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext onClick={() => {}} />
    </PaginationItem>
  </PaginationContent>
</Pagination>

// With alignment options
<Pagination align="left">
  {/* Content */}
</Pagination>

<Pagination align="center">
  {/* Content */}
</Pagination>

<Pagination align="right">
  {/* Content */}
</Pagination>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
