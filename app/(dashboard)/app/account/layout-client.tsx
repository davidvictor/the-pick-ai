'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  { label: 'Account', href: ROUTES.ACCOUNT.GENERAL },
  { label: 'Notifications', href: ROUTES.ACCOUNT.NOTIFICATIONS },
  { label: 'Billing', href: ROUTES.ACCOUNT.BILLING },
  { label: 'Activity', href: ROUTES.ACCOUNT.ACTIVITY },
  { label: 'Security', href: ROUTES.ACCOUNT.SECURITY },
];

export default function AccountLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Find the current active navigation item for mobile dropdown
  const currentNavItem = navigationItems.find(item => pathname === item.href) || navigationItems[0];

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Account Settings</h1>
      
      {/* Mobile Dropdown Navigation */}
      <div className="md:hidden mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {currentNavItem.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {navigationItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="w-full cursor-pointer">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-24 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
