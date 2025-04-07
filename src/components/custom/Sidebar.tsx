"use client";

import { Button } from "@shadcn/button";
import { Sidebar as ShadSidebar } from "@shadcn/sidebar";
import { Switch } from "@shadcn/switch";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <ShadSidebar>
      <div className="w-full h-full flex flex-col p-4">
        <Button onClick={handleClick} className="cursor-pointer">
          Big Test Button
        </Button>

        <div className="flex gap-x-2 items-center mt-auto">
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
      </div>
    </ShadSidebar>
  );
}
