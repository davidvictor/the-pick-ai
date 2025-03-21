"use client"

import { ButtonExample } from "@/components/examples/buttons/button-example"

export default function ButtonsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Buttons</h2>
      <p className="text-lg mb-8">
        Button components for user interactions and actions. The Button component is a flexible and customizable element that supports various styles, sizes, and states.
      </p>
      
      <div className="border rounded-lg overflow-hidden">
        <ButtonExample />
      </div>
      
      <div className="mt-8 space-y-4">
        <h3 className="text-2xl font-bold">Usage</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            {`import { Button } from "@/components/ui/button"

// Default button
<Button>Click me</Button>

// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// With icon
<Button>
  <svg /> Icon Text
</Button>

// Disabled state
<Button disabled>Disabled</Button>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
