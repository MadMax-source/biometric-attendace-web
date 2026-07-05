"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LECTURERS = [
  "Dr. D. Maliki",
  "Engr. A. Bala",
  "Prof. K. Usman",
  "Dr. R. Adamu",
];

export default function CreateCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    code: "",
    title: "",
    level: "",
    semester: "",
    lecturer: "",
  });
  const [saving, setSaving] = useState(false);

  function update(key: keyof typeof form, value: string | null) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Object.values(form).some((v) => !v)) {
      toast.error("Fill in all fields");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      toast.success("Course created", {
        description: `${form.code} — ${form.title}`,
      });
      router.push("/admin/courses");
    }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Create Course"
        description="Add a new course to the department catalog."
      />
      <Card>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="code">Course Code</Label>
            <Input
              id="code"
              placeholder="CPE121"
              value={form.code}
              onChange={(e) => update("code", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-1">
            <Label>Level</Label>
            <Select
              value={form.level}
              onValueChange={(v) => update("level", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {["100", "200", "300", "400", "500"].map((l) => (
                  <SelectItem key={l} value={l}>
                    {l} Level
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              placeholder="Introduction to Computer Engineering"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Semester</Label>
            <Select
              value={form.semester}
              onValueChange={(v) => update("semester", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="First Semester">First Semester</SelectItem>
                <SelectItem value="Second Semester">Second Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Lecturer</Label>
            <Select
              value={form.lecturer}
              onValueChange={(v) => update("lecturer", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Assign lecturer" />
              </SelectTrigger>
              <SelectContent>
                {LECTURERS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/courses")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save Course
        </Button>
      </div>
    </form>
  );
}
