"use client";

import Link from "next/link";
import { useLecturerDashboard } from "@/hook/useLecturerDashboard";
import {
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
  Loader2,
  AlertCircle,
  Radio,
} from "lucide-react";

interface Course {
  id: string;
  code: string;
  title: string;
  level: number;
  enrolled_count: number;
  is_active?: boolean;
  active_session_id?: string | null;
}

export default function LecturerCoursesPage() {
  const { courses, isError, isLoading } = useLecturerDashboard();

  const myCourses: Course[] = courses || [];

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="size-10 animate-spin text-[#0a2f66] dark:text-white" />
        <p className="text-sm font-semibold text-[#6b6b6b] dark:text-[#8ba3c7] animate-pulse">
          Loading your courses...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[40vh] w-full flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400 shadow-sm">
          <AlertCircle className="size-6 shrink-0" />
          <div>
            <p className="font-bold">Failed to load courses</p>
            <p className="text-sm opacity-80 mt-1">
              Please check your connection or try logging in again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="relative">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a2f66] dark:text-white">
          My Courses
        </h1>
        <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-2 flex items-center gap-2">
          <Sparkles className="size-4 text-[#0a2f66] dark:text-white" />
          Select the course you want to teach.
        </p>
      </div>

      {myCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-[#d9e3f6] dark:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024]">
          <BookOpen className="size-16 text-[#b2b2b2] dark:text-[#8ba3c7] mb-4" />
          <h3 className="text-lg font-bold text-[#0a2f66] dark:text-white">
            No Courses Assigned
          </h3>
          <p className="text-sm text-[#6b6b6b] dark:text-[#8ba3c7] mt-2 text-center max-w-sm">
            You currently don't have any courses assigned to you for this
            session. Contact your department administrator if this is a mistake.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((c) => (
            <div
              key={c.id}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-[#0a1c3a] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] border transition-all duration-300 hover:-translate-y-1 ${
                c.is_active
                  ? "border-[#0a2f66] dark:border-[#8ba3c7] ring-1 ring-[#0a2f66]/60 dark:ring-white/10"
                  : "border-[#d9e3f6] dark:border-[#1a365d]"
              }`}
            >
              <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500 text-[#0a2f66] dark:text-white">
                <BookOpen className="size-32" />
              </div>

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white shadow-sm">
                    <BookOpen className="size-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    {c.is_active && (
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-[#0a2f66] dark:bg-white text-white dark:text-[#0a2f66] px-2 py-1 rounded-md animate-pulse">
                        <Radio className="size-3" /> LIVE
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-md bg-[#f2f2f2] dark:bg-[#041024] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#6b6b6b] dark:text-[#8ba3c7]">
                      {c.level} Level
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-6 relative z-10">
                  <p className="text-2xl font-black text-[#0a2f66] dark:text-white">
                    {c.code}
                  </p>
                  <p className="text-sm font-semibold leading-relaxed text-[#6b6b6b] dark:text-[#8ba3c7] line-clamp-2">
                    {c.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f2f2] dark:border-[#1a365d] relative z-10">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#6b6b6b] dark:text-[#8ba3c7]">
                  <Users className="size-4 text-[#0a2f66] dark:text-white" />
                  {c.enrolled_count} Enrolled
                </span>

                {c.is_active ? (
                  <Link
                    href={`/lecturer/courses/${c.id}/attendance?sessionId=${c.active_session_id || ""}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#0a2f66] dark:bg-[#1a4b96] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#0a2f66]/90 active:scale-95 transition-all animate-pulse"
                  >
                    <Radio className="size-3.5" /> Live View
                  </Link>
                ) : (
                  <Link
                    href={`/lecturer/courses/${c.id}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#f2f2f2] dark:bg-[#1a4b96]/40 px-4 py-2 text-xs font-bold text-[#0a2f66] dark:text-white hover:bg-[#0a2f66] hover:text-white dark:hover:bg-[#1a4b96] transition-all"
                  >
                    Open <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
