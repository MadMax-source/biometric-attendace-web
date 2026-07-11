"use client";

import { useAuth } from "@/lib/auth-context";
import { useLecturerDashboard } from "@/hook/useLecturerDashboard";
import { WelcomeHeader } from "@/components/lecturer-dashboard/wellcomeHeader";
import { DashboardStats } from "@/components/lecturer-dashboard/dashBoardStat";
import { TodayScheduleList } from "@/components/lecturer-dashboard/todayschedule";
import { CourseOverviewList } from "@/components/lecturer-dashboard/courseOverView";

export default function LecturerDashboard() {
  const { user, loading } = useAuth();
  const { courses, schedule, stats, isLoading } = useLecturerDashboard();
  if (loading || (isLoading && courses.length === 0)) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center animate-pulse space-y-2">
          <div className="size-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-7xl mx-auto">
      <WelcomeHeader lecturerName={user?.fullName || "Lecturer"} />
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
        <TodayScheduleList schedules={schedule} />
        <CourseOverviewList courses={courses} />
      </div>
    </div>
  );
}
