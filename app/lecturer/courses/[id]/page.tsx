"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLecturerDashboard } from "@/hook/useLecturerDashboard";
import { ArrowLeft, Loader2, AlertCircle, Radio } from "lucide-react";
import { toast } from "sonner";
import BACKENDAPI from "@/API";
import { CourseHeader } from "@/components/attendance-kiosk/kioskHeader";
import { SessionSetupForm } from "@/components/attendance-kiosk/sessionSetupForm";

interface Course {
  id: string;
  code: string;
  title: string;
  level: number;
  enrolled_count: number;
}

interface Schedule {
  id: string;
  course_id: string;
  code: string;
  title: string;
  start_time: string;
  end_time: string;
  venue: string;
  is_active: boolean;
}

export default function LecturerCourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { courses, isError, isLoading, schedule } = useLecturerDashboard();

  const course = courses.find((c) => c.id === id);
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    date: today,
    startTime: "",
    endTime: "",
    venue: "",
  });

  const [starting, setStarting] = useState(false);
  const [ending, setEnding] = useState(false); // New state for ending session

  // Find if this course is on today's schedule
  const scheduledClass = schedule?.find((s) => s.course_id === id);
  // Check if it is currently active
  const isSessionActive = scheduledClass?.is_active || false;

  useEffect(() => {
    if (scheduledClass) {
      setForm({
        date: today,
        startTime: scheduledClass.start_time,
        endTime: scheduledClass.end_time,
        venue: scheduledClass.venue,
      });
    }
  }, [scheduledClass, today]);

  function updateForm(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function startSession() {
    if (Object.values(form).some((v) => !v)) {
      toast.error("Fill in all session details");
      return;
    }

    setStarting(true);
    try {
      const response = await BACKENDAPI.post("/start-session", {
        courseId: course?.id,
      });

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        router.push(`/lecturer/courses/${course?.id}/attendance`);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to start session",
      );
    } finally {
      setStarting(false);
    }
  }

  async function endSession() {
    try {
      const activeSessionResponse = await BACKENDAPI.get(
        `/active-session/${course?.id}`,
      );
      if (activeSessionResponse?.status === 200) {
        const sessionId = activeSessionResponse?.data?.session?.id;
        if (!sessionId) {
          toast.error("No active session found to end.");
          return;
        }
        const response = await BACKENDAPI.post("/end-session", {
          courseId: course?.id,
          sessionId: sessionId,
        });

        if (response?.status === 200) {
          toast.success("Session ended successfully");
          window.location.reload();
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to end session");
    } finally {
      setEnding(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="size-10 animate-spin text-[#0a2f66] dark:text-white" />
        <p className="text-sm font-semibold text-[#6b6b6b] dark:text-[#8ba3c7]">
          Loading course details...
        </p>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="max-w-4xl mx-auto pt-10">
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 dark:border-red-900/50 bg-[#fff5eb] dark:bg-red-900/10 p-6 text-red-600 dark:text-red-400 shadow-sm">
          <AlertCircle className="size-6 shrink-0" />
          <div>
            <p className="font-bold">Course not found</p>
            <p className="text-sm opacity-80 mt-1">
              {isError
                ? "Failed to connect to the server."
                : "This course doesn't exist or isn't assigned to you."}
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/lecturer/courses")}
          className="mt-6 flex items-center gap-2 text-sm font-bold text-[#b2b2b2] hover:text-[#0a2f66] dark:text-[#8ba3c7] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to courses
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <button
        onClick={() => router.push("/lecturer/courses")}
        className="flex items-center gap-2 text-sm font-bold text-[#b2b2b2] hover:text-[#0a2f66] dark:text-[#8ba3c7] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to courses
      </button>

      <CourseHeader
        code={course.code}
        title={course.title}
        enrolledCount={course.enrolled_count}
      />

      {/* Conditionally render the Active Session Banner OR the Setup Form */}
      {isSessionActive ? (
        <div className="rounded-2xl border border-[#d9e3f6] dark:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024] p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#d9e3f6] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white">
            <Radio className="size-6 animate-pulse" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-[#0a2f66] dark:text-white">
            Session is currently active
          </h3>
          <p className="mb-8 text-sm text-[#6b6b6b] dark:text-[#8ba3c7] max-w-md mx-auto">
            You have an ongoing attendance session for this course today. You
            can resume scanning or end the session to close attendance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                router.push(`/lecturer/courses/${course?.id}/attendance`)
              }
              className="w-full sm:w-auto rounded-lg bg-[#0a2f66] dark:bg-[#1a4b96] px-8 py-3 text-sm font-bold text-white hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 transition-colors shadow-sm"
            >
              Resume Scanner
            </button>
            <button
              onClick={endSession}
              disabled={ending}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-white dark:bg-[#0a1c3a] px-8 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              {ending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "End Session"
              )}
            </button>
          </div>
        </div>
      ) : (
        <SessionSetupForm
          form={form}
          onUpdate={updateForm}
          onStart={startSession}
          isStarting={starting}
        />
      )}
    </div>
  );
}
