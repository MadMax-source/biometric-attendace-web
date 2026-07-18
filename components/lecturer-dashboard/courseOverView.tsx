import Link from "next/link";
import { BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import { DashboardCourse } from "@/hook/useLecturerDashboard";

export function CourseOverviewList({
  courses,
}: {
  courses: DashboardCourse[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-[#0a1c3a] p-6 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d] h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-[#0a2f66] dark:text-white flex items-center gap-2">
          <BookOpen className="size-5 text-[#0a2f66] dark:text-white" /> My
          Courses
        </h2>
        <Link
          href="/lecturer/courses"
          className="text-xs font-bold text-[#0a2f66] dark:text-[#8ba3c7] hover:text-[#0a2f66]/80 flex items-center"
        >
          View all <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/lecturer/courses/${c.id}`}
            className="group flex items-center justify-between rounded-xl border border-transparent hover:border-[#d9e3f6] dark:hover:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024] p-4 transition-all hover:bg-white dark:hover:bg-[#0a1c3a] hover:shadow-sm"
          >
            <div>
              <p className="font-black text-[#0a2f66] dark:text-white group-hover:text-[#0a2f66] transition-colors">
                {c.code}
              </p>
              <p className="text-xs font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
                Level {c.level} • {c.enrolled_count} Students
              </p>
            </div>
            <div className="flex size-8 items-center justify-center rounded-full bg-white dark:bg-[#1a365d] text-[#b2b2b2] group-hover:text-[#0a2f66] group-hover:bg-[#d9e3f6] shadow-sm transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
