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
          <h1 className="text-3xl font-black tracking-tight text-blue-950 dark:text-white drop-shadow-sm">
            Student Biometrics
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
            Manage enrollments.{" "}
            <span className="text-rose-600 font-bold">
              {totalPending} pending
            </span>{" "}
            captures.
          </p>
        </div>

        {/* Match the "Login" button style from your screenshot */}
        <Link
          href="/admin/students/register"
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-950 text-white font-bold shadow-md hover:bg-blue-900 transition-all duration-300 border border-transparent"
        >
          <Plus className="size-4" />
          Register Student
        </Link>
      </div>

      <div className="relative max-w-md group">
        <div className="relative flex items-center">
          <Search className="absolute left-4 size-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or matric number..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md text-sm font-bold text-blue-950 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950/50 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
