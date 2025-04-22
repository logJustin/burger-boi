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
import Image from "next/image";

export default function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const pages = [
    { text: "Home", link: "/", featureReady: true },
    { text: "Activities", link: "/activities", featureReady: true },
    { text: "Burgers", link: "/burgers", featureReady: true },
    { text: "Charts", link: "/charts", featureReady: false },
  ];

  return (
    <ShadcnSidebar>
      <SidebarMenu className="p-4">
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => router.push(pages[0].link)}
            className="font-medium text-lg hover:bg-transparent hover:text-inherit focus:bg-transparent focus:text-inherit active:bg-transparent active:text-inherit cursor-auto"
          >
            <Image src="/burger.ico" alt="Burger Icon" width={16} height={16} />
            Burger Boi
          </SidebarMenuButton>
          <SidebarMenuSub>
            {pages.map(
              (page) =>
                page.featureReady && (
                  <SidebarMenuSubItem onClick={() => router.push(page.link)} key={page.text}>
                    <SidebarMenuSubButton className="cursor-pointer">{page.text}</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
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
