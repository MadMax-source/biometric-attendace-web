"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Hexagon,
  Calendar,
  RefreshCw,
  BookOpen,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/widgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlockchainReceiptModal } from "@/components/blockchain";
import { useStudentAttendance } from "@/hook/useAttendance";

export default function HistoryPage() {
  const { courses, isLoading, isError, refresh } = useStudentAttendance();
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  // --- 1. HANDLE LOADING & ERRORS ---
  if (isLoading) {
    return (
      <div className="space-y-8 pb-20 relative">
        <PageHeader
          title="Overview & History"
          description="Loading your class logs..."
        />
        <div className="flex justify-center py-12">
          <p className="text-slate-500 animate-pulse font-medium">
            Fetching data...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8 pb-20 relative">
        <PageHeader title="Overview & History" />
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <p className="text-red-500 font-medium">
            Failed to load attendance history.
          </p>
          <button
            onClick={() => refresh()}
            className="text-sm font-bold text-[#5e3bce] hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- 2. DATA PROCESSING ---
  const validCourses = Array.isArray(courses) ? courses : [];

  const globalHistory = validCourses
    .flatMap((course: any) => {
      const history = Array.isArray(course.history) ? course.history : [];
      return history.map((record: any) => ({
        ...record,
        courseCode: course.code,
        courseTitle: course.title,
      }));
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // --- 3. DASHBOARD METRICS MATH ---
  const totalCourses = validCourses.length;

  // Overall calculations
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

  // This Month calculations
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter our global history for just this month's classes
  const thisMonthRecords = globalHistory.filter((record) => {
    const d = new Date(record.date);
    if (isNaN(d.getTime())) return false; // Safety check
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

  // --- 4. RENDER UI ---
  return (
    <div className="space-y-8 pb-20 relative">
      {/* HEADER */}
      <div className="flex items-start justify-between pr-4">
        <PageHeader
          title="Dashboard Overview"
          description="Your attendance statistics and recent class history."
        />
        <button
          onClick={() => refresh()}
          className="mt-2 p-2 text-slate-400 transition-colors hover:text-[#5e3bce] dark:hover:text-[#a98cfb]"
          title="Refresh Data"
        >
          <RefreshCw className="size-5" />
        </button>
      </div>

      {/* TOP-LEVEL STATS GRID (This is what was missing in your paste!) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Registered Courses"
          value={totalCourses}
          icon={BookOpen}
        />
        <StatCard
          label="Overall Attendance"
          value={`${overallPercentage}%`}
          icon={BarChart3}
        />
        <StatCard
          label="This Month"
          value={`${monthPercentage}%`}
          icon={TrendingUp}
        />
        <StatCard
          label="Classes Missed"
          value={totalClassesHeld - totalClassesAttended}
          icon={XCircle}
        />
      </div>

      {/* GLOBAL HISTORY LOG */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-[20px] overflow-hidden mt-4">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 pb-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="size-5 text-[#5e3bce] dark:text-[#a98cfb]" />
            Global Class Log
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {globalHistory.length === 0 ? (
              <div className="p-10 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                No attendance records found.
              </div>
            ) : (
              globalHistory.map((h) => (
                <div
                  key={h.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 gap-4 sm:gap-0"
                >
                  {/* Left Side: Course Info & Date */}
                  <div>
                    <p className="font-black text-lg text-slate-800 dark:text-slate-100 leading-tight">
                      {h.courseCode}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                      {h.date} • {h.courseTitle}
                    </p>
                  </div>

                  {/* Right Side: Badges & Buttons */}
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    {h.status === "present" ? (
                      <>
                        <Badge className="gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 border-none px-2.5 py-1">
                          <CheckCircle2 className="size-3.5" />
                          Present
                        </Badge>
                        {h.transactionHash && (
                          <button
                            onClick={() => setSelectedReceipt(h)}
                            className="flex items-center gap-1.5 rounded-lg bg-[#f7f2fe] dark:bg-purple-900/20 px-3 py-1.5 text-xs font-bold text-[#5e3bce] dark:text-[#a98cfb] transition-all hover:bg-[#5e3bce] hover:text-white dark:hover:bg-purple-800/40 dark:hover:text-purple-300 border border-purple-100 dark:border-purple-800/30"
                          >
                            <Hexagon className="size-3.5" />
                            Receipt
                          </button>
                        )}
                      </>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40 border-none px-2.5 py-1"
                      >
                        <XCircle className="size-3.5" />
                        Absent
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* RECEIPT MODAL */}
      {selectedReceipt && (
        <BlockchainReceiptModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}
