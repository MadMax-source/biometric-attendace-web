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
} from "lucide-react";

interface Course {
  id: string;
  code: string;
  title: string;
  level: number;
  enrolled_count: number;
}

interface DashboardResponse {
  courses: Course[];
  today_schedule: any[];
}

export default function LecturerCoursesPage() {
  const { courses, isError, isLoading } = useLecturerDashboard();

  const myCourses = courses || [];

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="size-10 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse">
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
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white">
          My Courses
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
          <Sparkles className="size-4 text-indigo-500" />
          Select the course you want to teach.
        </p>
      </div>

      {myCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
          <BookOpen className="size-16 text-slate-300 dark:text-slate-700 mb-4" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
            No Courses Assigned
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2 text-center max-w-sm">
            You currently don't have any courses assigned to you for this
            session. Contact your department administrator if this is a mistake.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((c) => (
            <div
              key={c.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.15)] transition-all duration-300"
            >
              <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500 text-indigo-600">
                <BookOpen className="size-32" />
              </div>

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm">
                    <BookOpen className="size-6" />
                  </div>
                  <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {c.level} Level
                  </span>
                </div>

                <div className="space-y-1.5 mb-6 relative z-10">
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                    {c.code}
                  </p>
                  <p className="text-sm font-semibold leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                    {c.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800/60 relative z-10">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <Users className="size-4 text-indigo-400" />
                  {c.enrolled_count} Enrolled
                </span>

                <Link
                  href={`/lecturer/courses/${c.id}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  Open <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
