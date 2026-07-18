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
      <div>
        <div className="mb-4 border-b border-[#d9e3f6] dark:border-[#1a365d] pb-3">
          <h2 className="text-xl font-bold text-[#0a2f66] dark:text-white flex items-center gap-2">
            <Settings2 className="size-5 text-[#0a2f66] dark:text-white" />{" "}
            System Setup
          </h2>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#0a1c3a] border border-[#d9e3f6] dark:border-[#1a365d] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white ring-4 ring-[#d9e3f6] dark:ring-[#1a365d]">
              <Fingerprint className="size-7" />
            </div>
            <div>
              <h3 className="font-bold text-[#0a2f66] dark:text-white">
                ESP32 Biometric Scanner
              </h3>
              <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-1 flex items-center gap-2">
                Device ID:{" "}
                <span className="font-mono text-xs bg-[#f2f2f2] dark:bg-[#041024] px-2 py-0.5 rounded">
                  BIO-ESP-004
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#eafff0] dark:bg-[#1a4b96]/40 text-emerald-600 dark:text-emerald-400 border border-[#d9e3f6] dark:border-[#1a365d]">
            <Radio className="size-4 animate-pulse" />
            <span className="text-sm font-bold">Hardware Linked</span>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 border-b border-[#d9e3f6] dark:border-[#1a365d] pb-3 flex justify-between items-end">
          <h2 className="text-xl font-bold text-[#0a2f66] dark:text-white flex items-center gap-2">
            <BookOpen className="size-5 text-[#0a2f66] dark:text-white" />{" "}
            Assigned Courses
          </h2>
          <span className="text-sm font-bold text-[#6b6b6b] dark:text-[#8ba3c7]">
            {courses?.length || 0} Total
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-10">
              <Loader2 className="size-8 animate-spin text-[#0a2f66] dark:text-white" />
            </div>
          ) : courses?.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col justify-between rounded-2xl border border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] p-5 shadow-sm hover:border-[#0a2f66] dark:hover:border-white transition-colors"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white">
                    <BookOpen className="size-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-[#0a2f66] dark:text-white">
                    {course.code}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] line-clamp-2">
                    {course.title}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] bg-[#f2f2f2] dark:bg-[#041024] w-fit px-2.5 py-1 rounded-md">
                  <Users className="size-3.5" />
                  <span>{course.enrolled_count || 0} Students Enrolled</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-[#d9e3f6] dark:border-[#1a365d] py-10 text-[#6b6b6b] dark:text-[#8ba3c7] text-sm font-medium">
              No courses assigned yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
