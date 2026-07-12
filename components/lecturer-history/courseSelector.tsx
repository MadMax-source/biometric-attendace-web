import { BookOpen } from "lucide-react";

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
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-2">
        <BookOpen className="size-4 text-indigo-500" /> Select Course
      </h2>

      {isLoading ? (
        <div className="text-sm text-slate-500">Loading courses...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {courses?.map((course: any) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className={`text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                selectedCourse === course.id
                  ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-100 dark:ring-indigo-900"
                  : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
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
