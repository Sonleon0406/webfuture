import { LayoutDashboard, Package, FolderTree, Users, Newspaper, Leaf, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Danh mục", url: "/categories", icon: FolderTree },
  { title: "Sản phẩm", url: "/products", icon: Package },
  { title: "Người dùng", url: "/users", icon: Users },
  { title: "Tin tức", url: "/news", icon: Newspaper },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent>
        {/* Logo Section */}
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          {open && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Natural Shop</h1>
              <p className="text-xs text-sidebar-muted">Admin Panel</p>
            </div>
          )}
        </div>

        <Separator className="bg-sidebar-border" />
        
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-sidebar-muted px-6 mb-2">
            Quản lý
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-6 py-3 rounded-xl mx-3 transition-all hover:bg-sidebar-accent group"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium shadow-sm"
                    >
                      <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                      {open && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="p-4">
        <Separator className="bg-sidebar-border mb-4" />
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sidebar-accent transition-colors">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" />
            <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
          </Avatar>
          {open && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-sidebar-muted">admin@naturalshop.com</p>
            </div>
          )}
        </div>
        {open && (
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent mt-2"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}