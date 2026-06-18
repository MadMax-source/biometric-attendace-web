"use client"

import type { ReactNode } from "react"
import { BookOpen, History, LayoutDashboard } from "lucide-react"
import { DashboardShell, type NavItem } from "@/components/dashboard-shell"

const nav: NavItem[] = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "My Courses", href: "/student/courses", icon: BookOpen },
  { label: "Attendance History", href: "/student/history", icon: History },
]

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="student" nav={nav}>
      {children}
    </DashboardShell>
  )
}
