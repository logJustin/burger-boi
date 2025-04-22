"use client";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { MdHomeFilled } from "react-icons/md";

export default function Breadcrumbs() {
  const path = usePathname();
  const pathSegments = path.split("/").filter(Boolean);
  return (
    <Breadcrumb className="min-w-fit">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">
            <MdHomeFilled className="w-5 h-5" />
          </Link>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          return (
            <Fragment key={segment + index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={href}>{segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</Link>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
