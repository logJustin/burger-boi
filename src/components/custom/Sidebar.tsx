"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@shadcn/sidebar";
import { Switch } from "@shadcn/switch";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const pages = [
    { text: "Home", link: "/", featureReady: false },
    { text: "Activities", link: "/activities", featureReady: true },
    { text: "Burgers", link: "/burgers", featureReady: true },
    { text: "Charts", link: "/charts", featureReady: false },
  ];

  return (
    <ShadcnSidebar>
      <SidebarMenu className="p-4 pt-2">
        <SidebarMenuItem>
          <Link href={pages[0].link}>
            <SidebarMenuButton className="font-medium text-lg hover:bg-transparent hover:text-inherit focus:bg-transparent focus:text-inherit active:bg-transparent active:text-inherit cursor-auto">
              <Image src="/burger.ico" alt="Burger Icon" width={16} height={16} />
              Burger Boi
            </SidebarMenuButton>
          </Link>
          <SidebarMenuSub>
            {pages.map(
              (page) =>
                page.featureReady && (
                  <Link href={page.link} key={page.text} passHref>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <span className="cursor-pointer">{page.text}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                ),
            )}
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>

      <div className="flex gap-x-2 items-center mt-auto p-4">
        {resolvedTheme === "dark" ? (
          <MdDarkMode className="h-5 w-5" title="Dark mode" />
        ) : (
          <MdLightMode className="h-5 w-5" title="Light mode" />
        )}
        <Switch
          checked={resolvedTheme === "dark"}
          onCheckedChange={toggleTheme}
          className="data-[state=unchecked]:bg-stone-700 data-[state=checked]:bg-stone-700"
        />
      </div>
    </ShadcnSidebar>
  );
}
