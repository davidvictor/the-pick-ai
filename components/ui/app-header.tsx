import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

export interface BreadcrumbItemProps {
  href?: string;
  label: string;
  isCurrentPage?: boolean;
  className?: string;
}

export interface AppHeaderProps {
  // For breadcrumb navigation
  breadcrumbItems: BreadcrumbItemProps[];
  
  // Optional back button
  showBackButton?: boolean;
  onBack?: () => void;
  
  // Optional additional content for the left side
  leftContent?: ReactNode;
  
  // Optional additional content for the right side
  rightContent?: ReactNode;
}

export function AppHeader({ 
  breadcrumbItems,
  showBackButton = false,
  onBack,
  leftContent,
  rightContent
}: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        
        {/* show logo on mobile */}
        <a href="#" className='logo mark dark:logo-dark md:hidden mr-1'></a>
        <Separator
          orientation="vertical"
          className={`mr-2 data-[orientation=vertical]:h-4 md:hidden ${showBackButton && onBack ? '' : 'hidden'}`}
        />
        <SidebarTrigger className="-ml-1 hidden md:flex" />
        
        {showBackButton && onBack ? (
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack} 
              className="mr-2 -ml-1 md:ml-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="md:hidden">Back</span>
            </Button>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 hidden md:block"
            />
          </div>
        ) : (
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 hidden md:block"
        />
        )}
        
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className={item.className}>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : item.href ? (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </BreadcrumbItem>
                
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator className={item.className} />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        {leftContent}
      </div>
      
      <div className="flex flex-1 grow justify-end pr-8">
        {rightContent || <ThemeToggle />}
        {/* show tigger on mobile */}
        <SidebarTrigger className="ml-3 flex md:hidden size-9 -mr-5" />
      </div>
    </header>
  );
}
