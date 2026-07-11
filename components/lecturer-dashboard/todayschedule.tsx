import Link from "next/link";
import { CalendarCheck, Radio, ArrowRight } from "lucide-react";
import { TodaySchedule } from "@/hook/useLecturerDashboard";

export function TodayScheduleList({
  schedules,
}: {
  schedules: TodaySchedule[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CalendarCheck className="size-5 text-indigo-500" /> Today's
            Schedule
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-1">
            Managed by your department admin.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {schedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <CalendarCheck className="size-10 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              No official classes scheduled for today.
            </p>
          </div>
        ) : (
          schedules.map((s) => (
            <div
              key={s.id}
              className={`relative overflow-hidden group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-5 transition-all duration-300 ${
                s.is_active
                  ? "bg-indigo-50/60 dark:bg-indigo-900/20 backdrop-blur-md border-indigo-200/80 dark:border-indigo-500/30 shadow-[0_8px_30px_-5px_rgba(99,102,241,0.15)] ring-1 ring-white/60 dark:ring-white/10"
                  : "bg-transparent border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              {s.is_active && (
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-md"></div>
              )}

              <div className="pl-2">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-black text-xl tracking-tight text-slate-800 dark:text-slate-100">
                    {s.code}
                  </span>

                  {s.is_active && (
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md animate-pulse">
                      <Radio className="size-3" /> SCANNING LIVE
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  {s.title}
                </p>

                <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
                  <span>
                    {s.start_time} - {s.end_time}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="font-semibold text-slate-500 dark:text-slate-300">
                    {s.venue}
                  </span>
                </p>
              </div>

              {s.is_active ? (
                <Link
                  href={`/lecturer/courses/${s.course_id}/attendance`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all sm:self-auto self-start"
                >
                  <Radio className="size-4 animate-pulse" /> Live View
                </Link>
              ) : (
                <Link
                  href={`/lecturer/courses/${s.course_id}/attendance`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sm:self-auto self-start"
                >
                  Prepare <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
