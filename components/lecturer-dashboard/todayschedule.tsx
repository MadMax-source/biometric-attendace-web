import Link from "next/link";
import { CalendarCheck, Radio, ArrowRight } from "lucide-react";
import { TodaySchedule } from "@/hook/useLecturerDashboard";

export function TodayScheduleList({
  schedules,
}: {
  schedules: TodaySchedule[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-[#0a1c3a] p-6 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
      <div className="flex items-center justify-between mb-4 border-b border-[#f2f2f2] dark:border-[#1a365d] pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-[#0a2f66] dark:text-white flex items-center gap-2">
            <CalendarCheck className="size-5 text-[#0a2f66] dark:text-white" />{" "}
            Today's Schedule
          </h2>
          <p className="text-xs font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
            Managed by your department admin.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {schedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-[#f2f2f2] dark:bg-[#041024] rounded-xl border border-dashed border-[#d9e3f6] dark:border-[#1a365d]">
            <CalendarCheck className="size-10 text-[#b2b2b2] dark:text-[#8ba3c7] mb-3" />
            <p className="text-sm font-semibold text-[#6b6b6b] dark:text-[#8ba3c7]">
              No official classes scheduled for today.
            </p>
          </div>
        ) : (
          schedules.map((s) => (
            <div
              key={s.id}
              className={`relative overflow-hidden group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-5 transition-all duration-300 ${
                s.is_active
                  ? "bg-[#f0f6ff] dark:bg-[#1a4b96]/20 border-[#0a2f66] dark:border-[#8ba3c7] shadow-[0_8px_30px_-5px_rgba(10,47,102,0.15)] ring-1 ring-[#0a2f66]/60 dark:ring-white/10"
                  : "bg-transparent border-[#f2f2f2] dark:border-[#1a365d] hover:bg-[#f2f2f2] dark:hover:bg-[#1a365d]/40"
              }`}
            >
              {s.is_active && (
                <div className="absolute top-0 left-0 w-1 h-full bg-[#0a2f66] dark:bg-white shadow-md"></div>
              )}

              <div className="pl-2">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-black text-xl tracking-tight text-[#0a2f66] dark:text-white">
                    {s.code}
                  </span>

                  {s.is_active && (
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold bg-[#0a2f66] dark:bg-white text-white dark:text-[#0a2f66] px-2.5 py-1 rounded-md animate-pulse">
                      <Radio className="size-3" /> SCANNING LIVE
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-[#262626] dark:text-white mb-1">
                  {s.title}
                </p>

                <p className="text-xs font-medium text-[#6b6b6b] dark:text-[#8ba3c7] flex items-center gap-2">
                  <span>
                    {s.start_time} - {s.end_time}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#b2b2b2] dark:bg-[#8ba3c7]"></span>
                  <span className="font-semibold text-[#6b6b6b] dark:text-[#8ba3c7]">
                    {s.venue}
                  </span>
                </p>
              </div>

              {s.is_active ? (
                <Link
                  href={`/lecturer/courses/${s.course_id}/attendance`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#0a2f66] dark:bg-[#1a4b96] px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#0a2f66]/90 active:scale-95 transition-all sm:self-auto self-start"
                >
                  <Radio className="size-4 animate-pulse" /> Live View
                </Link>
              ) : (
                <Link
                  href={`/lecturer/courses/${s.course_id}/attendance`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#f2f2f2] dark:bg-[#1a365d] px-4 py-2.5 text-sm font-bold text-[#0a2f66] dark:text-white hover:bg-[#d9e3f6] dark:hover:bg-[#1a365d]/80 transition-colors sm:self-auto self-start"
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
