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
  const { courses, isLoading, isError } = useStudentAttendance();

  const [isEnrolled, setIsEnrolled] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 h-full items-center justify-center py-20">
        <Loader2 className="size-10 animate-spin text-[#0a2f66] dark:text-white" />
        <p className="text-[#0a2f66] dark:text-[#8ba3c7] font-medium animate-pulse">
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
        <h1 className="text-3xl font-extrabold text-[#0a2f66] dark:text-white">
          Dashboard
        </h1>
      </div>

      {isEnrolled ? (
        // ENROLLED STATE: Cards in a row, chart below
        <div className="flex flex-col gap-6">
          <StatCards stacked={false} stats={stats} />
          <ChartCard />
          <div className="mt-2 flex justify-end pr-4">
            <span className="text-[10px] font-bold tracking-widest text-[#b2b2b2] dark:text-[#8ba3c7]">
              BIOMETRIC ENROLLED
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            {/* PENDING ENROLLMENT CARD */}
            <div className="flex flex-col justify-between rounded-[20px] border border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:flex-row sm:items-center">
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
                <div className="flex gap-3 sm:flex-col">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96] text-[#0a2f66] dark:text-white shadow-sm">
                    <ScanFace size={20} />
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96] text-[#0a2f66] dark:text-white shadow-sm">
                    <Fingerprint size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#0a2f66] dark:text-[#8ba3c7]">
                    Biometric Enrollment
                  </p>
                  <h2 className="mb-1 mt-1 text-3xl font-black text-[#0a2f66] dark:text-white">
                    Pending
                  </h2>
                  <p className="max-w-[260px] text-sm leading-relaxed text-[#262626] dark:text-[#8ba3c7]">
                    Visit the Attendice Kiosk to complete your Biometric
                    Enrollment
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start sm:items-center gap-2 sm:mt-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0a2f66] dark:text-[#8ba3c7]">
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
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-[20px] bg-white dark:bg-[#0a1c3a] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-[#d9e3f6] dark:border-[#1a365d]">
      <p className="text-sm font-medium text-[#b2b2b2] dark:text-[#8ba3c7]">
        Attendance Chart Component
      </p>
    </div>
  );
}

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
      <div className="flex w-full items-center gap-5 rounded-[20px] bg-[#fff5eb] dark:bg-[#041024] p-6 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#0a1c3a] text-[#e65a5a] shadow-sm">
          <Layers className="size-6" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#262626] dark:text-white">
            Overall Attendance
          </p>
          <p className="text-2xl font-black text-[#e65a5a]">
            {stats.overallPercentage}%
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-[#b2b2b2] dark:text-[#8ba3c7]">
            {stats.totalClassesAttended}/{stats.totalClassesHeld} Classes
          </p>
        </div>
      </div>

      <div className="flex w-full items-center gap-5 rounded-[20px] bg-[#f0f6ff] dark:bg-[#041024] p-6 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#0a1c3a] text-[#5a8ce6] shadow-sm">
          <CalendarCheck className="size-6" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#262626] dark:text-white">
            Attendance this Month
          </p>
          <p className="text-2xl font-black text-[#5a8ce6]">
            {stats.monthPercentage}%
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-[#b2b2b2] dark:text-[#8ba3c7]">
            {stats.monthClassesAttended}/{stats.monthTotalClasses} Classes
          </p>
        </div>
      </div>

      <div className="flex w-full items-center gap-5 rounded-[20px] bg-[#eafff0] dark:bg-[#041024] p-6 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#0a1c3a] text-[#4ade80] shadow-sm">
          <BookOpen className="size-6" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#262626] dark:text-white">
            Course Registered
          </p>
          <p className="text-2xl font-black text-[#4ade80]">
            {stats.totalCourses}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-[#b2b2b2] dark:text-[#8ba3c7]">
            This semester
          </p>
        </div>
      </div>
    </div>
  );
}
