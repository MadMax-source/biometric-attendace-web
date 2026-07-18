"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Hexagon,
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/widgets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BlockchainReceiptModal } from "@/components/blockchain";
import { useStudentAttendance } from "@/hook/useAttendance";

export default function StudentCourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  const { courses, isLoading, isError } = useStudentAttendance();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Loading Course Details..." />
        <div className="flex justify-center py-12">
          <p className="text-[#6b6b6b] dark:text-[#8ba3c7] font-medium animate-pulse">
            Fetching from database...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader title="Error" />
        <div className="py-12 text-center text-red-500 font-medium">
          Failed to load course details.
        </div>
      </div>
    );
  }

  const course = courses?.find((c: any) => c.id === id);

  if (!course) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 text-[#6b6b6b] dark:text-[#8ba3c7]"
          onClick={() => router.push("/student/courses")}
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to my courses
        </Button>
        <PageHeader title="Course Not Found" />
        <div className="py-12 text-center text-[#6b6b6b] dark:text-[#8ba3c7]">
          You do not appear to be registered for this course, or it does not
          exist.
        </div>
      </div>
    );
  }

  const absent = Math.max(0, course.total - course.present);
  const pct =
    course.total > 0 ? Math.round((course.present / course.total) * 100) : 0;

  return (
    <div className="space-y-6 relative pb-20">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 text-[#6b6b6b] dark:text-[#8ba3c7] hover:text-[#0a2f66] dark:hover:text-white"
        onClick={() => router.push("/student/courses")}
      >
        <ArrowLeft className="size-4 mr-2" />
        Back to my courses
      </Button>

      <PageHeader title={`${course.code} — ${course.title}`} />

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Classes"
          value={course.total}
          icon={CalendarCheck}
        />
        <StatCard label="Present" value={course.present} icon={CheckCircle2} />
        <StatCard label="Absent" value={absent} icon={XCircle} />
        <StatCard label="Percentage" value={`${pct}%`} icon={CalendarCheck} />
      </div>

      {/* PROGRESS CARD */}
      <Card className="border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] rounded-[20px]">
        <CardHeader>
          <CardTitle className="text-base font-bold text-[#0a2f66] dark:text-white">
            Attendance Percentage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6b6b6b] dark:text-[#8ba3c7] font-medium">
              {course.present} of {course.total} classes
            </span>
            <span className="font-black text-[#0a2f66] dark:text-white">
              {pct}%
            </span>
          </div>
          <Progress
            value={pct}
            className="h-2 [&_[data-slot=progress-track]]:bg-[#f2f2f2] dark:[&_[data-slot=progress-track]]:bg-[#1a365d] [&_[data-slot=progress-indicator]]:bg-[#0a2f66] dark:[&_[data-slot=progress-indicator]]:bg-white"
          />
        </CardContent>
      </Card>

      {/* ATTENDANCE LOG */}
      <Card className="border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] rounded-[20px] overflow-hidden">
        <CardHeader className="border-b border-[#f2f2f2] dark:border-[#1a365d] bg-[#f2f2f2]/50 dark:bg-[#041024]/50 pb-4">
          <CardTitle className="text-base font-bold text-[#0a2f66] dark:text-white">
            Class Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#f2f2f2] dark:divide-[#1a365d]">
            {course.history && course.history.length > 0 ? (
              course.history.map((r: any) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-[#f2f2f2]/50 dark:hover:bg-[#1a365d]/40"
                >
                  <span className="text-sm font-medium text-[#262626] dark:text-[#8ba3c7]">
                    {r.date}
                  </span>

                  {r.status === "present" ? (
                    <div className="flex items-center gap-3">
                      <Badge className="gap-1.5 bg-[#eafff0] text-green-700 hover:bg-[#d4fce1] dark:bg-[#1a365d] dark:text-green-400 border-none px-2.5 py-1">
                        <CheckCircle2 className="size-3.5" />
                        Present
                      </Badge>

                      {r.transactionHash && (
                        <button
                          onClick={() => setSelectedReceipt(r)}
                          className="flex items-center gap-1.5 rounded-lg bg-[#f7f2fe] dark:bg-[#1a4b96]/40 px-3 py-1.5 text-xs font-bold text-[#0a2f66] dark:text-white transition-all hover:bg-[#0a2f66] hover:text-white border border-[#d9e3f6] dark:border-[#1a365d]"
                        >
                          <Hexagon className="size-3.5" />
                          Receipt
                        </button>
                      )}
                    </div>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="gap-1.5 bg-[#fff5eb] text-red-600 hover:bg-[#ffece0] dark:bg-[#041024] dark:text-red-400 border-none px-2.5 py-1"
                    >
                      <XCircle className="size-3.5" />
                      Absent
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-sm text-[#6b6b6b] dark:text-[#8ba3c7]">
                No classes have been held for this course yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* BLOCKCHAIN RECEIPT MODAL */}
      {selectedReceipt && (
        <BlockchainReceiptModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}
