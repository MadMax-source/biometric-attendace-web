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
      <div className="mb-6 flex items-center justify-between border-b border-[#d9e3f6] dark:border-[#1a365d] pb-4">
        <h2 className="text-xl font-bold text-[#0a2f66] dark:text-white">
          Available Courses
        </h2>
        {!isLoading && courses.length > 0 && (
          <span className="rounded-full bg-[#f2f2f2] dark:bg-[#1a365d] px-3 py-1 text-xs font-bold text-[#0a2f66] dark:text-[#8ba3c7]">
            Page {currentPage + 1} of {totalPages || 1}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[400px]">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-[#0a2f66] dark:text-white" />
          </div>
        ) : courses.length > 0 ? (
          courses.map((course) => {
            const isSelected = selectedCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all ${
                  isSelected
                    ? "border-[#0a2f66] bg-[#f2f2f2] dark:bg-[#1a4b96]/20 dark:border-[#8ba3c7]"
                    : "border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] hover:border-[#0a2f66] dark:hover:border-[#8ba3c7]"
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#d9e3f6] dark:bg-[#1a365d] text-[#0a2f66] dark:text-white">
                    <BookOpen className="size-5" />
                  </div>
                  {isSelected ? (
                    <CheckCircle2 className="size-6 text-[#0a2f66] dark:text-[#8ba3c7]" />
                  ) : (
                    <div className="size-6 rounded-full border-2 border-[#b2b2b2] dark:border-[#1a365d]"></div>
                  )}
                </div>

                <div>
                  <h3 className="font-black text-[#0a2f66] dark:text-white">
                    {course.code}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#262626] dark:text-[#8ba3c7] line-clamp-2">
                    {course.title}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7]">
                    <Clock className="size-3.5" />
                    <span>{course.credits} Credits</span>
                  </div>
                  <button
                    onClick={() => onToggleCourse(course.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-[#0a2f66] text-white dark:bg-[#8ba3c7] dark:text-[#041024] hover:bg-[#0a2f66]/90 dark:hover:bg-[#8ba3c7]/80"
                        : "bg-[#f2f2f2] text-[#262626] dark:bg-[#041024] dark:text-[#8ba3c7] hover:bg-[#d9e3f6] dark:hover:bg-[#1a365d]"
                    }`}
                  >
                    {isSelected ? "Deselect" : "Select"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-[#b2b2b2] dark:border-[#1a365d] py-16">
            <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7]">
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
            className="px-6 py-2 bg-[#f2f2f2] dark:bg-[#041024] rounded-lg text-sm font-bold text-[#262626] dark:text-[#8ba3c7] hover:bg-[#d9e3f6] dark:hover:bg-[#1a365d] disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-6 py-2 bg-[#0a2f66] dark:bg-[#1a4b96] text-white rounded-lg text-sm font-bold hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
