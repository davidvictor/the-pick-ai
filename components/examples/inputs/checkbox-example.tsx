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
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Disabled unchecked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <label
              htmlFor="disabled-checked"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Disabled checked
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
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sports
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="music" />
            <label
              htmlFor="music"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Music
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="movies" />
            <label
              htmlFor="movies"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Movies
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="reading" />
            <label
              htmlFor="reading"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
