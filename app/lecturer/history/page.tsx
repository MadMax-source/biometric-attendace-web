"use client";

import { useState } from "react";
import { useLecturerDashboard } from "@/hook/useLecturerDashboard";
import CourseSelector from "@/components/lecturer-history/courseSelector";
import SessionView from "@/components/lecturer-history/sessionView";
import { useAuth } from "@/lib/auth-context";

export default function AttendanceHistoryPage() {
  const { courses, isLoading: coursesLoading } = useLecturerDashboard();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          Attendance History
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-2">
          Review past sessions and export attendance reports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
        {/* LEFT COLUMN: Course Selection */}
        <CourseSelector
          courses={courses}
          isLoading={coursesLoading}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
        />

        {/* RIGHT COLUMN: Session Details & Data Table */}
        <SessionView selectedCourse={selectedCourse} />
      </div>
    </div>
  );
}
