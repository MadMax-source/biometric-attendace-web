"use client";

import { useState } from "react";
import {
  BookOpen,
  CalendarCheck,
  Layers,
  Fingerprint,
  ScanFace,
  Loader2,
} from "lucide-react";
import { useStudentAttendance } from "@/hook/useAttendance";

// 1. Define an interface for the stats we will pass to the cards
interface DashboardStats {
  totalCourses: number;
  overallPercentage: number;
  totalClassesAttended: number;
  totalClassesHeld: number;
  monthPercentage: number;
  monthClassesAttended: number;
  monthTotalClasses: number;
}

export default function StudentDashboard() {
  // --- FETCH LIVE DATA ---
  const { courses, isLoading, isError } = useStudentAttendance();

  // NOTE: You will eventually want to fetch 'isEnrolled' from your user profile API.
  // For now, it is safely defaulted to false so the user sees the enrollment prompt.
  const [isEnrolled, setIsEnrolled] = useState(false);

  // --- HANDLE LOADING & ERROR STATES ---
  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 h-full items-center justify-center py-20">
        <Loader2 className="size-10 animate-spin text-purple-500" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-8 py-20 text-center">
        <p className="text-red-500 font-bold">Failed to load dashboard data.</p>
      </div>
    );
  }

  // --- CALCULATE LIVE METRICS ---
  const validCourses = Array.isArray(courses) ? courses : [];

  const totalCourses = validCourses.length;

  const totalClassesHeld = validCourses.reduce(
    (sum, c) => sum + (c.total || 0),
    0,
  );
  const totalClassesAttended = validCourses.reduce(
    (sum, c) => sum + (c.present || 0),
    0,
  );
  const overallPercentage =
    totalClassesHeld > 0
      ? Math.round((totalClassesAttended / totalClassesHeld) * 100)
      : 0;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const globalHistory = validCourses.flatMap((course: any) =>
    Array.isArray(course.history) ? course.history : [],
  );

  const thisMonthRecords = globalHistory.filter((record) => {
    const d = new Date(record.date);
    if (isNaN(d.getTime())) return false;
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthTotalClasses = thisMonthRecords.length;
  const monthClassesAttended = thisMonthRecords.filter(
    (r) => r.status === "present",
  ).length;
  const monthPercentage =
    monthTotalClasses > 0
      ? Math.round((monthClassesAttended / monthTotalClasses) * 100)
      : 0;

  // Package it all into a single object to pass to the cards
  const stats: DashboardStats = {
    totalCourses,
    overallPercentage,
    totalClassesAttended,
    totalClassesHeld,
    monthPercentage,
    monthClassesAttended,
    monthTotalClasses,
  };

  // --- RENDER DASHBOARD ---
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
          <StatCards stacked={false} stats={stats} />
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
            <StatCards stacked={true} stats={stats} />
          </div>
        </div>
      )}
    </div>
  );
}

// Chart Component Placeholder
function ChartCard() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-[20px] bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
        Attendance Chart Component
      </p>
    </div>
  );
}

// 2. Updated StatCards to accept the live 'stats' object
function StatCards({
  stacked,
  stats,
}: {
  stacked: boolean;
  stats: DashboardStats;
}) {
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
            {stats.overallPercentage}%
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            {stats.totalClassesAttended}/{stats.totalClassesHeld} Classes
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
            {stats.monthPercentage}%
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            {stats.monthClassesAttended}/{stats.monthTotalClasses} Classes
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
            {stats.totalCourses}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            This semester
          </p>
        </div>
      </div>
    </div>
  );
}
