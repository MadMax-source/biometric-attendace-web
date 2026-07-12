"use client";

import type { ReactNode } from "react";
import {
  BookOpen,
  Database,
  LayoutDashboard,
  UserPlus,
  History,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";

const nav: NavItem[] = [
  { label: "Dashboard", href: "/lecturer", icon: LayoutDashboard },
  { label: "My Courses", href: "/lecturer/courses", icon: BookOpen },
  { label: "Profile", href: "/lecturer/profile", icon: UserPlus },
  {
    label: "Attendance History",
    href: "/lecturer/history",
    icon: Database,
  },
];

export default function LecturerLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="lecturer" nav={nav}>
      {children}
    </DashboardShell>
  );
}
