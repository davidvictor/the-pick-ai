"use client"

import { InputExample } from "@/components/examples/inputs/input-example"
import { CommandExample } from "@/components/examples/inputs/command-example"
import { SelectExample } from "@/components/examples/inputs/select-example"
import { CheckboxExample } from "@/components/examples/inputs/checkbox-example"
import { MultiSelectExample } from "@/components/examples/inputs/multi-select-example"

export default function InputsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Inputs</h2>
      <p className="text-lg mb-8">
        Form controls and user input components for collecting user data and interactions.
      </p>
      
      <div className="space-y-10">
        {/* Input */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Input</h3>
          <div className="border rounded-lg overflow-hidden">
            <InputExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import { Input } from "@/components/ui/input"

// Basic input
<Input placeholder="Enter text" />

// With type
<Input type="email" placeholder="Email address" />

// Disabled state
<Input disabled placeholder="Disabled input" />

// With label and helper text
<div className="grid gap-1.5">
  <label htmlFor="email">Email</label>
  <Input id="email" placeholder="Enter your email" />
  <p className="text-sm text-muted-foreground">
    We'll never share your email.
  </p>
</div>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Command */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Command</h3>
          <div className="border rounded-lg overflow-hidden">
            <CommandExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command"

// Basic command
<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

// Command dialog
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <span>Item</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Select */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Select</h3>
          <div className="border rounded-lg overflow-hidden">
            <SelectExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Basic select
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>

// With groups
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Group 1</SelectLabel>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Checkbox */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Checkbox</h3>
          <div className="border rounded-lg overflow-hidden">
            <CheckboxExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import { Checkbox } from "@/components/ui/checkbox"

// Basic checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>

// Disabled checkbox
<Checkbox disabled />
<Checkbox disabled checked />

// Controlled checkbox
const [checked, setChecked] = React.useState(false)

<Checkbox 
  checked={checked} 
  onCheckedChange={(value) => setChecked(value === true)}
/>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Multi Select */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Multi Select</h3>
          <div className="border rounded-lg overflow-hidden">
            <MultiSelectExample />
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold">Usage</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`import { MultiSelect, Option } from "@/components/ui/multi-select"

// Define options
const options: Option[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]

// State for selected values
const [selected, setSelected] = React.useState<string[]>([])

// Basic multi-select
<MultiSelect
  options={options}
  selected={selected}
  onChange={setSelected}
  placeholder="Select options..."
/>

// With pre-selected values
<MultiSelect
  options={options}
  selected={["option1"]}
  onChange={setSelected}
  placeholder="Select options..."
/>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
