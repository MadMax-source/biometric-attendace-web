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
    <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileSpreadsheet className="size-5 text-indigo-600 dark:text-indigo-400" />
          Semester Overview
        </h2>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          {totalSessions} total sessions conducted. {totalStudents} students
          enrolled.
        </p>
      </div>

      <button
        onClick={onExportMaster}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#16085a] px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#5e3bce] transition-all active:scale-95 whitespace-nowrap"
      >
        <Download className="size-4" /> Full Semester CSV
      </button>
    </div>
  );
}
