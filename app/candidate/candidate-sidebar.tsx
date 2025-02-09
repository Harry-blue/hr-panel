import { Calendar, Home, Mail, User } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/candidate" },
  { title: "Interview Schedule", icon: Calendar, href: "/candidate/schedule" },
  { title: "Notifications", icon: Mail, href: "/candidate/notifications" },
  { title: "Profile", icon: User, href: "/candidate/profile" },
];

export function CandidateSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-semibold">Candidate Portal</h2>
        <SidebarTrigger />
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
