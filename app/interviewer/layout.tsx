import { ReactNode } from "react";
import Link from "next/link";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { InterviewerSidebar } from "./interviewer-sidebar";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function InterViwerAdminLayout({ children }: LayoutProps) {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <InterviewerSidebar />
        <div
          id="content"
          className={cn(
            "max-w-full w-full ml-auto",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] ease-linear duration-200",
            "h-svh flex flex-col"
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
