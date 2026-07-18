import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export function SystemTerminal({ logs }: { logs: string[] }) {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex flex-col rounded-2xl bg-[#020812] border border-[#1a365d] overflow-hidden h-[500px] shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      <div className="p-3 border-b border-[#1a365d] flex items-center gap-2 bg-[#041024]">
        <Terminal className="size-4 text-[#8ba3c7]" />
        <h2 className="text-xs font-bold text-[#a9c8f4] font-mono">
          system_logs.sh
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#b2b2b2]">
        {logs.map((log, i) => (
          <div
            key={i}
            className={`mb-1 ${
              log.includes("DUAL-PAYLOAD")
                ? "text-[#a9c8f4]"
                : log.includes("OFFLINE SYNC")
                  ? "text-orange-400 font-bold"
                  : log.includes("[MQTT]")
                    ? "text-amber-400"
                    : log.includes("[DATABASE]")
                      ? "text-emerald-400"
                      : "text-[#8ba3c7]"
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
