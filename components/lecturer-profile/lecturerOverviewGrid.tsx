import {
  BookOpen,
  Users,
  Fingerprint,
  Radio,
  Settings2,
  Loader2,
} from "lucide-react";

interface LecturerOverviewGridProps {
  courses: any[];
  isLoading: boolean;
}

export default function LecturerOverviewGrid({
  courses,
  isLoading,
}: LecturerOverviewGridProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* SECTION 1: Hardware & IoT Status */}
      <div>
        <div className="mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Settings2 className="size-5 text-purple-600" /> System Setup
          </h2>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-4 ring-indigo-50/50">
              <Fingerprint className="size-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                ESP32 Biometric Scanner
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                Device ID:{" "}
                <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  BIO-ESP-004
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
            <Radio className="size-4 animate-pulse" />
            <span className="text-sm font-bold">Hardware Linked</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Assigned Courses (Read-Only) */}
      <div>
        <div className="mb-4 border-b border-slate-200 dark:border-slate-800 pb-3 flex justify-between items-end">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="size-5 text-purple-600" /> Assigned Courses
          </h2>
          <span className="text-sm font-bold text-slate-500">
            {courses?.length || 0} Total
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-10">
              <Loader2 className="size-8 animate-spin text-purple-600" />
            </div>
          ) : courses?.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-purple-300 transition-colors"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#f0f6ff] dark:bg-blue-950/30 text-[#5a8ce6]">
                    <BookOpen className="size-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-slate-800 dark:text-slate-100">
                    {course.code}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2">
                    {course.title}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50 w-fit px-2.5 py-1 rounded-md">
                  <Users className="size-3.5" />
                  <span>{course.enrolled_count || 0} Students Enrolled</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 py-10 text-slate-500 text-sm font-medium">
              No courses assigned yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
