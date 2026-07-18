import { CheckCircle2, XCircle } from "lucide-react";

interface AttendanceStatsProps {
  presentCount: number;
  absentCount: number;
}

export default function AttendanceStats({
  presentCount,
  absentCount,
}: AttendanceStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] p-5 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#eafff0] dark:bg-[#1a4b96]/40 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <p className="text-2xl font-black text-[#0a2f66] dark:text-white">
            {presentCount}
          </p>
          <p className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
            Present
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] p-5 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#fff5eb] dark:bg-[#1a365d] text-rose-600 dark:text-rose-400">
          <XCircle className="size-6" />
        </div>
        <div>
          <p className="text-2xl font-black text-[#0a2f66] dark:text-white">
            {absentCount}
          </p>
          <p className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
            Absent
          </p>
        </div>
      </div>
    </div>
  );
}
