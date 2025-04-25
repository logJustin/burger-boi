import Avatar from "@/components/custom/general/Avatar";
import Breadcrumbs from "@/components/custom/general/Breadcrumbs";
import Seperator from "@/components/custom/general/Seperator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
  return (
    <div className="w-full flex gap-x-2 bg-sidebar text-sidebar-foreground p-4 border-b items-center">
      <SidebarTrigger className="cursor-pointer" />
      <Seperator orientation="vertical" />
      <Breadcrumbs />
      <Avatar />
    </div>
  );
}
