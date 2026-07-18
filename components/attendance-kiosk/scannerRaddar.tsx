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
    <div className="flex flex-col rounded-2xl bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-[#d9e3f6] dark:border-[#1a365d] overflow-hidden h-[500px]">
      <div className="p-4 border-b border-[#d9e3f6] dark:border-[#1a365d] flex items-center justify-between bg-[#f2f2f2]/50 dark:bg-[#041024]/50">
        <h2 className="text-sm font-extrabold text-[#0a2f66] dark:text-white flex items-center gap-2">
          <Radio className="size-4 text-[#0a2f66] dark:text-white" /> Unified
          Sensor Array
        </h2>
        <Badge
          variant="outline"
          className="text-[#0a2f66] dark:text-white bg-white dark:bg-[#1a4b96] border-[#d9e3f6] dark:border-transparent font-bold shadow-sm"
        >
          Face + Fingerprint
        </Badge>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="relative flex items-center justify-center mb-8">
          {phase === "listening" && (
            <>
              <div className="absolute size-64 rounded-full border border-[#0a2f66]/30 dark:border-white/20 animate-[ping_3s_ease-in-out_infinite]"></div>
              <div className="absolute size-48 rounded-full border border-[#0a2f66]/50 dark:border-white/30 animate-[ping_3s_ease-in-out_infinite_0.5s]"></div>
            </>
          )}

          <div
            className={`relative z-10 flex h-32 w-48 items-center justify-center gap-4 rounded-[2rem] border-4 transition-all duration-500 ${
              phase === "listening"
                ? "border-[#d9e3f6] dark:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024]/50 text-[#b2b2b2] dark:text-[#8ba3c7]"
                : phase === "processing_live"
                  ? "border-[#0a2f66] dark:border-white bg-[#f0f6ff] dark:bg-[#1a4b96]/20 text-[#0a2f66] dark:text-white shadow-[0_0_40px_-5px_rgba(10,47,102,0.4)]"
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
                <div className="h-12 w-0.5 bg-[#b2b2b2] dark:bg-[#1a365d]"></div>
                <ScanFace className="size-12" />
              </>
            )}
          </div>
        </div>

        <div className="h-24 flex flex-col items-center justify-center w-full max-w-sm text-center">
          {phase === "listening" && (
            <p className="text-sm font-bold text-[#6b6b6b] dark:text-[#8ba3c7] animate-pulse">
              Listening for dual-payload or offline buffer...
            </p>
          )}
          {phase === "processing_live" && (
            <p className="text-sm font-black text-[#0a2f66] dark:text-white tracking-wider uppercase">
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
              <p className="text-sm font-bold text-[#6b6b6b] dark:text-[#8ba3c7]">
                Processed fingerprint array.
              </p>
            </div>
          )}
          {phase === "matched" && lastMarked && (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300 space-y-2 w-full">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-700 uppercase tracking-wider mb-2">
                <UserCheck className="size-3.5" /> Identity Verified
              </div>
              <div className="bg-[#f2f2f2] dark:bg-[#041024] rounded-xl border border-[#d9e3f6] dark:border-[#1a365d] p-3 flex justify-between items-center text-left">
                <div>
                  <p className="text-lg font-black text-[#0a2f66] dark:text-white leading-none">
                    {lastMarked.name}
                  </p>
                  <p className="text-xs font-bold text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
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
