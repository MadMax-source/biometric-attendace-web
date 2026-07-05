"use client";

import type { ReactNode } from "react";
// Added BookOpen back to the imports
import { Home, User, BookOpen, Database } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";

const nav: NavItem[] = [
  { label: "Dashboard", href: "/student", icon: Home },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "My Courses", href: "/student/courses", icon: BookOpen },
  { label: "Attendance History", href: "/student/history", icon: Database },
];

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="student" nav={nav}>
      {children}
    </DashboardShell>
  );
}
