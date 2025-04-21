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
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const pages = [
    { text: "Home", link: "/" },
    { text: "Burgers", link: "/burgers" },
    { text: "Charts", link: "/charts" },
    { text: "Activities", link: "/activities" },
  ];

  return (
    <ShadcnSidebar>
      <SidebarMenu className="p-4">
        <SidebarMenuItem>
          <SidebarMenuButton>Pages</SidebarMenuButton>
          <SidebarMenuSub>
            {pages.map((page) => {
              return (
                <SidebarMenuSubItem onClick={() => router.push(page.link)} key={page.text}>
                  <SidebarMenuSubButton className="cursor-pointer">{page.text}</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
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
