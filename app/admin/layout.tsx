"use client"

import type { ReactNode } from "react"
import { BarChart3, BookOpen, CalendarCheck, LayoutDashboard, Users } from "lucide-react"
import { DashboardShell, type NavItem } from "@/components/dashboard-shell"

const nav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="admin" nav={nav}>
      {children}
    </DashboardShell>
  )
}
