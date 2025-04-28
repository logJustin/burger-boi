"use client";

import { BurgerProvider } from "@/components/contexts/burger-context";
import { StravaTokenProvider } from "@/components/contexts/strava-context";
import { SidebarProvider } from "@shadcn/sidebar";
import { ThemeProvider } from "components/contexts/theme-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <StravaTokenProvider>
          <BurgerProvider>{children}</BurgerProvider>
        </StravaTokenProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
