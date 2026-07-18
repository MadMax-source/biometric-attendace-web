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
      <div className="rounded-2xl bg-white dark:bg-[#0a1c3a] p-5 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
        <p className="text-[11px] font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Activity className="size-3.5 text-[#0a2f66] dark:text-white" />{" "}
          Present
        </p>
        <p className="text-3xl font-black text-[#0a2f66] dark:text-white">
          {present}
        </p>
      </div>
      <div className="rounded-2xl bg-white dark:bg-[#0a1c3a] p-5 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
        <p className="text-[11px] font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Users className="size-3.5 text-[#6b6b6b] dark:text-[#8ba3c7]" />{" "}
          Enrolled
        </p>
        <p className="text-3xl font-black text-[#0a2f66] dark:text-white">
          {enrolled}
        </p>
      </div>
      <div className="rounded-2xl bg-white dark:bg-[#0a1c3a] p-5 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
        <p className="text-[11px] font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Cpu className="size-3.5 text-[#6b6b6b] dark:text-[#8ba3c7]" />{" "}
          Hardware Node
        </p>
        <p className="text-lg font-black text-[#262626] dark:text-[#8ba3c7] mt-2">
          ESP32-Dual-Kiosk
        </p>
      </div>
      <div className="rounded-2xl bg-white dark:bg-[#0a1c3a] p-5 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
        <p className="text-[11px] font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Database className="size-3.5 text-[#6b6b6b] dark:text-[#8ba3c7]" />{" "}
          Offline Syncs
        </p>
        <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-2">
          {offlineCount} Records
        </p>
      </div>
    </div>
  );
}
