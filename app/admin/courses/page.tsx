"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/widgets";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/admin/searchbar";
import { useCourses } from "@/hook/usecourse";
import { CourseCard } from "@/components/admin/coursecard";
import { CourseSkeleton } from "@/components/admin/skeletonCard";

export default function CoursesPage() {
  const router = useRouter();
  const { courses, isLoading, refresh } = useCourses();
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter(
    (c: any) =>
      c.course_code.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Courses Overview"
        description={`${filteredCourses.length} courses match your search`}
        action={
          <Button
            className="bg-[#0a2f66] hover:bg-[#0a2f66]/90 dark:bg-[#1a4b96] dark:hover:bg-[#1a4b96]/80 text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
            onClick={() => router.push("/admin/courses/create")}
          >
            <Plus className="size-4 mr-2" />
            Create Course
          </Button>
        }
      />
      <SearchInput value={search} onChange={setSearch} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <CourseSkeleton key={i} />)
        ) : filteredCourses.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-[#6b6b6b] dark:text-[#8ba3c7]">
              No courses found matching "{search}"
            </p>
          </div>
        ) : (
          filteredCourses.map((course: any) => (
            <CourseCard key={course.id} course={course} refresh={refresh} />
          ))
        )}
      </div>
    </div>
  );
}
