import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";  // Note: Implement this utility if needed, e.g., function createPageUrl(name) { return `/${name.toLowerCase()}`; }
import { 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Activity,
  Zap,
  Globe,
  Signal,
  Target
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Live Signals",
    url: createPageUrl("Dashboard"),
    icon: Signal,
  },
  {
    title: "Market Overview",
    url: createPageUrl("Market"),
    icon: Globe,
  },
  {
    title: "Technical Analysis",
    url: createPageUrl("TechnicalAnalysis"),
    icon: Target,
  },
  {
    title: "Signal Analytics",
    url: createPageUrl("Analytics"),
    icon: BarChart3,
  },
  {
    title: "Indicators Config",
    url: createPageUrl("Settings"),  // Assuming this maps to Settings page
    icon: Settings,
  }
  // Add more if needed
];

// Example usage: Wrap pages with <Layout><Page /></Layout>
export default function Layout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          {/* Add logo or title here */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className={location.pathname === item.url ? "active" : ""}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>{children}</main>
      <SidebarTrigger />  // Toggle button if needed
    </SidebarProvider>
  );
}

