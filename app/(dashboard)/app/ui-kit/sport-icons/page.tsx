"use client"

import { SportIconExample } from "@/components/examples/sport-icons/sport-icon-example"

export default function SportIconsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Sport Icons</h2>
      <p className="text-lg mb-8">
        This page demonstrates the custom SportIcon component that extracts SVGs from the files inside of public/logos/sports.
        The component works in the same way as lucide-react, with similar options and properties.
      </p>
      
      <div className="border rounded-lg overflow-hidden">
        <SportIconExample />
      </div>
      
      <div className="mt-8 space-y-4">
        <h3 className="text-2xl font-bold">Usage</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            {`import { Basketball, Football } from "@/components/ui/sport-icon"

// Default size (24px)
<Basketball />

// Custom size
<Football size={32} />

// Custom color with className
<Basketball className="text-blue-500" />

// Custom size with Tailwind classes
<Football className="h-10 w-10" />

// With other props
<Basketball strokeWidth={2} color="red" />`}
          </pre>
        </div>
      </div>
    </div>
  )
}
