"use client"

import * as React from "react"
import { MultiSelect, Option } from "@/components/ui/multi-select"

export function MultiSelectExample() {
  const [selected, setSelected] = React.useState<string[]>([])
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<string[]>(["react"])
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([])
  
  const frameworks: Option[] = [
    { label: "React", value: "react" },
    { label: "Angular", value: "angular" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
    { label: "Gatsby", value: "gatsby" },
  ]
  
  const languages: Option[] = [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "Python", value: "py" },
    { label: "Java", value: "java" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
    { label: "Go", value: "go" },
    { label: "Rust", value: "rust" },
    { label: "Ruby", value: "ruby" },
    { label: "PHP", value: "php" },
  ]
  
  const fruits: Option[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    { label: "Grape", value: "grape" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Mango", value: "mango" },
    { label: "Kiwi", value: "kiwi" },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Multi Select</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic Multi Select</h3>
        <div className="w-full max-w-sm">
          <MultiSelect
            options={fruits}
            selected={selected}
            onChange={setSelected}
            placeholder="Select fruits..."
          />
          {selected.length > 0 && (
            <div className="mt-2 text-sm">
              Selected: {selected.map(value => {
                const option = fruits.find(opt => opt.value === value)
                return option?.label
              }).join(", ")}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Pre-selected Values</h3>
        <div className="w-full max-w-sm">
          <MultiSelect
            options={frameworks}
            selected={selectedFrameworks}
            onChange={setSelectedFrameworks}
            placeholder="Select frameworks..."
          />
          {selectedFrameworks.length > 0 && (
            <div className="mt-2 text-sm">
              Selected: {selectedFrameworks.map(value => {
                const option = frameworks.find(opt => opt.value === value)
                return option?.label
              }).join(", ")}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Many Options</h3>
        <div className="w-full max-w-sm">
          <MultiSelect
            options={languages}
            selected={selectedLanguages}
            onChange={setSelectedLanguages}
            placeholder="Select programming languages..."
          />
          {selectedLanguages.length > 0 && (
            <div className="mt-2 text-sm">
              Selected: {selectedLanguages.map(value => {
                const option = languages.find(opt => opt.value === value)
                return option?.label
              }).join(", ")}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Custom Width</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 text-sm font-medium">Narrow (200px)</div>
            <MultiSelect
              options={fruits.slice(0, 4)}
              selected={[]}
              onChange={() => {}}
              placeholder="Select..."
              className="w-[200px]"
            />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Wide (400px)</div>
            <MultiSelect
              options={fruits.slice(0, 4)}
              selected={[]}
              onChange={() => {}}
              placeholder="Select..."
              className="w-[400px]"
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Form Integration Example</h3>
        <div className="w-full max-w-md p-4 border rounded-md">
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interests</label>
              <MultiSelect
                options={fruits}
                selected={selected}
                onChange={setSelected}
                placeholder="Select your interests..."
              />
            </div>
            <button 
              type="button" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
