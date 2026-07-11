import { CalendarClock, MapPin, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SessionFormState = {
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
};

export function SessionSetupForm({
  form,
  onUpdate,
  onStart,
  isStarting,
}: {
  form: SessionFormState;
  onUpdate: (key: keyof SessionFormState, value: string) => void;
  onStart: () => void;
  isStarting: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-[0_2px_15px_-3px_rgba(6,81,237,0.08)] border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
          <CalendarClock className="size-4" />
        </div>
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
          Initialize Biometric Session
        </h2>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Date
            </Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => onUpdate("date", e.target.value)}
              className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 focus-visible:ring-indigo-500 font-semibold cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Venue
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                type="text"
                value={form.venue}
                onChange={(e) => onUpdate("venue", e.target.value)}
                className="h-12 pl-10 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 focus-visible:ring-indigo-500 font-semibold"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Start Time
            </Label>
            <Input
              type="time"
              value={form.startTime}
              onChange={(e) => onUpdate("startTime", e.target.value)}
              className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 focus-visible:ring-indigo-500 font-semibold cursor-pointer w-full"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              End Time
            </Label>
            <Input
              type="time"
              value={form.endTime}
              onChange={(e) => onUpdate("endTime", e.target.value)}
              className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 focus-visible:ring-indigo-500 font-semibold cursor-pointer w-full"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button
            onClick={onStart}
            disabled={isStarting}
            className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm"
          >
            {isStarting ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" /> Starting
                Session...
              </>
            ) : (
              <>
                <Play className="size-4 mr-2" /> Start Attendance Session
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
