import { FileSpreadsheet, Download } from "lucide-react";

interface SemesterOverviewCardProps {
  totalSessions: number;
  totalStudents: number;
  onExportMaster: () => void;
}

export default function SemesterOverviewCard({
  totalSessions,
  totalStudents,
  onExportMaster,
}: SemesterOverviewCardProps) {
  return (
    <div className="rounded-2xl border border-[#d9e3f6] dark:border-[#1a365d] bg-[#f0f6ff] dark:bg-[#1a4b96]/20 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h2 className="text-lg font-bold text-[#0a2f66] dark:text-white flex items-center gap-2">
          <FileSpreadsheet className="size-5 text-[#0a2f66] dark:text-white" />
          Semester Overview
        </h2>
        <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
          {totalSessions} total sessions conducted. {totalStudents} students
          enrolled.
        </p>
      </div>

      <button
        onClick={onExportMaster}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#0a2f66] dark:bg-[#1a4b96] px-5 py-3 text-sm font-bold text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 transition-all active:scale-95 whitespace-nowrap"
      >
        <Download className="size-4" /> Full Semester CSV
      </button>
    </div>
  );
}
