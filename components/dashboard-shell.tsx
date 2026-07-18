"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Menu,
  Hexagon,
  X,
  Bell,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import type { Role } from "@/lib/mock-data";
import { PageTransition } from "@/components/page-transition";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; href: string; icon: LucideIcon };

export function DashboardShell({
  role,
  nav,
  children,
}: {
  role: Role;
  nav: NavItem[];
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/");
    else if (user.role !== role) router.replace(`/${user.role}`);
  }, [user, loading, role, router]);

  useEffect(() => setOpen(false), [pathname]);

  if (loading || !user || user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#a9c8f4] dark:bg-[#041024] text-sm text-[#0a2f66] dark:text-white">
        Loading...
      </div>
    );
  }

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <div className="min-h-screen bg-[#a9c8f4] dark:bg-[#041024] lg:grid lg:grid-cols-[260px_1fr] font-sans transition-colors duration-300">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[260px] -translate-x-full bg-white dark:bg-[#0a1c3a] text-[#0a2f66] dark:text-white transition-transform lg:static lg:translate-x-0 shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:shadow-none",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-32 flex-col items-center justify-center gap-2 relative">
          <button
            className="absolute right-4 top-4 p-1 lg:hidden text-[#b2b2b2] hover:text-[#0a2f66] dark:text-[#8ba3c7] dark:hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>

          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex items-center justify-center">
              <Hexagon className="size-10 stroke-[1.5px] text-[#0a2f66] dark:text-white" />
              <div className="absolute h-1 w-8 bg-[#d9e3f6] dark:bg-[#1a4b96] -z-10"></div>
            </div>
            <span className="text-2xl font-semibold tracking-wide text-[#0a2f66] dark:text-white">
              Attendice
            </span>
          </div>
        </div>

        <nav className="mt-4 flex flex-col">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-8 py-4 text-[15px] font-medium transition-all duration-200 border-l-4",
                  active
                    ? "bg-[#f2f2f2] dark:bg-[#1a4b96] text-[#0a2f66] dark:text-white border-[#0a2f66] dark:border-white"
                    : "text-[#b2b2b2] dark:text-[#8ba3c7] hover:bg-[#f2f2f2] dark:hover:bg-[#1a4b96]/50 hover:text-[#0a2f66] dark:hover:text-white border-transparent",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    active
                      ? "text-[#0a2f66] dark:text-white"
                      : "text-[#b2b2b2] dark:text-[#8ba3c7]",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-8 px-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/40 py-3 text-sm font-medium text-[#0a2f66] dark:text-white transition hover:bg-[#d9e3f6] dark:hover:bg-[#1a4b96]"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-[#041024]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex min-h-screen flex-col overflow-y-auto">
        <header className="sticky top-0 z-20 flex h-24 items-center justify-between px-6 lg:px-10 bg-[#a9c8f4]/90 dark:bg-[#041024]/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-[#0a2f66] dark:text-white"
            >
              <Menu className="size-6" />
            </button>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 ml-auto">
            <ThemeToggle />

            <button className="relative text-[#0a2f66] dark:text-[#8ba3c7] hover:text-[#0a2f66]/80 dark:hover:text-white transition-colors hidden sm:block">
              <Bell className="size-5" />
              <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-[#a9c8f4] dark:border-[#041024] bg-red-500"></span>
            </button>

            <Link
              href="/student/profile"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-[#1a4b96] text-[#0a2f66] dark:text-white shadow-sm border border-[#d9e3f6] dark:border-transparent">
                {user?.imageurl ? (
                  <img
                    src={user.imageurl}
                    alt="Profile"
                    className="size-full rounded-full object-cover"
                  />
                ) : (
                  <span className="font-semibold text-[#0a2f66] dark:text-white">
                    {user?.fullName.charAt(0)?.toUpperCase() || ""}
                  </span>
                )}
              </div>
              <div className="hidden flex-col sm:flex text-left">
                <span className="text-sm font-bold text-[#0a2f66] dark:text-white">
                  {user?.email}
                </span>
                <span className="text-[10px] font-semibold text-[#0a2f66]/70 dark:text-[#8ba3c7]">
                  {user?.matricNumber}
                </span>
              </div>
              <ChevronDown className="size-4 text-[#0a2f66]/60 dark:text-[#8ba3c7] hidden sm:block" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 pt-0">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
