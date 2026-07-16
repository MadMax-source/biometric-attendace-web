"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/widgets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BACKENDAPI from "@/API";
import { useLecturer } from "@/hook/useLecturer";
import { CourseDetails } from "@/components/admin/courseDetail";
import { LecturerAssignment } from "@/components/admin/lecturerAssignment";

export interface CourseFormState {
  code: string;
  title: string;
  level: string;
  semester: string;
  credits: string;
  lecturerId: string;
}

export default function CreateCoursePage() {
  const router = useRouter();
  const { lecturerLists, isLoading: isLoadingLecturers } = useLecturer();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<CourseFormState>({
    code: "",
    title: "",
    level: "",
    semester: "",
    credits: "3",
    lecturerId: "unassigned",
  });

  function update(key: keyof CourseFormState, value: string | null) {
    const safeValue = value || "";
    const finalValue = key === "code" ? safeValue.toUpperCase() : safeValue;
    setForm((f) => ({ ...f, [key]: finalValue }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (
      !form.code ||
      !form.title ||
      !form.level ||
      !form.semester ||
      !form.credits
    ) {
      toast.error("Please fill in all required course details");
      setSaving(false);
      return;
    }

    try {
      const response = await BACKENDAPI.post("/createCourse", {
        course_code: form.code,
        title: form.title,
        level: form.level,
        credits: Number(form.credits),
        semester: form.semester,
        lecturerId: form.lecturerId,
      });

      if (response.status == 200) {
        toast.success("Course created successfully!");
        router.push("/admin/courses");
      }
    } catch {
      console.error("Failed to create course");
      toast.error("Failed to create course");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-10">
      <PageHeader
        title="Create Course"
        description="Add a new course to the department catalog and assign personnel."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-t-4 border-t-[#0c2a5d] shadow-md overflow-hidden ring-1 ring-border/50 border-x-0 border-b-0">
          <div className="bg-[#0c2a5d] px-6 py-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Course Information
            </h2>
          </div>

          <CardContent className="p-0">
            <CourseDetails form={form} update={update} />
            <Separator />
            <LecturerAssignment
              form={form}
              update={update}
              lecturerLists={lecturerLists}
              isLoadingLecturers={isLoadingLecturers}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.push("/admin/courses")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto min-w-[140px] bg-[#0c2a5d] hover:bg-[#0c2a5d]/90 text-white"
          >
            {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
            {saving ? "Saving..." : "Save Course"}
          </Button>
        </div>
      </form>
    </div>
  );
}
