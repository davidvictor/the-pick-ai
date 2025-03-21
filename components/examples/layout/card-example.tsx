"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function CardExample() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Card</h3>
        <p className="text-muted-foreground mb-4">
          Cards are used to group related content and actions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Basic Card</h4>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Login Form Card</h4>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="text-sm font-medium">Email</div>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-medium">Password</div>
                  <Input id="password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Notification Card</h4>
          <Card>
            <CardHeader>
              <CardTitle>Notification</CardTitle>
              <CardDescription>You have a new message</CardDescription>
            </CardHeader>
            <CardContent>
              <p>John Doe sent you a message regarding your recent order.</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="ghost">Dismiss</Button>
              <Button>View</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Pricing Card</h4>
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Pro Plan</CardTitle>
              <CardDescription>Perfect for small businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">$29<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited projects
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  5 team members
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  20GB storage
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
