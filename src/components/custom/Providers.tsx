"use client";

import { StravaTokenProvider } from "@/components/contexts/strava-context";
import { SidebarProvider } from "@shadcn/sidebar";
import { ThemeProvider } from "components/contexts/theme-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <StravaTokenProvider>{children}</StravaTokenProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
