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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white dark:bg-[#0a1c3a] p-4 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
      <div className="flex items-center gap-3">
        <CalendarDays className="size-5 text-[#b2b2b2] dark:text-[#8ba3c7]" />
        <select
          value={selectedSession}
          onChange={(e) => onSessionChange(e.target.value)}
          className="bg-transparent text-sm font-bold text-[#262626] dark:text-white focus:outline-none cursor-pointer border-none ring-0"
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
        className="flex items-center justify-center gap-2 rounded-lg border border-[#d9e3f6] dark:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024] px-4 py-2 text-sm font-bold text-[#262626] dark:text-white hover:bg-[#d9e3f6] dark:hover:bg-[#1a365d] transition-all active:scale-95 disabled:opacity-50"
      >
        <Download className="size-4" /> Export This Session
      </button>
    </div>
  );
}
