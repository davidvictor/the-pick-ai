"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select"

export function SelectExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Select</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic Select</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Groups and Separator</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Select>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Disabled State</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Select disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option">Option</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3" disabled>Option 3 (Disabled)</SelectItem>
              <SelectItem value="option4">Option 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Different Widths</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Small" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s">Small</SelectItem>
              <SelectItem value="m">Medium</SelectItem>
              <SelectItem value="l">Large</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Medium" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s">Small</SelectItem>
              <SelectItem value="m">Medium</SelectItem>
              <SelectItem value="l">Large</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Large" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s">Small</SelectItem>
              <SelectItem value="m">Medium</SelectItem>
              <SelectItem value="l">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
