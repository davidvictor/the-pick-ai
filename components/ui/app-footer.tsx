"use client";

import { appConfig } from "@/lib/app-config";

export function AppFooter() {
  return (
    <div className="w-full pt-3 pb-5 px-8 mt-auto text-center md:text-left">
      <div className="text-xs text-gray-400">
        {appConfig.footer.legalText}
      </div>
    </div>
  );
}
