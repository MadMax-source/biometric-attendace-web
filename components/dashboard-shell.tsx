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
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <div className="min-h-screen bg-[#edf3fa] dark:bg-slate-950 lg:grid lg:grid-cols-[260px_1fr] font-sans transition-colors duration-300">
      {/* SIDEBAR */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[260px] -translate-x-full bg-[#5e3bce] dark:bg-[#3d248c] text-white transition-transform lg:static lg:translate-x-0 shadow-xl lg:shadow-none",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-32 flex-col items-center justify-center gap-2 relative">
          <button
            className="absolute right-4 top-4 p-1 lg:hidden text-white/70 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>

          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex items-center justify-center">
              <Hexagon className="size-10 stroke-[1.5px]" />
              <div className="absolute h-1 w-8 bg-white/20 -z-10"></div>
            </div>
            <span className="text-2xl font-semibold tracking-wide">
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
                  "flex items-center gap-4 px-8 py-4 text-[15px] font-medium transition-all duration-200",
                  active
                    ? "bg-[#16085a] dark:bg-black/40 text-white border-l-4 border-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    active ? "text-white" : "text-white/70",
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
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white/10 py-3 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex min-h-screen flex-col overflow-y-auto">
        {/* GLOBAL TOP HEADER */}
        <header className="sticky top-0 z-20 flex h-24 items-center justify-between px-6 lg:px-10 bg-[#edf3fa]/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-slate-700 dark:text-slate-300"
            >
              <Menu className="size-6" />
            </button>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 ml-auto">
            <ThemeToggle />

            <button className="relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hidden sm:block">
              <Bell className="size-5" />
              <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-[#edf3fa] dark:border-slate-950 bg-red-500"></span>
            </button>

            {/* Clickable Profile Area mapped to the user's specific data */}
            <Link
              href="/student/profile"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-300">
                {user?.imageurl ? (
                  <img
                    src={user.imageurl}
                    alt="Profile"
                    className="size-full rounded-full object-cover"
                  />
                ) : (
                  <span className="font-semibold">
                    {user?.fullName.charAt(0)?.toUpperCase() || ""}
                  </span>
                )}
              </div>
              <div className="hidden flex-col sm:flex text-left">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {user?.email}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {user?.matricNumber}
                </span>
              </div>
              <ChevronDown className="size-4 text-slate-400 hidden sm:block" />
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
