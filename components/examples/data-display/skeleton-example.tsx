"use client"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Skeleton</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic Shapes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12" />
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Card Layout</h3>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Profile Card</h3>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Table Row</h3>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  )
}
