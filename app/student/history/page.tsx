"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Hexagon,
  X,
  Fingerprint,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { PageHeader } from "@/components/widgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlockchainReceiptModal } from "@/components/blockchain";

import { STUDENT_COURSES } from "@/app/student/courses/page";

export default function HistoryPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  const globalHistory = STUDENT_COURSES.flatMap((course) =>
    course.history.map((record) => ({
      ...record,
      courseCode: course.code,
      courseTitle: course.title,
    })),
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort newest first

  return (
    <div className="space-y-8 pb-20 relative">
      <PageHeader
        title="Attendance History"
        description="Your recent attendance across all registered courses."
      />

      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-[20px] overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 pb-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="size-5 text-[#5e3bce] dark:text-[#a98cfb]" />
            Global Class Log
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {globalHistory.length === 0 ? (
              <div className="p-10 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                No attendance records found.
              </div>
            ) : (
              globalHistory.map((h) => (
                <div
                  key={h.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 gap-4 sm:gap-0"
                >
                  {/* Left Side: Course Info & Date */}
                  <div>
                    <p className="font-black text-lg text-slate-800 dark:text-slate-100 leading-tight">
                      {h.courseCode}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                      {h.date} • {h.courseTitle}
                    </p>
                  </div>

                  {/* Right Side: Badges & Buttons */}
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    {h.status === "present" ? (
                      <>
                        <Badge className="gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 border-none px-2.5 py-1">
                          <CheckCircle2 className="size-3.5" />
                          Present
                        </Badge>
                        <button
                          onClick={() => setSelectedReceipt(h)}
                          className="flex items-center gap-1.5 rounded-lg bg-[#f7f2fe] dark:bg-purple-900/20 px-3 py-1.5 text-xs font-bold text-[#5e3bce] dark:text-[#a98cfb] transition-all hover:bg-[#5e3bce] hover:text-white dark:hover:bg-purple-800/40 dark:hover:text-purple-300 border border-purple-100 dark:border-purple-800/30"
                        >
                          <Hexagon className="size-3.5" />
                          Receipt
                        </button>
                      </>
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
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {selectedReceipt && (
        <BlockchainReceiptModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}
