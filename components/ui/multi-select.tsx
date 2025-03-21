"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "./command"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

export type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
  placeholder?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  className,
  placeholder = "Select options...",
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Handle click outside to close the dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) && 
        open
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.target as HTMLInputElement
    if (e.key === "Delete" || e.key === "Backspace") {
      if (input.value === "" && selected.length > 0) {
        onChange(selected.slice(0, -1))
      }
    }
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const handleToggleOption = (value: string) => {
    const isSelected = selected.includes(value)
    if (isSelected) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
    setInputValue("")
    // Keep the dropdown open after selection to allow multiple selections
  }

  // Create a Command component if it doesn't exist
  if (typeof Command === "undefined") {
    return (
      <div className="relative flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value)
            return (
              <Badge key={value} variant="secondary" className="rounded-sm px-1 font-normal">
                {option?.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {option?.label}</span>
                </button>
              </Badge>
            )
          })}
          <input
            placeholder={selected.length === 0 ? placeholder : ""}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)} {...props} ref={containerRef}>
      <div
        className="relative flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value)
            return (
              <Badge key={value} variant="secondary" className="rounded-sm px-1 font-normal">
                {option?.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUnselect(value)
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {option?.label}</span>
                </button>
              </Badge>
            )
          })}
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            placeholder={selected.length === 0 ? placeholder : ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="relative">
        {open && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <Command className="overflow-hidden rounded-md bg-popover">
              <CommandPrimitive.Input
                value={inputValue}
                onValueChange={setInputValue}
                className="border-none bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Search..."
              />
              <CommandGroup className="max-h-60 overflow-auto">
                {options.map((option) => {
                  const isSelected = selected.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        // Handle selection
                        handleToggleOption(option.value)
                      }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div 
                        className="flex items-center gap-2 w-full"
                        onClick={(e) => {
                          // Stop propagation to prevent CommandItem's onSelect from firing twice
                          e.stopPropagation()
                          handleToggleOption(option.value)
                        }}
                      >
                        <Checkbox 
                          checked={isSelected} 
                          onCheckedChange={() => handleToggleOption(option.value)}
                          // Prevent event bubbling to avoid double-triggering
                          onClick={(e) => e.stopPropagation()}
                        />
                        {option.label}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </Command>
          </div>
        )}
      </div>
    </div>
  )
}
