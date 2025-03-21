"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

/**
 * Tabs root component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Tabs component
 */
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("data-[orientation=vertical]:flex data-[orientation=vertical]:flex-row", className)}
    {...props}
  />
));
Tabs.displayName = "Tabs";

/**
 * Tabs list component with animated indicator
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} TabsList component
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  });
  // Track initialization phase: 'pre-init', 'positioned', 'animated'
  const [initPhase, setInitPhase] = useState('pre-init');
  const tabsListRef = useRef<HTMLDivElement | null>(null);

  const updateIndicator = React.useCallback(() => {
    if (!tabsListRef.current) return;

    const activeTab = tabsListRef.current.querySelector('[data-state="active"]');
    if (!activeTab) return;

    const activeRect = activeTab.getBoundingClientRect();
    const tabsRect = tabsListRef.current.getBoundingClientRect();

    // Update indicator position
    setIndicatorStyle({
      left: activeRect.left - tabsRect.left,
      top: activeRect.top - tabsRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, []);

  // Handle initial positioning and phased initialization
  useEffect(() => {
    if (initPhase === 'pre-init' && tabsListRef.current) {
      // First phase: position without animation
      const activeTab = tabsListRef.current.querySelector('[data-state="active"]');
      if (activeTab) {
        const activeRect = activeTab.getBoundingClientRect();
        const tabsRect = tabsListRef.current.getBoundingClientRect();
        
        // Set initial position immediately
        setIndicatorStyle({
          left: activeRect.left - tabsRect.left,
          top: activeRect.top - tabsRect.top,
          width: activeRect.width,
          height: activeRect.height
        });
        
        // Move to next phase after position is set
        requestAnimationFrame(() => {
          setInitPhase('positioned');
        });
      }
    } else if (initPhase === 'positioned') {
      // Second phase: enable animations for future updates
      requestAnimationFrame(() => {
        setInitPhase('animated');
      });
    }
  }, [initPhase, tabsListRef]);

  // Handle resize and DOM mutations after initialization
  useEffect(() => {
    // Only add event listeners after initialization
    if (initPhase !== 'animated') return;
    
    window.addEventListener("resize", updateIndicator);
    const observer = new MutationObserver(updateIndicator);

    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [initPhase, updateIndicator]);

  return (
    <div className="relative" ref={tabsListRef}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
          className
        )}
        {...props}
      />
      <div
        className={cn(
          "absolute rounded-md bg-background shadow-sm",
          // Only show the indicator after it's positioned
          initPhase === 'pre-init' && "opacity-0",
          // Only apply transitions after initialization
          initPhase === 'animated' && "transition-all duration-300 ease-in-out"
        )}
        style={indicatorStyle}
      />
    </div>
  );
});
TabsList.displayName = "TabsList";

/**
 * Tabs trigger component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} TabsTrigger component
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground z-10 cursor-pointer",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/**
 * Tabs content component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} TabsContent component
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
