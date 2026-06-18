"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CalendarClock, Loader2, MapPin, Play, Users } from "lucide-react"
import { toast } from "sonner"
import { courses, getCourseById } from "@/lib/mock-data"
import { PageHeader } from "@/components/widgets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LecturerCourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const course = getCourseById(id) ?? courses[0]

  const [form, setForm] = useState({
    date: "20/06/2026",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    venue: "ETF Lecture Hall",
  })
  const [starting, setStarting] = useState(false)

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function startSession() {
    if (Object.values(form).some((v) => !v)) {
      toast.error("Fill in all session details")
      return
    }
    setStarting(true)
    setTimeout(() => {
      toast.success("Attendance session started")
      router.push(`/lecturer/courses/${course.id}/attendance`)
    }, 800)
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" className="-ml-2" onClick={() => router.push("/lecturer/courses")}>
        <ArrowLeft className="size-4" />
        Back to my courses
      </Button>

      <PageHeader
        title={`${course.code} — ${course.title}`}
        description={`${course.level} Level · ${course.semester}`}
        action={
          <Badge variant="secondary" className="gap-1">
            <Users className="size-3" />
            {course.studentIds.length} students
          </Badge>
        }
      />

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarClock className="size-4 text-primary" />
            Start Attendance Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Course</Label>
              <Input value={course.code} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start">Start Time</Label>
              <Input id="start" value={form.startTime} onChange={(e) => update("startTime", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Time</Label>
              <Input id="end" value={form.endTime} onChange={(e) => update("endTime", e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="venue">
                <MapPin className="mr-1 inline size-3.5" />
                Venue
              </Label>
              <Input id="venue" value={form.venue} onChange={(e) => update("venue", e.target.value)} />
            </div>
          </div>
          <Button onClick={startSession} disabled={starting} className="w-full sm:w-auto">
            {starting ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
            Start Attendance Session
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
