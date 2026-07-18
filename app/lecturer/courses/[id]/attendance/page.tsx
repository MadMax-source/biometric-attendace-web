"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Radio, Loader2, AlertCircle } from "lucide-react";
import useSWR from "swr";

import BACKENDAPI from "@/API";
import { useLecturerDashboard } from "@/hook/useLecturerDashboard";

import { TelemetryStats } from "@/components/attendance-kiosk/telementry start";
import { ScannerRadar } from "@/components/attendance-kiosk/scannerRaddar";
import { SystemTerminal } from "@/components/attendance-kiosk/system Terminal";

type Phase =
  | "listening"
  | "processing_live"
  | "processing_offline"
  | "matched"
  | "sync_complete";

export default function TakeAttendancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const {
    courses,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useLecturerDashboard();
  const course = courses.find((c) => c.id === id);

  const { data: activeSessionData, error: sessionError } = useSWR(
    course ? `/active-session/${id}` : null,
    async (url) => {
      const res = await BACKENDAPI.get(url);
      return res.data;
    },
    { refreshInterval: 0 },
  );

  const sessionId = activeSessionData?.session?.id;

  const [present, setPresent] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("listening");
  const [lastMarked, setLastMarked] = useState<{
    name: string;
    matric: string;
    time: string;
  } | null>(null);

  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Initiating secure connection...",
  ]);

  function addLog(msg: string) {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev, `[${time}] ${msg}`]);
  }

  useEffect(() => {
    if (!sessionId || !course) return;

    addLog(`[SYSTEM] Awaiting live telemetry for ${course.code}...`);

    /* 
    
     i will use websockets to listen to the backend for live telemetry data. The backend will receive MQTT messages from the ESP32 and forward them to this frontend via WebSockets. This ensures that the frontend receives real-time updates without polling.
     
    /*
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/attendance/${sessionId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // LIVE SCAN EVENT
      if (data.type === "LIVE_SCAN") {
        setPhase("processing_live");
        addLog(`[MQTT] Payload received for matric: ${data.matric}`);
        
        setTimeout(() => {
           setPhase("matched");
           setLastMarked({
             name: data.student_name,
             matric: data.matric,
             time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
           });
           addLog(`[DATABASE] Match Confirmed: ${data.matric}`);
           setPresent(data.total_present);
           
           setTimeout(() => setPhase("listening"), 2000);
        }, 800);
      }

      // OFFLINE SYNC EVENT
      if (data.type === "OFFLINE_SYNC") {
        setPhase("processing_offline");
        addLog(`[MQTT] OFFLINE SYNC: Parsing ${data.count} records...`);
        
        setTimeout(() => {
           setPhase("sync_complete");
           setOfflineCount((prev) => prev + data.count);
           setPresent(data.total_present);
           addLog(`[DATABASE] Synced ${data.count} offline records.`);
           
           setTimeout(() => setPhase("listening"), 3000);
        }, 1500);
      }
    };

    return () => {
      ws.close();
      addLog("[SYSTEM] Connection closed.");
    };
    */
  }, [sessionId, course]);

  const isLoading = isDashboardLoading || (!sessionId && !sessionError);
  const isError =
    isDashboardError || sessionError || (!course && !isDashboardLoading);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="size-10 animate-spin text-[#0a2f66] dark:text-white" />
        <p className="text-sm font-semibold text-[#6b6b6b] dark:text-[#8ba3c7]">
          Initializing telemetry & securing connection...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto pt-10">
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-[#fff5eb] dark:bg-red-900/10 p-6 text-red-600 dark:text-red-400 shadow-sm">
          <AlertCircle className="size-6 shrink-0" />
          <div>
            <p className="font-bold">Telemetry connection failed</p>
            <p className="text-sm opacity-80 mt-1">
              Could not establish connection or find an active session. Please
              start the session first.
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/lecturer/courses/${id}`)}
          className="mt-6 flex items-center gap-2 text-sm font-bold text-[#b2b2b2] hover:text-[#0a2f66] dark:text-[#8ba3c7] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to session setup
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#d9e3f6] dark:border-[#1a365d]">
        <div>
          <button
            onClick={() => router.push(`/lecturer/courses/${course?.id}`)}
            className="flex items-center gap-2 text-sm font-bold text-[#b2b2b2] hover:text-[#0a2f66] dark:text-[#8ba3c7] dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="size-4" /> Terminate Monitoring
          </button>
          <h1 className="text-3xl font-extrabold text-[#0a2f66] dark:text-white flex items-center gap-3">
            {course?.code}
            <span className="flex items-center gap-1.5 text-[10px] font-black bg-[#d9e3f6] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white px-3 py-1 rounded-md uppercase">
              <Radio className="size-3 animate-pulse" /> Live Telemetry
            </span>
          </h1>
        </div>
      </div>

      <TelemetryStats
        present={present}
        enrolled={course?.enrolled_count || 0}
        offlineCount={offlineCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        <ScannerRadar phase={phase} lastMarked={lastMarked} />

        <SystemTerminal logs={logs} />
      </div>
    </div>
  );
}
