import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export function SystemTerminal({ logs }: { logs: string[] }) {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex flex-col rounded-2xl bg-[#0d1117] border border-slate-800 overflow-hidden h-[500px] shadow-lg">
      <div className="p-3 border-b border-slate-800 flex items-center gap-2 bg-[#161b22]">
        <Terminal className="size-4 text-slate-400" />
        <h2 className="text-xs font-bold text-slate-300 font-mono">
          system_logs.sh
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300">
        {logs.map((log, i) => (
          <div
            key={i}
            className={`mb-1 ${
              log.includes("DUAL-PAYLOAD")
                ? "text-indigo-400"
                : log.includes("OFFLINE SYNC")
                  ? "text-orange-400 font-bold"
                  : log.includes("[MQTT]")
                    ? "text-amber-400"
                    : log.includes("[DATABASE]")
                      ? "text-emerald-400"
                      : "text-slate-400"
            }`}
          >
            {log}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
