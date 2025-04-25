"use client";

import Avatar from "@/components/custom/general/Avatar";
import Breadcrumbs from "@/components/custom/general/Breadcrumbs";
import Seperator from "@/components/custom/general/Seperator";
import AddBurgersModal from "@/components/custom/navbar/AddBurgersModal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isBurgers = pathname === "/burgers";
  return (
    <div className="w-full flex gap-x-2 bg-sidebar text-sidebar-foreground p-4 border-b items-center">
      <SidebarTrigger className="cursor-pointer" />
      <Seperator orientation="vertical" />
      <Breadcrumbs />
      {isBurgers && <AddBurgersModal />}
      <Avatar />
    </div>
  );
}
