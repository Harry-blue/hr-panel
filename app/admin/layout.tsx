import { ReactNode } from "react";
import Link from "next/link";
import { AdminSidebar } from "./admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar />
        <SidebarTrigger />
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
