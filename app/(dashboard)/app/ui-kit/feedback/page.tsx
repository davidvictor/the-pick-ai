"use client"

import { TooltipExample } from "@/components/examples/feedback/tooltip-example"
import { DropdownMenuExample } from "@/components/examples/feedback/dropdown-menu-example"
import { ThemeToggleExample } from "@/components/examples/feedback/theme-toggle-example"
import { DialogExample } from "@/components/examples/feedback/dialog-example"

export default function FeedbackPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Feedback</h2>
      <p className="text-lg mb-8">
        Components for user feedback, notifications, and interactive elements.
      </p>
      
      <div className="space-y-10">
        {/* Dialog */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Dialog</h3>
          <div className="border rounded-lg overflow-hidden">
            <DialogExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

// Basic dialog
<Dialog>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description goes here.</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// With form
<Dialog>
  <DialogTrigger>Edit profile</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Form fields */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Tooltip */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Tooltip</h3>
          <div className="border rounded-lg overflow-hidden">
            <TooltipExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Dropdown Menu */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Dropdown Menu</h3>
          <div className="border rounded-lg overflow-hidden">
            <DropdownMenuExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Theme Toggle */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Theme Toggle</h3>
          <div className="border rounded-lg overflow-hidden">
            <ThemeToggleExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import { ThemeToggle } from "@/components/ui/theme-toggle"

<ThemeToggle />`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
