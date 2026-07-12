import { CalendarDays, Download } from "lucide-react";

interface SessionControlsProps {
  sessions: any[];
  onExportSession: () => void;
}

export default function SessionControls({
  sessions,
  onExportSession,
}: SessionControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <CalendarDays className="size-5 text-slate-400" />
        <select className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer border-none ring-0">
          {sessions.map((session) => (
            <option key={session.id} value={session.id}>
              {session.date} ({session.time})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onExportSession}
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
      >
        <Download className="size-4" /> Export This Session
      </button>
    </div>
  );
}
