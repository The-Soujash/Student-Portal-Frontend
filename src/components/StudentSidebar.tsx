import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Calendar,
  BookOpen,
  ClipboardList,
  CreditCard,
  Trophy,
  FileText,
  GraduationCap,
  LogOut,
  Menu,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Attendance", url: "/attendance", icon: Calendar },
  { title: "Academic Resources", url: "/resources", icon: BookOpen },
  { title: "Lecture Plan", url: "/lectures", icon: ClipboardList },
  { title: "Fee Receipts", url: "/receipts", icon: CreditCard },
  { title: "Marks", url: "/marks", icon: Trophy },
  { title: "Documents", url: "/documents", icon: FileText },
];

interface StudentSidebarProps {
  onLogout: () => void;
}

export function StudentSidebar({ onLogout }: StudentSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-university-light-blue text-university-dark-blue font-medium" 
      : "hover:bg-muted/50 text-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-university-blue" />
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-university-blue">Brainware</h2>
                <p className="text-xs text-muted-foreground">Student Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t">
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start"
            size={collapsed ? "sm" : "default"}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}