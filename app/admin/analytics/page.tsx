import { attendanceByCourse, attendanceByLevel, weeklyAttendance } from "@/lib/mock-data"
import { PageHeader, BarRow } from "@/components/widgets"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  const maxWeekly = Math.max(...weeklyAttendance.map((w) => w.percentage))

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Attendance trends across the department." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attendance by Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceByCourse.map((row) => (
              <BarRow key={row.course} label={row.course} percentage={row.percentage} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attendance by Level</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceByLevel.map((row) => (
              <BarRow key={row.level} label={row.level} percentage={row.percentage} />
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-3 pt-4" style={{ height: 200 }}>
              {weeklyAttendance.map((w) => (
                <div key={w.week} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium text-primary">{w.percentage}%</span>
                  <div
                    className="w-full rounded-t-md bg-primary transition-all"
                    style={{ height: `${(w.percentage / maxWeekly) * 150}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{w.week}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
