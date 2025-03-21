"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const checkboxVariants = cva(
  "peer shrink-0 rounded-sm border border-input ring-offset-background shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground cursor-pointer",
  {
    variants: {
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/**
 * Checkbox component using Radix UI Checkbox primitive
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.checked] - Whether the checkbox is checked
 * @param {Function} [props.onCheckedChange] - Function called when checked state changes
 * @param {('default'|'sm'|'lg')} [props.size='default'] - Checkbox size
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Checkbox component
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    size?: "default" | "sm" | "lg"
  }
>(({ className, size, ...props }, ref) => {
  // This key will change when checkbox is checked/unchecked to force re-rendering of the AnimatedCheckmark
  const [animationKey, setAnimationKey] = React.useState(0)
  
  // When checked state changes, update the key to force re-render and animation
  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    setAnimationKey(prev => prev + 1)
    if (props.onCheckedChange) {
      props.onCheckedChange(checked)
    }
  }
  
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ size }), className)}
      {...props}
      onCheckedChange={handleCheckedChange}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <AnimatedCheckmark 
          key={animationKey}
          className={cn({
            "h-4 w-4": size === "default" || !size,
            "h-3 w-3": size === "sm",
            "h-5 w-5": size === "lg",
          })} 
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

/**
 * Animated checkmark SVG component that draws the check from the short end
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} AnimatedCheckmark component
 */
const AnimatedCheckmark = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className }, ref) => {
  // Use a ref to get the path length for the animation
  const pathRef = React.useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = React.useState(0)

  React.useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
    }
  }, [])

  // Set up inline styles for the animation
  React.useEffect(() => {
    if (pathRef.current && pathLength) {
      // Apply the styles directly to the path element
      const path = pathRef.current;
      path.style.strokeDasharray = String(pathLength);
      path.style.strokeDashoffset = String(pathLength); 
      // Force a reflow to ensure the animation starts properly
      path.getBoundingClientRect();
      // Now set the offset to 0 to animate
      requestAnimationFrame(() => {
        path.style.transition = "stroke-dashoffset 0.2s ease-in-out";
        path.style.strokeDashoffset = "0";
      });
    }
  }, [pathLength]);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
AnimatedCheckmark.displayName = "AnimatedCheckmark"

export { Checkbox, checkboxVariants }
