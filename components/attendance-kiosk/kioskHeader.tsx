import { Users } from "lucide-react";

export function CourseHeader({
  code,
  title,
  enrolledCount,
}: {
  code: string;
  title: string;
  enrolledCount: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#d9e3f6] dark:border-[#1a365d]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0a2f66] dark:text-white">
          {code}
        </h1>
        <p className="text-lg font-semibold text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-lg bg-[#eafff0] dark:bg-[#1a4b96]/40 px-3 py-1.5 text-xs font-bold text-[#4ade80] dark:text-white">
          <Users className="size-4" /> {enrolledCount} Enrolled
        </span>
      </div>
    </div>
  );
}
