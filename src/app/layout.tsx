import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "@components/Providers";
import { Metadata } from "next";
import Sidebar from "@components/Sidebar";
import { SidebarTrigger } from "@shadcn/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BurgerBoi",
  description: "Tracking burgers for the bois",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-row`}>
        <Providers>
          <Sidebar />
          <div className="w-full flex-col flex p-4">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
