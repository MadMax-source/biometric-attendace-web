"use client";

import type { ReactNode } from "react";
import { BookOpen, LayoutDashboard, UserPlus } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";

const nav: NavItem[] = [
  { label: "Dashboard", href: "/lecturer", icon: LayoutDashboard },
  { label: "My Courses", href: "/lecturer/courses", icon: BookOpen },
  { label: "Profile", href: "/lecturer/profile", icon: UserPlus },
];

export default function LecturerLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="lecturer" nav={nav}>
      {children}
    </DashboardShell>
  );
}
