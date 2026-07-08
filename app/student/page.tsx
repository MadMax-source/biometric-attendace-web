"use client";

import { useState } from "react";
import {
  BookOpen,
  CalendarCheck,
  Layers,
  Fingerprint,
  ScanFace,
} from "lucide-react";

const STUDENT = {
  courses: 5,
  attendedMonth: 0,
  percentage: 0,
  missed: 0,
  isEnrolled: false,
};

export default function StudentDashboard() {
  const [isEnrolled, setIsEnrolled] = useState(STUDENT.isEnrolled);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#2d2e32] dark:text-slate-100">
          Dashboard
        </h1>
      </div>
      {isEnrolled ? (
        // ENROLLED STATE: Cards in a row, chart below
        <div className="flex flex-col gap-6">
          <StatCards stacked={false} />
          <ChartCard />
          <div className="mt-2 flex justify-end pr-4">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-600">
              BIOMETRIC ENROLLED
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            {/* PENDING ENROLLMENT CARD */}
            <div className="flex flex-col justify-between rounded-[20px] border border-purple-100 dark:border-purple-900/50 bg-[#f7f2fe] dark:bg-purple-950/20 p-6 shadow-sm sm:flex-row sm:items-center">
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
                <div className="flex gap-3 sm:flex-col">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm">
                    <ScanFace size={20} />
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm">
                    <Fingerprint size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">
                    Biometric Enrollment
                  </p>
                  <h2 className="mb-1 mt-1 text-3xl font-black text-purple-900 dark:text-purple-100">
                    Pending
                  </h2>
                  <p className="max-w-[260px] text-sm leading-relaxed text-purple-700/80 dark:text-purple-300/80">
                    Visit the Attendice Kiosk to complete your Biometric
                    Enrollment
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start sm:items-center gap-2 sm:mt-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">
                  Scan at this kiosk
                </span>
              </div>
            </div>

            <ChartCard />
          </div>

          {/* Right Column: Stacked Stats */}
          <div className="flex flex-col gap-4">
            <StatCards stacked={true} />
          </div>
        </div>
      )}
    </div>
  );
}

// i will add a chart component here, by using react-chartjs-2 or any other chart library, but for now, I will just add a placeholder div with a message "Attendance Chart Component"
function ChartCard() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-[20px] bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
        Attendance Chart Component
      </p>
    </div>
  );
}

// Stats extracted and accept a 'stacked' prop to control their layout
function StatCards({ stacked }: { stacked: boolean }) {
  return (
    <div
      className={`flex w-full ${stacked ? "flex-col gap-4" : "flex-col xl:flex-row gap-4 xl:gap-6"}`}
    >
      <div className="flex w-full items-center gap-5 rounded-[20px] bg-[#fff5eb] dark:bg-orange-950/20 p-6 shadow-sm border border-orange-50 dark:border-orange-900/30">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-[#e65a5a] dark:text-red-400 shadow-sm">
          <Layers className="size-6" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Overall Attendance
          </p>
          <p className="text-2xl font-black text-[#e65a5a] dark:text-red-400">
            {STUDENT.percentage}%
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            0/9 Classes
          </p>
        </div>
      </div>

      <div className="flex w-full items-center gap-5 rounded-[20px] bg-[#f0f6ff] dark:bg-blue-950/20 p-6 shadow-sm border border-blue-50 dark:border-blue-900/30">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-[#5a8ce6] dark:text-blue-400 shadow-sm">
          <CalendarCheck className="size-6" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Attendance this Month
          </p>
          <p className="text-2xl font-black text-[#5a8ce6] dark:text-blue-400">
            {STUDENT.attendedMonth}%
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            0/3 Classes
          </p>
        </div>
      </div>

      <div className="flex w-full items-center gap-5 rounded-[20px] bg-[#eafff0] dark:bg-green-950/20 p-6 shadow-sm border border-green-50 dark:border-green-900/30">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-[#4ade80] dark:text-green-400 shadow-sm">
          <BookOpen className="size-6" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Course Registered
          </p>
          <p className="text-2xl font-black text-[#4ade80] dark:text-green-400">
            {STUDENT.courses}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            This semester
          </p>
        </div>
      </div>
    </div>
  );
}
