"use client"

import type React from "react"
import { useRequireAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoading, isAuthorized } = useRequireAuth(["cashier"])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthorized) {
    router.push("/login")
    return null
  }

  return (
    <SidebarProvider suppressHydrationWarning={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Customer Portal</h1>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
