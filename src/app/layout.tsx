import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "@components/Providers";
import { Metadata } from "next";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
