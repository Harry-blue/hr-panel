import { ReactNode } from "react";
import Cookies from "js-cookie";
import { AdminSidebar } from "./admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AdminSidebar />

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
