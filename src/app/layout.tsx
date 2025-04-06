import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@shadcn/sidebar";
import Sidebar from "@components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-row`}>
          <Sidebar />
          <main className="w-full flex p-4">
            <SidebarTrigger />
            {children}
          </main>
        </body>
      </html>
    </SidebarProvider>
  );
}
