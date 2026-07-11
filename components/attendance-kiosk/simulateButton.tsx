import { Cpu, RefreshCw, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SimulationPanel({
  onLiveTap,
  onOfflineSync,
  isDisabled,
}: {
  onLiveTap: () => void;
  onOfflineSync: () => void;
  isDisabled: boolean;
}) {
  return (
    <div className="rounded-xl border border-dashed border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10 p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <Cpu className="size-4" /> Hardware Simulation Panel
          </p>
          <p className="text-xs font-medium text-orange-600/70 dark:text-orange-400/70 mt-1 max-w-md">
            Inject fake MQTT payloads to test how the UI handles hardware data.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={onOfflineSync}
            disabled={isDisabled}
            className="bg-white text-orange-700 border-2 border-orange-200 hover:bg-orange-100 font-bold w-full md:w-auto"
          >
            <RefreshCw className="size-4 mr-2" /> Simulate Offline Sync
          </Button>
          <Button
            onClick={onLiveTap}
            disabled={isDisabled}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md w-full md:w-auto shrink-0"
          >
            <Activity className="size-4 mr-2" /> Live Dual-Tap
          </Button>
        </div>
      </div>
    </div>
  );
}
