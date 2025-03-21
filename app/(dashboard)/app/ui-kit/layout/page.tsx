"use client"

import { SeparatorExample } from "@/components/examples/layout/separator-example"
import { CollapsibleExample } from "@/components/examples/layout/collapsible-example"
import { SheetExample } from "@/components/examples/layout/sheet-example"
import { AppHeaderExample } from "@/components/examples/layout/app-header-example"
import { CardExample } from "@/components/examples/layout/card-example"
import { AppFooterExample } from "@/components/examples/layout/app-footer-example"

export default function LayoutPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Layout</h2>
      <p className="text-lg mb-8">
        Structural and layout components for organizing content and creating page structures.
      </p>
      
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">App Header</h2>
          <div className="border rounded-lg overflow-hidden p-6">
            <AppHeaderExample />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Separator</h2>
          <div className="border rounded-lg overflow-hidden">
            <SeparatorExample />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Collapsible</h2>
          <div className="border rounded-lg overflow-hidden">
            <CollapsibleExample />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Sheet</h2>
          <div className="border rounded-lg overflow-hidden">
            <SheetExample />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Card</h2>
          <div className="border rounded-lg overflow-hidden">
            <CardExample />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">App Footer</h2>
          <div className="border rounded-lg overflow-hidden">
            <AppFooterExample />
          </div>
        </section>
        
        <section>
          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-bold">Usage</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// App Header
import { AppHeader } from "@/components/ui/app-header"

<AppHeader
  breadcrumbItems={[
    { href: "/home", label: "Home" },
    { label: "Current Page", isCurrentPage: true }
  ]}
/>

// Separator
import { Separator } from "@/components/ui/separator"

// Horizontal separator
<Separator />

// Vertical separator
<Separator orientation="vertical" />

// Collapsible
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Content that can be collapsed
  </CollapsibleContent>
</Collapsible>

// Sheet
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    Sheet content
  </SheetContent>
</Sheet>

// Card
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

// App Footer
import { AppFooter } from "@/components/ui/app-footer"

<AppFooter />`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
