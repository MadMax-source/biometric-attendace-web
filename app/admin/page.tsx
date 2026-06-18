"use client"

import Link from "next/link"
import { Activity, BookOpen, CalendarCheck, Percent, Users } from "lucide-react"
import { courses, sessions, students, attendanceByLevel } from "@/lib/mock-data"
import { PageHeader, StatCard, BarRow } from "@/components/widgets"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const activeSessions = sessions.filter((s) => s.active).length
  const todayAttendance = sessions.reduce((sum, s) => sum + s.present, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="Department-wide attendance at a glance."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Students" value={420} icon={Users} hint="Computer Engineering" />
        <StatCard label="Total Courses" value={courses.length} icon={BookOpen} hint="This session" />
        <StatCard label="Today's Attendance" value={351} icon={CalendarCheck} hint="Marked today" />
        <StatCard label="Active Sessions" value={activeSessions} icon={Activity} hint="Running now" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Attendance by level</CardTitle>
            <Link href="/admin/analytics" className="text-sm font-medium text-primary hover:underline">
              View analytics
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceByLevel.map((row) => (
              <BarRow key={row.level} label={row.level} percentage={row.percentage} />
            ))}
            <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3 text-sm">
              <Percent className="size-4 text-primary" />
              <span className="text-muted-foreground">
                Overall department attendance:{" "}
                <span className="font-semibold text-primary">84%</span>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active & recent sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.map((s) => {
              const course = courses.find((c) => c.id === s.courseId)
              return (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{course?.code}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.date} · {s.startTime}
                    </p>
                  </div>
                  {s.active ? (
                    <Badge className="bg-primary text-primary-foreground">Live</Badge>
                  ) : (
                    <Badge variant="secondary">{s.present} present</Badge>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
