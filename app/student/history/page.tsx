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

  if (isLoading) {
    return (
      <div className="space-y-8 pb-20 relative">
        <PageHeader
          title="Overview & History"
          description="Loading your class logs..."
        />
        <div className="flex justify-center py-12">
          <p className="text-[#6b6b6b] dark:text-[#8ba3c7] font-medium animate-pulse">
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
            className="text-sm font-bold text-[#0a2f66] dark:text-white hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex items-start justify-between pr-4">
        <PageHeader
          title="Dashboard Overview"
          description="Your attendance statistics and recent class history."
        />
        <button
          onClick={() => refresh()}
          className="mt-2 p-2 text-[#b2b2b2] dark:text-[#8ba3c7] transition-colors hover:text-[#0a2f66] dark:hover:text-white"
          title="Refresh Data"
        >
          <RefreshCw className="size-5" />
        </button>
      </div>

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

      <Card className="border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] rounded-[20px] overflow-hidden mt-4">
        <CardHeader className="border-b border-[#f2f2f2] dark:border-[#1a365d] bg-[#f2f2f2]/50 dark:bg-[#041024]/50 pb-4">
          <CardTitle className="text-base font-bold text-[#0a2f66] dark:text-white flex items-center gap-2">
            <Calendar className="size-5 text-[#0a2f66] dark:text-white" />
            Global Class Log
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-[#f2f2f2] dark:divide-[#1a365d]">
            {globalHistory.length === 0 ? (
              <div className="p-10 text-center text-[#6b6b6b] dark:text-[#8ba3c7] text-sm font-medium">
                No attendance records found.
              </div>
            ) : (
              globalHistory.map((h) => (
                <div
                  key={h.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 transition-colors hover:bg-[#f2f2f2]/50 dark:hover:bg-[#1a365d]/40 gap-4 sm:gap-0"
                >
                  <div>
                    <p className="font-black text-lg text-[#0a2f66] dark:text-white leading-tight">
                      {h.courseCode}
                    </p>
                    <p className="text-xs font-semibold text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
                      {h.date} • {h.courseTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    {h.status === "present" ? (
                      <>
                        <Badge className="gap-1.5 bg-[#eafff0] text-green-700 hover:bg-[#d4fce1] dark:bg-[#1a365d] dark:text-green-400 border-none px-2.5 py-1">
                          <CheckCircle2 className="size-3.5" />
                          Present
                        </Badge>
                        {h.transactionHash && (
                          <button
                            onClick={() => setSelectedReceipt(h)}
                            className="flex items-center gap-1.5 rounded-lg bg-[#f7f2fe] dark:bg-[#1a4b96]/40 px-3 py-1.5 text-xs font-bold text-[#0a2f66] dark:text-white transition-all hover:bg-[#0a2f66] hover:text-white border border-[#d9e3f6] dark:border-[#1a365d]"
                          >
                            <Hexagon className="size-3.5" />
                            Receipt
                          </button>
                        )}
                      </>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="gap-1.5 bg-[#fff5eb] text-red-600 hover:bg-[#ffece0] dark:bg-[#041024] dark:text-red-400 border-none px-2.5 py-1"
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

      {selectedReceipt && (
        <BlockchainReceiptModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}
