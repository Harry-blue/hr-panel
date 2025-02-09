import { BarChart, Calendar, Mail, Settings, Users } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: BarChart, href: "/admin/dashboard" },
  { title: "Candidates", icon: Users, href: "/admin/candidates" },
  { title: "Scheduling", icon: Calendar, href: "/admin/scheduling" },
  { title: "Notifications", icon: Mail, href: "/admin/notifications" },
  { title: "Reports", icon: BarChart, href: "/admin/reports" },
  { title: "Profile", icon: Settings, href: "/admin/profile" },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 py-2">
        <p className="text-xs text-muted-foreground">© 2025 Your Company</p>
      </SidebarFooter>
    </Sidebar>
  );
}
