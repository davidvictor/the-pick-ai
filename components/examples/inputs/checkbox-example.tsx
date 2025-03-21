"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Checkbox</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic Checkbox</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="basic" />
          <label
            htmlFor="basic"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Disabled State</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-unchecked" disabled />
            <label
              htmlFor="disabled-unchecked"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-not-allowed"
            >
              Disabled unchecked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <label
              htmlFor="disabled-checked"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-not-allowed"
            >
              Disabled checked
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Size Variants</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="size-sm" size="sm" />
            <label
              htmlFor="size-sm"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Small size (sm)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-default" size="default" />
            <label
              htmlFor="size-default"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Default size
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-lg" size="lg" />
            <label
              htmlFor="size-lg"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Large size (lg)
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Checkbox Group</h3>
        <div className="flex flex-col gap-2">
          <div className="mb-2 text-sm font-medium">Select your interests:</div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sports" />
            <label
              htmlFor="sports"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Sports
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="music" />
            <label
              htmlFor="music"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Music
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="movies" />
            <label
              htmlFor="movies"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Movies
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="reading" />
            <label
              htmlFor="reading"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Reading
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Form Elements</h3>
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="newsletter"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Subscribe to newsletter
              </label>
              <p className="text-sm text-muted-foreground">
                Get notified about new products and features.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Controlled Checkbox</h3>
        <ControlledCheckbox />
      </div>
    </div>
  )
}

function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(false)
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="controlled" 
          checked={checked} 
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <label
          htmlFor="controlled"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {checked ? "Checked" : "Unchecked"}
        </label>
      </div>
      <div className="text-sm text-muted-foreground">
        Current state: {checked ? "Checked" : "Unchecked"}
      </div>
    </div>
  )
}
