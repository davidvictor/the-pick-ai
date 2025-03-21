"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SportIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  strokeWidth?: number
  absoluteStrokeWidth?: boolean
  color?: string
}

const SportIcon = React.forwardRef<SVGSVGElement, SportIconProps>(
  (
    {
      children,
      className,
      size,
      strokeWidth = 1.5,
      absoluteStrokeWidth,
      color,
      ...props
    },
    ref
  ) => {
    const computedSize = size || 24
    const _width = props.width || computedSize
    const _height = props.height || computedSize
    const _color = color || "currentColor"

    return (
      <svg
        ref={ref}
        width={_width}
        height={_height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={_color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("", className)}
        {...props}
      >
        {children}
      </svg>
    )
  }
)

SportIcon.displayName = "SportIcon"

export { SportIcon }
