import { Activity, Users, Cpu, Database } from "lucide-react";

export function TelemetryStats({
  present,
  enrolled,
  offlineCount,
}: {
  present: number;
  enrolled: number;
  offlineCount: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-4">
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Activity className="size-3.5 text-indigo-500" /> Present
        </p>
        <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
          {present}
        </p>
      </div>
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Users className="size-3.5 text-slate-500" /> Enrolled
        </p>
        <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
          {enrolled}
        </p>
      </div>
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Cpu className="size-3.5 text-slate-500" /> Hardware Node
        </p>
        <p className="text-lg font-black text-slate-700 dark:text-slate-300 mt-2">
          ESP32-Dual-Kiosk
        </p>
      </div>
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Database className="size-3.5 text-slate-500" /> Offline Syncs
        </p>
        <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-2">
          {offlineCount} Records
        </p>
      </div>
    </div>
  );
}
