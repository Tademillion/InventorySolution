"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  FileText,
  TrendingUp,
  ShoppingCart,
  Sparkles,
  LogOut,
  Warehouse,
  BarChart3,
  ShieldCheck,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BRAND } from "@/lib/constants"

const adminMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "Stock Management", icon: Package, href: "/admin/stock" },
  { title: "Products", icon: Package, href: "/admin/products" },
  { title: "Categories", icon: FolderTree, href: "/admin/categories" },
  { title: "Warehouses", icon: Warehouse, href: "/admin/warehouses" },
  { title: "Batches", icon: Layers, href: "/admin/batches" },
  { title: "Suppliers", icon: Users, href: "/admin/suppliers" },
  { title: "Customers", icon: Users, href: "/admin/customers" },
  { title: "Invoices", icon: FileText, href: "/admin/invoices" },
  { title: "Stock Movements", icon: TrendingUp, href: "/admin/stock-movements" },
  { title: "AI Insights", icon: Sparkles, href: "/admin/ai-insights" },
  { title: "Reports", icon: BarChart3, href: "/admin/reports" },
]

const cashierMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/cashier" },
  { title: "New Sale", icon: ShoppingCart, href: "/cashier/new-sale" },
  { title: "Sales History", icon: FileText, href: "/cashier/sales" },
  { title: "Products", icon: Package, href: "/cashier/products" },
  { title: "Customers", icon: Users, href: "/cashier/customers" },
]

const auditorMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/auditor" },
  { title: "Audit Trail", icon: ShieldCheck, href: "/auditor/audit-trail" },
  { title: "Reports", icon: BarChart3, href: "/auditor/reports" },
  { title: "Inventory Review", icon: Package, href: "/auditor/inventory" },
  { title: "Transactions", icon: FileText, href: "/auditor/transactions" },
  { title: "Analytics", icon: TrendingUp, href: "/auditor/analytics" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  let menuItems = adminMenuItems
  if (user?.role === "cashier") menuItems = cashierMenuItems
  if (user?.role === "auditor") menuItems = auditorMenuItems

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary">
            <Package className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">{BRAND.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-accent text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="w-full justify-start bg-transparent">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
