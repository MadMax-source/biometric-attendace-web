import {
  CheckCircle2,
  Fingerprint,
  Loader2,
  ScanFace,
  UserCheck,
  Radio,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Phase =
  | "listening"
  | "processing_live"
  | "processing_offline"
  | "matched"
  | "sync_complete";
type LastMarked = { name: string; matric: string; time: string } | null;

export function ScannerRadar({
  phase,
  lastMarked,
}: {
  phase: Phase;
  lastMarked: LastMarked;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(6,81,237,0.08)] border border-slate-100 dark:border-slate-800 overflow-hidden h-[500px]">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
        <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Radio className="size-4 text-indigo-500" /> Unified Sensor Array
        </h2>
        <Badge
          variant="outline"
          className="text-indigo-600 bg-white font-bold shadow-sm"
        >
          Face + Fingerprint
        </Badge>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="relative flex items-center justify-center mb-8">
          {phase === "listening" && (
            <>
              <div className="absolute size-64 rounded-full border border-indigo-200 dark:border-indigo-900/50 animate-[ping_3s_ease-in-out_infinite]"></div>
              <div className="absolute size-48 rounded-full border border-indigo-300 dark:border-indigo-800/50 animate-[ping_3s_ease-in-out_infinite_0.5s]"></div>
            </>
          )}

          <div
            className={`relative z-10 flex h-32 w-48 items-center justify-center gap-4 rounded-[2rem] border-4 transition-all duration-500 ${
              phase === "listening"
                ? "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-400"
                : phase === "processing_live"
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 shadow-[0_0_40px_-5px_rgba(79,70,229,0.4)]"
                  : phase === "processing_offline"
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600 shadow-[0_0_40px_-5px_rgba(249,115,22,0.4)]"
                    : "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 shadow-[0_0_40px_-5px_rgba(16,185,129,0.3)] scale-105"
            }`}
          >
            {phase === "processing_live" || phase === "processing_offline" ? (
              <Loader2 className="size-12 animate-spin" />
            ) : phase === "matched" || phase === "sync_complete" ? (
              <CheckCircle2 className="size-16" />
            ) : (
              <>
                <Fingerprint className="size-12" />
                <div className="h-12 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
                <ScanFace className="size-12" />
              </>
            )}
          </div>
        </div>

        <div className="h-24 flex flex-col items-center justify-center w-full max-w-sm text-center">
          {phase === "listening" && (
            <p className="text-sm font-bold text-slate-500 animate-pulse">
              Listening for dual-payload or offline buffer...
            </p>
          )}
          {phase === "processing_live" && (
            <p className="text-sm font-black text-indigo-600 tracking-wider uppercase">
              Validating Dual Signature...
            </p>
          )}
          {phase === "processing_offline" && (
            <p className="text-sm font-black text-orange-600 tracking-wider uppercase animate-pulse">
              Unpacking Offline Buffer...
            </p>
          )}
          {phase === "sync_complete" && (
            <div className="animate-in zoom-in duration-300">
              <p className="text-lg font-black text-emerald-600">
                Batch Sync Successful!
              </p>
              <p className="text-sm font-bold text-slate-500">
                Processed fingerprint array.
              </p>
            </div>
          )}
          {phase === "matched" && lastMarked && (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300 space-y-2 w-full">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-700 uppercase tracking-wider mb-2">
                <UserCheck className="size-3.5" /> Identity Verified
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 flex justify-between items-center text-left">
                <div>
                  <p className="text-lg font-black text-slate-800 leading-none">
                    {lastMarked.name}
                  </p>
                  <p className="text-xs font-bold text-slate-500 mt-1">
                    {lastMarked.matric}
                  </p>
                </div>
                <p className="text-xs font-black text-emerald-600">
                  {lastMarked.time}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
