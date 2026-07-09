import Link from "next/link";
import { BookOpen, Users } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { Slot } from "@radix-ui/react-slot";
import { PageHeader } from "@/components/widgets";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LECTURER = "Dr. D. Maliki";

export default function LecturerCoursesPage() {
  const myCourses = courses.filter((c) => c.lecturer === LECTURER);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Courses"
        description="Courses assigned to you this session."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myCourses.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="size-5" />
                </div>
                <Badge variant="secondary">{c.level} Level</Badge>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-primary">{c.code}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.title}
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="size-4" />
                {c.studentIds.length} students
              </span>
              <Button asChild className="mt-auto" size="sm">
                <Link href={`/lecturer/courses/${c.id}`}>Open Course</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
