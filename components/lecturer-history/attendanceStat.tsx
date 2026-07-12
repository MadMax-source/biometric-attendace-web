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
      <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {presentCount}
          </p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Present
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600">
          <XCircle className="size-6" />
        </div>
        <div>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {absentCount}
          </p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Absent
          </p>
        </div>
      </div>
    </div>
  );
}
