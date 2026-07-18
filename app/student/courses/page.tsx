"use client";

import Link from "next/link";
import { ChevronRight, BookOpen, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/widgets";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStudentAttendance } from "@/hook/useAttendance";

export type AttendanceStatus = "present" | "absent";
export interface AttendanceRecord {
  id: string;
  date: string;
  status: AttendanceStatus;
  transactionHash?: string;
  biometricHash?: string;
}
export interface StudentCourse {
  id: string;
  code: string;
  title: string;
  present: number;
  total: number;
  history: AttendanceRecord[];
}

export default function StudentCoursesPage() {
  const { courses, isLoading, isError, refresh } = useStudentAttendance();

  if (isLoading) {
    return (
      <div className="space-y-6 pb-20">
        <PageHeader
          title="My Courses"
          description="Loading your enrolled courses..."
        />
        <div className="flex justify-center py-12">
          <p className="text-[#6b6b6b] dark:text-[#8ba3c7] font-medium animate-pulse">
            Fetching courses...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 pb-20">
        <PageHeader
          title="My Courses"
          description="Courses you are enrolled in this semester."
        />
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <p className="text-red-500 font-medium">{isError.message}</p>
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

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-start justify-between pr-4">
        <PageHeader
          title="My Courses"
          description="Courses you are enrolled in this semester."
        />
        <button
          onClick={() => refresh()}
          className="mt-2 p-2 text-[#b2b2b2] dark:text-[#8ba3c7] transition-colors hover:text-[#0a2f66] dark:hover:text-white"
        >
          <RefreshCw className="size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {!courses || courses.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed rounded-xl border-[#d9e3f6] dark:border-[#1a365d]">
            <p className="text-[#6b6b6b] dark:text-[#8ba3c7]">
              You are not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          courses.map((c: StudentCourse) => {
            const pct =
              c.total > 0 ? Math.round((c.present / c.total) * 100) : 0;

            return (
              <Link
                key={c.id}
                href={`/student/courses/${c.id}`}
                className="group block"
              >
                <Card className="rounded-[20px] border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-sm transition-all duration-200 hover:border-[#0a2f66] dark:hover:border-[#8ba3c7]">
                  <CardContent className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6">
                    <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white">
                      <BookOpen className="size-6" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                        <div>
                          <p className="text-lg font-black text-[#0a2f66] dark:text-white leading-tight">
                            {c.code}
                          </p>
                          <p className="truncate text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-0.5">
                            {c.title}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#b2b2b2] dark:text-[#8ba3c7]">
                            {c.present} / {c.total}
                          </span>
                          <span
                            className={`text-sm font-black ${pct >= 75 ? "text-green-600 dark:text-green-400" : "text-orange-500 dark:text-orange-400"}`}
                          >
                            {pct}%
                          </span>
                        </div>
                      </div>

                      <Progress
                        value={pct}
                        className="h-2 [&_[data-slot=progress-track]]:bg-[#f2f2f2] dark:[&_[data-slot=progress-track]]:bg-[#1a365d] [&_[data-slot=progress-indicator]]:bg-[#0a2f66] dark:[&_[data-slot=progress-indicator]]:bg-white"
                      />
                    </div>

                    <ChevronRight className="size-5 shrink-0 text-[#b2b2b2] dark:text-[#8ba3c7] transition-transform group-hover:translate-x-1 group-hover:text-[#0a2f66] dark:group-hover:text-white" />
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
