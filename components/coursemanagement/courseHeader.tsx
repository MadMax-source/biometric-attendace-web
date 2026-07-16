"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseData } from "@/type";

export function CourseHeader({ course }: { course: CourseData }) {
  const router = useRouter();

  return (
    <div className="space-y-4 mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 text-slate-500 hover:text-indigo-600"
        onClick={() => router.push("/admin/courses")}
      >
        <ArrowLeft className="size-4 mr-2" />
        Back to courses
      </Button>
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {course.course_code} — {course.title}
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          {course.level} Level · {course.semester} · {course.credits} Units
        </p>
      </div>
    </div>
  );
}
