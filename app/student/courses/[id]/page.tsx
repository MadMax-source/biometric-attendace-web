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
import { useStudentAttendance } from "@/hook/useAttendance"; // Ensure path is correct

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
          <p className="text-slate-500 animate-pulse font-medium">
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
          className="-ml-2 text-slate-500"
          onClick={() => router.push("/student/courses")}
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to my courses
        </Button>
        <PageHeader title="Course Not Found" />
        <div className="py-12 text-center text-slate-500">
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
        className="-ml-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
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
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-[20px]">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100">
            Attendance Percentage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {course.present} of {course.total} classes
            </span>
            <span className="font-black text-[#5e3bce] dark:text-[#a98cfb]">
              {pct}%
            </span>
          </div>
          <Progress
            value={pct}
            className="h-2 bg-slate-100 dark:bg-slate-800"
          />
        </CardContent>
      </Card>

      {/* ATTENDANCE LOG */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-[20px] overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 pb-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100">
            Class Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {course.history && course.history.length > 0 ? (
              course.history.map((r: any) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {r.date}
                  </span>

                  {r.status === "present" ? (
                    <div className="flex items-center gap-3">
                      <Badge className="gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 border-none px-2.5 py-1">
                        <CheckCircle2 className="size-3.5" />
                        Present
                      </Badge>

                      {r.transactionHash && (
                        <button
                          onClick={() => setSelectedReceipt(r)}
                          className="flex items-center gap-1.5 rounded-lg bg-[#f7f2fe] dark:bg-purple-900/20 px-3 py-1.5 text-xs font-bold text-[#5e3bce] dark:text-[#a98cfb] transition-all hover:bg-[#5e3bce] hover:text-white dark:hover:bg-purple-800/40 dark:hover:text-purple-300 border border-purple-100 dark:border-purple-800/30"
                        >
                          <Hexagon className="size-3.5" />
                          Receipt
                        </button>
                      )}
                    </div>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40 border-none px-2.5 py-1"
                    >
                      <XCircle className="size-3.5" />
                      Absent
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-sm text-slate-500">
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
