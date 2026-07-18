"use client";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

interface StudentListHeaderProps {
  totalPending: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function StudentListHeader({
  totalPending,
  searchQuery,
  onSearchChange,
}: StudentListHeaderProps) {
  return (
    <div className="space-y-6 relative z-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#0a2f66] dark:text-white drop-shadow-sm">
            Student Biometrics
          </h1>
          <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
            Manage enrollments.{" "}
            <span className="text-[#e65a5a] font-bold">
              {totalPending} pending
            </span>{" "}
            captures.
          </p>
        </div>

        {/* Match the "Login" button style from your screenshot */}
        <Link
          href="/admin/students/register"
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a2f66] dark:bg-[#1a4b96] text-white font-bold shadow-[0_24px_80px_rgba(15,23,42,0.12)] hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 transition-all duration-300 border border-transparent"
        >
          <Plus className="size-4" />
          Register Student
        </Link>
      </div>

      <div className="relative max-w-md group">
        <div className="relative flex items-center">
          <Search className="absolute left-4 size-5 text-[#b2b2b2] dark:text-[#8ba3c7]" />
          <input
            type="text"
            placeholder="Search by name or matric number..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#d9e3f6] dark:border-[#1a365d] bg-white/70 dark:bg-[#0a1c3a]/50 backdrop-blur-md text-sm font-bold text-[#0a2f66] dark:text-white placeholder:text-[#b2b2b2] dark:placeholder:text-[#8ba3c7] focus:outline-none focus:ring-2 focus:ring-[#0a2f66]/50 dark:focus:ring-white/50 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
