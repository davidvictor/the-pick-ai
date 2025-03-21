"use client"

import * as React from "react"
import { 
  Baseball, 
  Basketball, 
  Football, 
  Hockey, 
  Soccer 
} from "@/components/ui/sport-icon"

export function SportIconExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Sport Icons</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Default Size (24px)</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Basketball />
            <span className="text-sm">Basketball</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Football />
            <span className="text-sm">Football</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Baseball />
            <span className="text-sm">Baseball</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Hockey />
            <span className="text-sm">Hockey</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Soccer />
            <span className="text-sm">Soccer</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Custom Size (32px)</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Basketball size={32} />
            <span className="text-sm">Basketball</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Football size={32} />
            <span className="text-sm">Football</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Baseball size={32} />
            <span className="text-sm">Baseball</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Hockey size={32} />
            <span className="text-sm">Hockey</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Soccer size={32} />
            <span className="text-sm">Soccer</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Custom Colors</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Basketball className="text-blue-500" />
            <span className="text-sm">Blue</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Football className="text-red-500" />
            <span className="text-sm">Red</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Baseball className="text-green-500" />
            <span className="text-sm">Green</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Hockey className="text-purple-500" />
            <span className="text-sm">Purple</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Soccer className="text-yellow-500" />
            <span className="text-sm">Yellow</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">With Tailwind Classes</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Basketball className="h-10 w-10" />
            <span className="text-sm">h-10 w-10</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Football className="h-12 w-12" />
            <span className="text-sm">h-12 w-12</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Baseball className="h-14 w-14" />
            <span className="text-sm">h-14 w-14</span>
          </div>
        </div>
      </div>
    </div>
  )
}
