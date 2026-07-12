import { BookOpen, Clock, CheckCircle2, Loader2 } from "lucide-react";

export type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
};

interface CourseGridProps {
  courses: Course[];
  isLoading: boolean;
  selectedCourseIds: string[];
  onToggleCourse: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function CourseGrid({
  courses,
  isLoading,
  selectedCourseIds,
  onToggleCourse,
  currentPage,
  totalPages,
  onPageChange,
}: CourseGridProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Available Courses
        </h2>
        {!isLoading && courses.length > 0 && (
          <span className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-400">
            Page {currentPage + 1} of {totalPages || 1}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[400px]">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-purple-600" />
          </div>
        ) : courses.length > 0 ? (
          courses.map((course) => {
            const isSelected = selectedCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-50/50 dark:bg-purple-900/10 dark:border-purple-500"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#f0f6ff] dark:bg-blue-950/30 text-[#5a8ce6]">
                    <BookOpen className="size-5" />
                  </div>
                  {isSelected ? (
                    <CheckCircle2 className="size-6 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-700"></div>
                  )}
                </div>

                <div>
                  <h3 className="font-black text-slate-800 dark:text-slate-100">
                    {course.code}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2">
                    {course.title}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Clock className="size-3.5" />
                    <span>{course.credits} Credits</span>
                  </div>
                  <button
                    onClick={() => onToggleCourse(course.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 hover:bg-purple-200"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected ? "Deselect" : "Select"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 py-16">
            <p className="text-sm font-medium text-slate-500">
              No courses available.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center">
          <button
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-6 py-2 bg-[#16085a] text-white rounded-lg text-sm font-bold hover:bg-[#5e3bce] disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
