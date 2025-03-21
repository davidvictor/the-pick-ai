"use client"

import * as React from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SheetExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Sheet</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" value="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right text-sm font-medium">
                    Username
                  </label>
                  <Input id="username" value="@johndoe" className="col-span-3" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Positions</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Right Side Sheet</SheetTitle>
                <SheetDescription>
                  This sheet appears from the right side of the screen.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Left</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left Side Sheet</SheetTitle>
                <SheetDescription>
                  This sheet appears from the left side of the screen.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Top</Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Top Sheet</SheetTitle>
                <SheetDescription>
                  This sheet appears from the top of the screen.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Bottom Sheet</SheetTitle>
                <SheetDescription>
                  This sheet appears from the bottom of the screen.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Default</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Default Size</SheetTitle>
                <SheetDescription>
                  This is the default size for the sheet.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Small</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[300px]">
              <SheetHeader>
                <SheetTitle>Small Sheet</SheetTitle>
                <SheetDescription>
                  This is a small sheet with a width of 300px.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Large</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[540px]">
              <SheetHeader>
                <SheetTitle>Large Sheet</SheetTitle>
                <SheetDescription>
                  This is a large sheet with a width of 540px.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Full</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-full">
              <SheetHeader>
                <SheetTitle>Full Width Sheet</SheetTitle>
                <SheetDescription>
                  This sheet takes up the full width of the screen.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
