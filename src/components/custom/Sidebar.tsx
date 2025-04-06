"use client";

import { Button } from "@shadcn/button";
import { Sidebar as ShadcnSidebar } from "@shadcn/sidebar";

export default function Sidebar() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <ShadcnSidebar>
      <div className="w-full flex flex-col p-4">
        <Button onClick={handleClick} className="cursor-pointer">
          Big Test Button
        </Button>
      </div>
    </ShadcnSidebar>
  );
}
