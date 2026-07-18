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
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#0a1c3a] p-5 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d] hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-[#0a2f66]">
          <BookOpen className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white mb-4">
          <BookOpen className="size-5" />
        </div>
        <p className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
          Assigned Courses
        </p>
        <p className="text-3xl font-black text-[#0a2f66] dark:text-white mt-1">
          {stats.totalCourses}
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#0a1c3a] p-5 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d] hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-[#5a8ce6]">
          <CalendarCheck className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#5a8ce6] dark:text-[#8ba3c7] mb-4">
          <CalendarCheck className="size-5" />
        </div>
        <p className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
          Today's Sessions
        </p>
        <p className="text-3xl font-black text-[#0a2f66] dark:text-white mt-1">
          {stats.todayClasses}
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#0a1c3a] p-5 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d] hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-[#4ade80]">
          <Users className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#4ade80] dark:text-white mb-4">
          <Users className="size-5" />
        </div>
        <p className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
          Total Students
        </p>
        <p className="text-3xl font-black text-[#0a2f66] dark:text-white mt-1">
          {stats.totalStudents}
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-2xl bg-[#0a2f66] dark:bg-[#1a4b96] p-5 shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500 text-white">
          <Fingerprint className="size-16" />
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 text-white mb-4 backdrop-blur-sm">
          <Radio className="size-5" />
        </div>
        <p className="text-xs font-bold text-[#d9e3f6] uppercase tracking-wider">
          Active Scanners
        </p>
        <p className="text-3xl font-black text-white mt-1">
          {stats.activeScanners}
        </p>
      </div>
    </div>
  );
}
