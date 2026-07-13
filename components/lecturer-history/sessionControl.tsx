import { CalendarDays, Download } from "lucide-react";

interface SessionControlsProps {
  sessions: string[];
  selectedSession: string;
  onSessionChange: (date: string) => void;
  onExportSession: () => void;
}

export default function SessionControls({
  sessions,
  selectedSession,
  onSessionChange,
  onExportSession,
}: SessionControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <CalendarDays className="size-5 text-slate-400" />
        <select
          value={selectedSession}
          onChange={(e) => onSessionChange(e.target.value)}
          className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer border-none ring-0"
        >
          {sessions.length === 0 ? (
            <option value="">No sessions available</option>
          ) : (
            sessions.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))
          )}
        </select>
      </div>

      <button
        onClick={onExportSession}
        disabled={!selectedSession}
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 disabled:opacity-50"
      >
        <Download className="size-4" /> Export This Session
      </button>
    </div>
  );
}
