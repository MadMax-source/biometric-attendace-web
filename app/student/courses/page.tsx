import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/widgets"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const STUDENT_COURSES = [
  { id: "c1", code: "CPE121", title: "Introduction to Computer Engineering", present: 10, total: 12 },
  { id: "c2", code: "CPE122", title: "Digital Logic Design", present: 11, total: 12 },
  { id: "c3", code: "CPE123", title: "Programming Fundamentals", present: 8, total: 11 },
  { id: "c4", code: "MEE111", title: "Engineering Drawing", present: 9, total: 10 },
  { id: "c5", code: "MTH101", title: "Elementary Mathematics I", present: 7, total: 12 },
  { id: "c6", code: "GST111", title: "Communication in English", present: 12, total: 12 },
]

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Courses" description="Courses you are enrolled in this semester." />
      <div className="grid gap-3">
        {STUDENT_COURSES.map((c) => {
          const pct = Math.round((c.present / c.total) * 100)
          return (
            <Link key={c.id} href={`/student/courses/${c.id}`}>
              <Card className="transition-colors hover:border-primary/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary">{c.code}</p>
                        <p className="truncate text-sm text-muted-foreground">{c.title}</p>
                      </div>
                      <span className="text-sm font-medium">
                        {c.present} / {c.total}
                      </span>
                    </div>
                    <Progress value={pct} />
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
