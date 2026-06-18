import { CheckCircle2, XCircle } from "lucide-react"
import { PageHeader } from "@/components/widgets"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const HISTORY = [
  { id: "h1", date: "20 June 2026", course: "CPE121", status: "present" as const },
  { id: "h2", date: "19 June 2026", course: "CPE122", status: "present" as const },
  { id: "h3", date: "17 June 2026", course: "CPE123", status: "absent" as const },
  { id: "h4", date: "15 June 2026", course: "CPE121", status: "present" as const },
  { id: "h5", date: "13 June 2026", course: "MTH101", status: "absent" as const },
  { id: "h6", date: "12 June 2026", course: "CPE121", status: "present" as const },
  { id: "h7", date: "10 June 2026", course: "GST111", status: "present" as const },
]

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Attendance History" description="Your recent attendance across all courses." />

      <Card>
        <CardContent className="divide-y p-0">
          {HISTORY.map((h) => (
            <div key={h.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-primary">{h.course}</p>
                <p className="text-sm text-muted-foreground">{h.date}</p>
              </div>
              {h.status === "present" ? (
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
