import Link from "next/link"
import { BookOpen, CalendarCheck, Percent, XCircle } from "lucide-react"
import { PageHeader, StatCard } from "@/components/widgets"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const STUDENT = {
  name: "Sulyman Muhammad Sodiq",
  matric: "2021/1/81940CP",
  courses: 6,
  attended: 45,
  percentage: 90,
  missed: 5,
}

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title={`Hi, ${STUDENT.name.split(" ")[0]}`} description={STUDENT.matric} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Courses Enrolled" value={STUDENT.courses} icon={BookOpen} />
        <StatCard label="Classes Attended" value={STUDENT.attended} icon={CalendarCheck} hint="This semester" />
        <StatCard label="Attendance" value={`${STUDENT.percentage}%`} icon={Percent} hint="Overall" />
        <StatCard label="Classes Missed" value={STUDENT.missed} icon={XCircle} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Overall Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This semester</span>
            <span className="font-semibold text-primary">{STUDENT.percentage}%</span>
          </div>
          <Progress value={STUDENT.percentage} />
          <p className="text-sm text-muted-foreground leading-relaxed">
            You are above the 75% minimum requirement. Keep it up.{" "}
            <Link href="/student/courses" className="font-medium text-primary hover:underline">
              View your courses
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
