import Link from "next/link";
import { BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import { DashboardCourse } from "@/hook/useLecturerDashboard"; // Adjust path

export function CourseOverviewList({
  courses,
}: {
  courses: DashboardCourse[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="size-5 text-indigo-500" /> My Courses
        </h2>
        <Link
          href="/lecturer/courses"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center"
        >
          View all <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/lecturer/courses/${c.id}`}
            className="group flex items-center justify-between rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 p-4 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm"
          >
            <div>
              <p className="font-black text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {c.code}
              </p>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Level {c.level} • {c.enrolled_count} Students
              </p>
            </div>
            <div className="flex size-8 items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 shadow-sm transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
