"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CalendarCheck, CheckCircle2, XCircle } from "lucide-react"
import { studentAttendanceHistory } from "@/lib/mock-data"
import { STUDENT_COURSES } from "@/app/student/courses/page"
import { PageHeader, StatCard } from "@/components/widgets"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function StudentCourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const course = STUDENT_COURSES.find((c) => c.id === id) ?? STUDENT_COURSES[0]
  const absent = course.total - course.present
  const pct = Math.round((course.present / course.total) * 100)

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" className="-ml-2" onClick={() => router.push("/student/courses")}>
        <ArrowLeft className="size-4" />
        Back to my courses
      </Button>

      <PageHeader title={`${course.code} — ${course.title}`} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Classes" value={course.total} icon={CalendarCheck} />
        <StatCard label="Present" value={course.present} icon={CheckCircle2} />
        <StatCard label="Absent" value={absent} icon={XCircle} />
        <StatCard label="Percentage" value={`${pct}%`} icon={CalendarCheck} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance Percentage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{course.present} of {course.total} classes</span>
            <span className="font-semibold text-primary">{pct}%</span>
          </div>
          <Progress value={pct} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Class Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {studentAttendanceHistory.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">{r.date}</span>
              {r.status === "present" ? (
                <Badge className="gap-1 bg-primary text-primary-foreground">
                  <CheckCircle2 className="size-3" />
                  Present
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <XCircle className="size-3" />
                  Absent
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
