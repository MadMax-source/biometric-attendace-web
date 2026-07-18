"use client";

import { useRouter } from "next/navigation";
import { BookOpen, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  course: any;
  refresh: () => void;
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();

  return (
    <Card className="flex flex-col bg-white dark:bg-[#0a1c3a] border-[#d9e3f6] dark:border-[#1a365d] border-t-4 border-t-[#0a2f66] dark:border-t-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] transition-all">
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white">
            <BookOpen className="size-5" />
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="text-[#6b6b6b] dark:text-[#8ba3c7] border-[#b2b2b2] dark:border-[#1a365d]"
            >
              {course.credits} Units
            </Badge>
            <Badge className="bg-[#0a2f66] hover:bg-[#0a2f66]/90 dark:bg-white dark:text-[#0a2f66] dark:hover:bg-[#d9e3f6] shadow-sm border-none transition-colors">
              {course.level} Level
            </Badge>
          </div>
        </div>

        <div className="space-y-1 mt-2">
          <h3 className="font-bold text-lg text-[#0a2f66] dark:text-white tracking-tight">
            {course.course_code}
          </h3>
          <p className="text-sm text-[#6b6b6b] dark:text-[#8ba3c7] leading-relaxed line-clamp-2">
            {course.title}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#f2f2f2] dark:border-[#1a365d] pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-[#6b6b6b] dark:text-[#8ba3c7] font-medium">
            <Users className="size-4" />
            {course.enrollment_count || 0} enrolled
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#b2b2b2] dark:text-[#8ba3c7] hover:text-[#0a2f66] hover:bg-[#f2f2f2] dark:hover:text-white dark:hover:bg-[#1a365d] transition-colors"
            onClick={() => router.push(`/admin/courses/${course.id}`)}
          >
            <UserPlus className="size-4 mr-1.5" />
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
