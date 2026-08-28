"use client";

import { useActiveCourses } from "@/hook/useActiveCourse";
import { BookOpen, Clock } from "lucide-react";

export default function ActiveCourseBanner() {
  const { activeCourses, isLoading, isError } = useActiveCourses();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  if (!activeCourses || activeCourses.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {activeCourses.map((session: any) => {
        const course = session.courses;
        return (
          <div
            key={session.id}
            className="flex w-full items-center gap-4 rounded-xl border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 p-4 shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-green-700 dark:text-green-300">
                {course?.course_code || "Course"} –{" "}
                {course?.title || "Active Session"}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                This class is currently in session. Proceed to the kiosk to mark
                attendance.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                Live
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
