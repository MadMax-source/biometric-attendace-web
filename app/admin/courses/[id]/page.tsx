"use client";

import { use, useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import BACKENDAPI from "@/API";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseHeader } from "@/components/coursemanagement/courseHeader";
import { PersonnelAssignment } from "@/components/coursemanagement/personnelAssignment";
import { TimetableManager } from "@/components/coursemanagement/timtablemanager";
import { DangerZone } from "@/components/coursemanagement/dangerZone";
import { CourseSchedule } from "@/type";
import { useCourses } from "@/hook/usecourse";
import { useLecturer } from "@/hook/useLecturer";

export default function ManageCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { courses, isLoading: courseLoading } = useCourses();
  const courseData = courses?.find((c: any) => String(c.id) === String(id));

  const {
    lecturerLists: lecturersData,
    isLoading: lecturersLoading,
    isError: error,
  } = useLecturer();

  const [lecturerId, setLecturerId] = useState<string>("unassigned");
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Sync initial fetched data into editable state
  useEffect(() => {
    if (courseData) {
      setLecturerId(courseData.lecturerId || "unassigned");
      setSchedules(courseData.schedules || []);
    }
  }, [courseData]);

  const handleSaveChanges = async () => {
    if (!lecturerId || !schedules) {
      toast.error("Please ensure all fields are filled before saving.");
      return;
    }
    try {
      setIsSaving(true);

      await BACKENDAPI.post(`/courses/${id}`, {
        lecturerId: lecturerId,
        schedules: schedules,
      });

      toast.success("Course settings saved successfully!");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Render Loaders
  if (courseLoading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="text-center py-10 text-slate-500">Course not found.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <CourseHeader course={courseData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Main Editing Areas */}
        <div className="lg:col-span-2 space-y-6">
          <PersonnelAssignment
            lecturerId={lecturerId}
            onChange={setLecturerId}
            lecturers={lecturersData || []}
            isLoading={lecturersLoading}
          />

          <TimetableManager schedules={schedules} onChange={setSchedules} />
        </div>

        {/* RIGHT COLUMN: Actions & Danger Zone */}
        <div className="space-y-6">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/20 border-t-4 border-t-slate-300 dark:border-t-slate-700 shadow-sm transition-all">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 dark:text-white">
                Publish Changes
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Save personnel and schedule updates to the live database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="w-full bg-[#0c2a5d] hover:bg-[#0c2a5d]/90 text-white dark:bg-white dark:text-[#0c2a5d] dark:hover:bg-slate-200 shadow-md transition-colors"
              >
                {isSaving ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : null}
                {isSaving ? "Saving..." : "Save All Changes"}
              </Button>
            </CardContent>
          </Card>

          <DangerZone courseId={id} courseCode={courseData.course_code} />
        </div>
      </div>
    </div>
  );
}
