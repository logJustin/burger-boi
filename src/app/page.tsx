import Sidebar from "@components/Sidebar";
import { SidebarTrigger } from "@shadcn/sidebar";
import React from "react";

export default function Page() {
  return (
    <>
      <Sidebar />
      <div className="w-full flex p-4">
        <SidebarTrigger />
        <div className="w-full">
          <h1>Hello, Next.js!</h1>
        </div>
      </div>
    </>
  );
}
