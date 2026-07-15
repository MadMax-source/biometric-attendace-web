"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import { courses, students, getCourseById } from "@/lib/mock-data";
import { PageHeader } from "@/components/widgets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const course = getCourseById(id) ?? courses[0];

  const [selected, setSelected] = useState<string[]>(course.studentIds);
  const [saving, setSaving] = useState(false);

  function toggle(sid: string) {
    setSelected((prev) =>
      prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid],
    );
  }

  function save() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Students assigned", {
        description: `${selected.length} enrolled in ${course.code}`,
      });
    }, 700);
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => router.push("/admin/courses")}
      >
        <ArrowLeft className="size-4" />
        Back to courses
      </Button>

      <PageHeader
        title={`${course.code} — ${course.title}`}
        description={`${course.level} Level · ${course.semester} · ${course.lecturer}`}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-4 text-primary" />
            Add Students
          </CardTitle>
          <Badge variant="secondary">{selected.length} selected</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {students.map((s) => {
            const checked = selected.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggle(s.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                  checked ? "border-primary bg-primary/5" : "hover:bg-muted/50",
                )}
              >
                <div
                  className={cn(
                    "flex size-5 items-center justify-center rounded border",
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input",
                  )}
                >
                  {checked && <Check className="size-3.5" />}
                </div>
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {s.full_name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{s.full_name}</p>
                  <p className="text-xs text-primary">{s.matric}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {s.level} Level
                </span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save Enrollment
        </Button>
      </div>
    </div>
  );
}
