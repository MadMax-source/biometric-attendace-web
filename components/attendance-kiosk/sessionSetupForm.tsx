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
    <div className="rounded-2xl bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-[#d9e3f6] dark:border-[#1a365d] overflow-hidden">
      <div className="bg-[#f2f2f2]/50 dark:bg-[#041024]/50 p-5 border-b border-[#d9e3f6] dark:border-[#1a365d] flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-[#d9e3f6] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white">
          <CalendarClock className="size-4" />
        </div>
        <h2 className="text-base font-extrabold text-[#0a2f66] dark:text-white">
          Initialize Biometric Session
        </h2>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
              Date
            </Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => onUpdate("date", e.target.value)}
              className="h-12 rounded-xl bg-[#f2f2f2] dark:bg-[#041024] border-[#d9e3f6] dark:border-[#1a365d] focus-visible:ring-[#0a2f66] dark:focus-visible:ring-white font-semibold cursor-pointer text-[#262626] dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
              Venue
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#b2b2b2] dark:text-[#8ba3c7]" />
              <Input
                type="text"
                value={form.venue}
                onChange={(e) => onUpdate("venue", e.target.value)}
                className="h-12 pl-10 rounded-xl bg-[#f2f2f2] dark:bg-[#041024] border-[#d9e3f6] dark:border-[#1a365d] focus-visible:ring-[#0a2f66] dark:focus-visible:ring-white font-semibold text-[#262626] dark:text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
              Start Time
            </Label>
            <Input
              type="time"
              value={form.startTime}
              onChange={(e) => onUpdate("startTime", e.target.value)}
              className="h-12 rounded-xl bg-[#f2f2f2] dark:bg-[#041024] border-[#d9e3f6] dark:border-[#1a365d] focus-visible:ring-[#0a2f66] dark:focus-visible:ring-white font-semibold cursor-pointer w-full text-[#262626] dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-wider">
              End Time
            </Label>
            <Input
              type="time"
              value={form.endTime}
              onChange={(e) => onUpdate("endTime", e.target.value)}
              className="h-12 rounded-xl bg-[#f2f2f2] dark:bg-[#041024] border-[#d9e3f6] dark:border-[#1a365d] focus-visible:ring-[#0a2f66] dark:focus-visible:ring-white font-semibold cursor-pointer w-full text-[#262626] dark:text-white"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#d9e3f6] dark:border-[#1a365d] flex justify-end">
          <Button
            onClick={onStart}
            disabled={isStarting}
            className="h-12 px-8 rounded-xl bg-[#0a2f66] dark:bg-[#1a4b96] hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 text-white font-bold shadow-[0_24px_80px_rgba(15,23,42,0.12)] transition-all w-full sm:w-auto text-sm"
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
