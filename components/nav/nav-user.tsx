"use client"

import { use, useState, useEffect } from 'react';
import Link from 'next/link';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import { ROUTES } from '@/lib/routes';
import { appConfig } from '@/lib/app-config';
import { checkoutAction } from '@/lib/payments/actions';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useUser } from '@/lib/auth';
import { signOut } from '@/lib/auth/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { userPromise } = useUser();
  const router = useRouter();
  
  // Let React handle the suspense with the parent's Suspense boundary
  const userData = use(userPromise);
  
  // Safe accessors with fallbacks
  const name = userData?.name || '';
  const email = userData?.email || '';
  // User type doesn't have avatar, so we'll use a placeholder value
  const avatar = '';
  
  // Initialize with empty string to avoid hydration mismatch
  const [displayInitials, setDisplayInitials] = useState('');
  
  // Set initials only on client-side after hydration
  useEffect(() => {
    setDisplayInitials(email ? email.charAt(0).toUpperCase() : 'U');
  }, [email]);

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg">{displayInitials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg">{displayInitials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <form action={checkoutAction}>
                <input 
                  type="hidden" 
                  name="priceId" 
                  value={appConfig.stripe.prices.premiumPriceId} 
                />
                <DropdownMenuItem asChild>
                  <button type="submit" className="w-full flex cursor-pointer">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>Upgrade to Pro</span>
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.ACCOUNT.INDEX} className="flex cursor-pointer">
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.ACCOUNT.BILLING} className="flex cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.ACCOUNT.NOTIFICATIONS} className="flex cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={handleSignOut} className="w-full">
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full flex cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
