"use client";

import Link from "next/link";
import {
  Activity,
  BookOpen,
  CalendarCheck,
  Percent,
  Users,
} from "lucide-react";
import {
  courses,
  sessions,
  students,
  attendanceByLevel,
} from "@/lib/mock-data";
import { PageHeader, StatCard, BarRow } from "@/components/widgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const activeSessions = sessions.filter((s) => s.active).length;
  const todayAttendance = sessions.reduce((sum, s) => sum + s.present, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="Department-wide attendance at a glance."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Students"
          value={420}
          icon={Users}
          hint="Computer Engineering"
        />
        <StatCard
          label="Total Courses"
          value={courses.length}
          icon={BookOpen}
          hint="This session"
        />
        <StatCard
          label="Today's Attendance"
          value={351}
          icon={CalendarCheck}
          hint="Marked today"
        />
        <StatCard
          label="Active Sessions"
          value={activeSessions}
          icon={Activity}
          hint="Running now"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Analytics Card */}
        <Card className="lg:col-span-2 bg-white dark:bg-[#0a1c3a] border-[#d9e3f6] dark:border-[#1a365d] border-t-4 border-t-[#0a2f66] dark:border-t-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] transition-all">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base text-[#0a2f66] dark:text-white">
              Attendance by level
            </CardTitle>
            <Link
              href="/admin/analytics"
              className="text-sm font-medium text-[#0a2f66] dark:text-[#8ba3c7] hover:text-[#0a2f66]/80 hover:underline"
            >
              View analytics
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceByLevel.map((row) => (
              <BarRow
                key={row.level}
                label={row.level}
                percentage={row.percentage}
              />
            ))}
            <div className="flex items-center gap-2 rounded-lg bg-[#f2f2f2] dark:bg-[#041024] p-3 text-sm border border-transparent dark:border-[#1a365d] mt-4">
              <Percent className="size-4 text-[#0a2f66] dark:text-white" />
              <span className="text-[#6b6b6b] dark:text-[#8ba3c7]">
                Overall department attendance:{" "}
                <span className="font-semibold text-[#0a2f66] dark:text-white">
                  84%
                </span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions Card */}
        <Card className="bg-white dark:bg-[#0a1c3a] border-[#d9e3f6] dark:border-[#1a365d] border-t-4 border-t-[#0a2f66] dark:border-t-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] transition-all">
          <CardHeader>
            <CardTitle className="text-base text-[#0a2f66] dark:text-white">
              Active & recent sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.map((s) => {
              const course = courses.find((c) => c.id === s.courseId);
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-[#f2f2f2] dark:border-[#1a365d] bg-[#f2f2f2]/50 dark:bg-[#041024]/50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[#262626] dark:text-white">
                      {course?.code}
                    </p>
                    <p className="text-xs text-[#6b6b6b] dark:text-[#8ba3c7]">
                      {s.date} · {s.startTime}
                    </p>
                  </div>
                  {s.active ? (
                    <Badge className="bg-[#0a2f66] text-white hover:bg-[#0a2f66]/90 dark:bg-white dark:text-[#0a2f66] dark:hover:bg-[#d9e3f6] border-none shadow-sm transition-colors">
                      Live
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-[#f2f2f2] text-[#6b6b6b] hover:bg-[#d9e3f6] dark:bg-[#1a365d] dark:text-[#8ba3c7] dark:hover:bg-[#1a4b96]/40"
                    >
                      {s.present} present
                    </Badge>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
