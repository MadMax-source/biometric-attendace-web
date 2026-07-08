"use client";

import Link from "next/link";
import { BookOpen, CalendarCheck, CheckCircle2, Users } from "lucide-react";
import { courses, sessions } from "@/lib/mock-data";
import { PageHeader, StatCard } from "@/components/widgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LECTURER = "Dr. D. Maliki";

export default function LecturerDashboard() {
  const myCourses = courses.filter((c) => c.lecturer === LECTURER);
  const myCourseIds = myCourses.map((c) => c.id);
  const todaySessions = sessions.filter((s) =>
    myCourseIds.includes(s.courseId),
  );
  const totalStudents = myCourses.reduce(
    (sum, c) => sum + c.studentIds.length,
    0,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${LECTURER}`}
        description="Your teaching activity today."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Assigned Courses"
          value={myCourses.length}
          icon={BookOpen}
        />
        <StatCard
          label="Today's Sessions"
          value={todaySessions.length}
          icon={CalendarCheck}
        />
        <StatCard
          label="Attendance Taken"
          value={1}
          icon={CheckCircle2}
          hint="Today"
        />
        <StatCard label="Total Students" value={totalStudents} icon={Users} />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">My Courses</CardTitle>
          <Link
            href="/lecturer/courses"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {myCourses.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold text-primary">{c.code}</p>
                <p className="text-sm text-muted-foreground">
                  {c.level} Level · {c.studentIds.length} students
                </p>
              </div>
              <Button size="sm" variant="outline">
                {" "}
                {/* i remove asChild */}
                <Link href={`/lecturer/courses/${c.id}`}>Open</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today&apos;s Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaySessions.map((s) => {
            const course = courses.find((c) => c.id === s.courseId);
            return (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {course?.code}{" "}
                    <span className="text-muted-foreground">· {s.venue}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.date} · {s.startTime} - {s.endTime}
                  </p>
                </div>
                {s.active ? (
                  <Button size="sm" variant="outline">
                    {" "}
                    {/*i remove asChild */}
                    <Link href={`/lecturer/courses/${s.courseId}/attendance`}>
                      Take Attendance
                    </Link>
                  </Button>
                ) : (
                  <Badge variant="secondary">{s.present} present</Badge>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
