import { Users } from "lucide-react";

export function CourseHeader({
  code,
  title,
  enrolledCount,
}: {
  code: string;
  title: string;
  enrolledCount: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          {code}
        </h1>
        <p className="text-lg font-semibold text-slate-500 dark:text-slate-400 mt-1">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <Users className="size-4" /> {enrolledCount} Enrolled
        </span>
      </div>
    </div>
  );
}
