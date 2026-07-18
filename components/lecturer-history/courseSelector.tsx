import { BookOpen } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
interface CourseSelectorProps {
  courses: any[];
  isLoading: boolean;
  selectedCourse: string | null;
  onSelectCourse: (courseId: string) => void;
}

export default function CourseSelector({
  courses,
  isLoading,
  selectedCourse,
  onSelectCourse,
}: CourseSelectorProps) {
  const { loading } = useAuth();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-[#0a1c3a] p-6 shadow-sm border border-[#d9e3f6] dark:border-[#1a365d]">
      <h2 className="text-base font-bold text-[#0a2f66] dark:text-white flex items-center gap-2 mb-2">
        <BookOpen className="size-4 text-[#0a2f66] dark:text-white" /> Select
        Course
      </h2>
      {loading || (isLoading && courses.length === 0) ? (
        <div className="text-sm text-[#6b6b6b] dark:text-[#8ba3c7]">
          Loading courses...
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {courses?.map((course: any) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className={`text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                selectedCourse === course.id
                  ? "bg-[#f2f2f2] dark:bg-[#1a4b96]/40 border-[#0a2f66] dark:border-white text-[#0a2f66] dark:text-white ring-1 ring-[#d9e3f6] dark:ring-[#1a365d]"
                  : "bg-transparent border-[#f2f2f2] dark:border-[#1a365d] text-[#6b6b6b] dark:text-[#8ba3c7] hover:bg-[#f2f2f2] dark:hover:bg-[#1a365d]/40"
              }`}
            >
              {course.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
