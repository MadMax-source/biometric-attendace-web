"use client";

import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/widgets";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type AttendanceStatus = "present" | "absent";

export interface AttendanceRecord {
  id: string;
  date: string;
  status: AttendanceStatus;
  transactionHash?: string;
  biometricHash?: string;
}

export interface StudentCourse {
  id: string;
  code: string;
  title: string;
  present: number;
  total: number;
  history: AttendanceRecord[];
}

// Mock data to be fetched from backend later
export const STUDENT_COURSES: StudentCourse[] = [
  {
    id: "c1",
    code: "CPE121",
    title: "Introduction to Computer Engineering",
    present: 4,
    total: 5,
    history: [
      {
        id: "a1",
        date: "12 June 2026",
        status: "present",
        transactionHash: "0x8fB321a9c84eD521b4...c982A1",
        biometricHash: "SHA256: 9a3e21...f1b7",
      },
      {
        id: "a2",
        date: "15 June 2026",
        status: "present",
        transactionHash: "0x7aA110b8d73cF410a3...b771B0",
        biometricHash: "SHA256: 8b2d10...e0a6",
      },
      { id: "a3", date: "17 June 2026", status: "absent" },
      {
        id: "a4",
        date: "19 June 2026",
        status: "present",
        transactionHash: "0x9cC442d7e95fE632c5...d093C2",
        biometricHash: "SHA256: 7c4f32...d2c8",
      },
      {
        id: "a5",
        date: "20 June 2026",
        status: "present",
        transactionHash: "0x1dD553e8f06aF743d6...e104D3",
        biometricHash: "SHA256: 6d5g43...c3d9",
      },
    ],
  },
  {
    id: "c2",
    code: "CPE122",
    title: "Digital Logic Design",
    present: 2,
    total: 2,
    history: [
      {
        id: "b1",
        date: "13 June 2026",
        status: "present",
        transactionHash: "0x2eE664f9g17bG854e7...f215E4",
        biometricHash: "SHA256: 5e6h54...b4e0",
      },
      {
        id: "b2",
        date: "16 June 2026",
        status: "present",
        transactionHash: "0x3fF775g0h28cH965f8...g326F5",
        biometricHash: "SHA256: 4f7i65...a5f1",
      },
    ],
  },
  {
    id: "c3",
    code: "CPE123",
    title: "Programming Fundamentals",
    present: 8,
    total: 11,
    history: [],
  },
  {
    id: "c4",
    code: "MEE111",
    title: "Engineering Drawing",
    present: 9,
    total: 10,
    history: [],
  },
  {
    id: "c5",
    code: "MTH101",
    title: "Elementary Mathematics I",
    present: 7,
    total: 12,
    history: [],
  },
  {
    id: "c6",
    code: "GST111",
    title: "Communication in English",
    present: 12,
    total: 12,
    history: [],
  },
];

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="My Courses"
        description="Courses you are enrolled in this semester."
      />

      <div className="flex flex-col gap-4">
        {STUDENT_COURSES.map((c) => {
          const pct = c.total > 0 ? Math.round((c.present / c.total) * 100) : 0;

          return (
            <Link
              key={c.id}
              href={`/student/courses/${c.id}`}
              className="group block"
            >
              <Card className="rounded-[20px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:border-[#5e3bce]/40 hover:shadow-md dark:hover:border-[#a98cfb]/40">
                {/* Increased padding (p-5 sm:p-6) for a more breathable resolution */}
                <CardContent className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6">
                  {/* Left Icon - Hidden on very small mobile screens to save space */}
                  <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f6ff] dark:bg-blue-950/30 text-[#5a8ce6]">
                    <BookOpen className="size-6" />
                  </div>

                  {/* Core Content Area */}
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                      <div>
                        {/* Sharper Typography */}
                        <p className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">
                          {c.code}
                        </p>
                        <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                          {c.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {c.present} / {c.total}
                        </span>
                        <span
                          className={`text-sm font-black ${pct >= 75 ? "text-green-600 dark:text-green-400" : "text-orange-500 dark:text-orange-400"}`}
                        >
                          {pct}%
                        </span>
                      </div>
                    </div>

                    {/* Shadcn UI Progress component, dialed in with proper height */}
                    <Progress
                      value={pct}
                      className="h-2 bg-slate-100 dark:bg-slate-800"
                    />
                  </div>

                  {/* Right Action Chevron */}
                  <ChevronRight className="size-5 shrink-0 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-[#5e3bce] dark:group-hover:text-[#a98cfb]" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
