import { ReactNode } from "react";
import Link from "next/link";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CandidateSidebar } from "./candidate-sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function CandidateAdminLayout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <CandidateSidebar />

        <SidebarTrigger />
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
