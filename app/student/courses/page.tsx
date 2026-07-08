"use client";

import Link from "next/link";
import { ChevronRight, BookOpen, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/widgets";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStudentAttendance } from "@/hook/useAttendance";

// Keep your interfaces
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
  // 1. Fetch live data using your hook
  const { courses, isLoading, isError, refresh } = useStudentAttendance();

  // 2. Handle Loading
  if (isLoading) {
    return (
      <div className="space-y-6 pb-20">
        <PageHeader
          title="My Courses"
          description="Loading your enrolled courses..."
        />
        <div className="flex justify-center py-12">
          <p className="text-slate-500 font-medium animate-pulse">
            Fetching courses...
          </p>
        </div>
      </div>
    );
  }

  // 3. Handle Errors
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
            className="text-sm font-bold text-[#5e3bce] hover:underline"
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
          className="mt-2 p-2 text-slate-400 transition-colors hover:text-[#5e3bce] dark:hover:text-[#a98cfb]"
        >
          <RefreshCw className="size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* 4. Handle Empty Data */}
        {!courses || courses.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">
              You are not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          /* 5. Map over live data */
          courses.map((c: StudentCourse) => {
            // Prevent NaN if total is 0
            const pct =
              c.total > 0 ? Math.round((c.present / c.total) * 100) : 0;

            return (
              <Link
                key={c.id}
                href={`/student/courses/${c.id}`}
                className="group block"
              >
                <Card className="rounded-[20px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:border-[#5e3bce]/40 hover:shadow-md dark:hover:border-[#a98cfb]/40">
                  <CardContent className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6">
                    <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f6ff] dark:bg-blue-950/30 text-[#5a8ce6]">
                      <BookOpen className="size-6" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                        <div>
                          <p className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">
                            {c.code}
                          </p>
                          <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                            {c.title}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                        className="h-2 bg-slate-100 dark:bg-slate-800"
                      />
                    </div>

                    <ChevronRight className="size-5 shrink-0 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-[#5e3bce] dark:group-hover:text-[#a98cfb]" />
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
