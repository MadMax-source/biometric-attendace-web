"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, Menu, ShieldCheck, X, type LucideIcon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import type { Role } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { EngineeringBackground } from "@/components/engineering-bg"
import { PageTransition } from "@/components/page-transition"
import { cn } from "@/lib/utils"

export type NavItem = { label: string; href: string; icon: LucideIcon }

export function DashboardShell({
  role,
  nav,
  children,
}: {
  role: Role
  nav: NavItem[]
  children: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, logout } = useAuth()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (loading) return
    if (!user) router.replace("/")
    else if (user.role !== role) router.replace(`/${user.role}`)
  }, [user, loading, role, router])

  useEffect(() => setOpen(false), [pathname])

  if (loading || !user || user.role !== role) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  function handleLogout() {
    logout()
    router.replace("/")
  }

  const initials = role.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
      <EngineeringBackground />
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="size-4" />
          </div>
          <span className="font-semibold tracking-tight">BioAttend</span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {role} panel
          </p>
          {nav.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t p-3">
          <Button variant="ghost" className="w-full justify-start gap-3 text-sm" onClick={handleLogout}>
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main */}
      <div className="flex min-h-dvh flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex flex-col">
            <span className="text-sm font-medium capitalize">{role} Dashboard</span>
            <span className="text-xs text-muted-foreground">Computer Engineering, FUTMINNA</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}
