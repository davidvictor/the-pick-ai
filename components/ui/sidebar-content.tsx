"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { AppFooter } from "@/components/ui/app-footer";

interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <SidebarInset className={`flex flex-col ${className || ""}`}>
      <div className="flex-1">
        {children}
      </div>
      <AppFooter />
    </SidebarInset>
  );
}
