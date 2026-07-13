import {
  BookOpen,
  CalendarCheck,
  Users,
  Radio,
  Fingerprint,
} from "lucide-react";

type StatsProps = {
  totalCourses: number;
  todayClasses: number;
  totalStudents: number;
  activeScanners: number;
};

export function DashboardStats({ stats }: { stats: StatsProps }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Stat 1: Assigned Courses */}
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-blue-600">
          <BookOpen className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
          <BookOpen className="size-5" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Assigned Courses
        </p>
        <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">
          {stats.totalCourses}
        </p>
      </div>

      {/* Stat 2: Today's Sessions */}
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-orange-500">
          <CalendarCheck className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400 mb-4">
          <CalendarCheck className="size-5" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Today's Sessions
        </p>
        <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">
          {stats.todayClasses}
        </p>
      </div>

      {/* Stat 3: Total Students */}
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-emerald-500">
          <Users className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
          <Users className="size-5" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Total Students
        </p>
        <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">
          {stats.totalStudents}
        </p>
      </div>

      {/* Stat Active Scanners (Hardware Themed) */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-5 shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-white">
          <Fingerprint className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 text-white mb-4 backdrop-blur-sm">
          <Radio className="size-5" />
        </div>
        <p className="text-xs font-bold text-indigo-100 uppercase tracking-wider">
          Active Scanners
        </p>
        <p className="text-3xl font-black text-white mt-1">
          {stats.activeScanners}
        </p>
      </div>
    </div>
  );
}
