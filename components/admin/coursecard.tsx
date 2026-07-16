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
    <Card className="flex flex-col border-t-4 border-t-[#0c2a5d] shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#0c2a5d]/10 text-[#0c2a5d]">
            <BookOpen className="size-5" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-muted-foreground">
              {course.credits} Units
            </Badge>
            <Badge className="bg-[#0c2a5d] hover:bg-[#0c2a5d]/90">
              {course.level} Level
            </Badge>
          </div>
        </div>

        <div className="space-y-1 mt-2">
          <h3 className="font-bold text-lg text-[#0c2a5d] tracking-tight">
            {course.course_code}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {course.title}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <Users className="size-4" />
            {course.enrollment_count || 0} enrolled
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-[#0c2a5d] hover:bg-[#0c2a5d]/10"
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
