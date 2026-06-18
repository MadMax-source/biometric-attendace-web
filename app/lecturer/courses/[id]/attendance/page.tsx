"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  Fingerprint,
  Loader2,
  ScanFace,
  UserCheck,
} from "lucide-react"
import { courses, getCourseById, students } from "@/lib/mock-data"
import { PageHeader } from "@/components/widgets"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Phase = "idle" | "scanning" | "identified" | "marked"

export default function TakeAttendancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const course = getCourseById(id) ?? courses[0]
  const roster = students.filter((s) => course.studentIds.includes(s.id))

  const [present, setPresent] = useState(0)
  const [queueIndex, setQueueIndex] = useState(0)
  const [facePhase, setFacePhase] = useState<Phase>("idle")
  const [fingerPhase, setFingerPhase] = useState<Phase>("idle")
  const [lastMarked, setLastMarked] = useState<{ name: string; time: string } | null>(null)

  const current = roster[queueIndex % roster.length]

  function nowTime() {
    return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  function runScan(setPhase: (p: Phase) => void) {
    setPhase("scanning")
    setTimeout(() => setPhase("identified"), 1500)
  }

  function mark(setPhase: (p: Phase) => void) {
    setPresent((n) => n + 1)
    setLastMarked({ name: current.name, time: nowTime() })
    setPhase("marked")
    setTimeout(() => {
      setQueueIndex((i) => i + 1)
      setPhase("idle")
    }, 1600)
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => router.push(`/lecturer/courses/${course.id}`)}
      >
        <ArrowLeft className="size-4" />
        Back to session setup
      </Button>

      <PageHeader
        title="Session Active"
        description={`${course.code} — ${course.title}`}
        action={<Badge className="gap-1.5 bg-primary text-primary-foreground">Live</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Students Present</p>
            <p className="text-3xl font-semibold text-primary">{present}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Enrolled</p>
            <p className="text-3xl font-semibold">{roster.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Venue</p>
            <p className="text-lg font-medium">ETF Lecture Hall</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Capture Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="face">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="face" className="gap-1.5">
                <ScanFace className="size-4" />
                Face
              </TabsTrigger>
              <TabsTrigger value="finger" className="gap-1.5">
                <Fingerprint className="size-4" />
                Fingerprint
              </TabsTrigger>
            </TabsList>

            {/* FACE */}
            <TabsContent value="face" className="pt-6">
              <CapturePanel
                phase={facePhase}
                modeIcon={<ScanFace className="size-12" />}
                idleHint="Student approaches the camera"
                scanningHint="Verifying face..."
                identifiedLabel="Student Identified"
                current={current}
                lastMarked={lastMarked}
                onScan={() => runScan(setFacePhase)}
                onMark={() => mark(setFacePhase)}
                scanLabel="Start Scanning"
              />
            </TabsContent>

            {/* FINGERPRINT */}
            <TabsContent value="finger" className="pt-6">
              <CapturePanel
                phase={fingerPhase}
                modeIcon={<Fingerprint className="size-12" />}
                idleHint="Student places finger on the scanner"
                scanningHint="Matching fingerprint..."
                identifiedLabel="Fingerprint Match Found"
                current={current}
                lastMarked={lastMarked}
                onScan={() => runScan(setFingerPhase)}
                onMark={() => mark(setFingerPhase)}
                scanLabel="Scan Fingerprint"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function CapturePanel({
  phase,
  modeIcon,
  idleHint,
  scanningHint,
  identifiedLabel,
  current,
  lastMarked,
  onScan,
  onMark,
  scanLabel,
}: {
  phase: Phase
  modeIcon: React.ReactNode
  idleHint: string
  scanningHint: string
  identifiedLabel: string
  current: { name: string; matric: string }
  lastMarked: { name: string; time: string } | null
  onScan: () => void
  onMark: () => void
  scanLabel: string
}) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div
        className={cn(
          "flex size-44 items-center justify-center rounded-2xl border-2",
          phase === "scanning" && "animate-pulse border-primary text-primary",
          phase === "identified" && "border-primary bg-primary/5 text-primary",
          phase === "marked" && "border-primary bg-primary/10 text-primary",
          phase === "idle" && "border-dashed text-muted-foreground",
        )}
      >
        {phase === "scanning" ? (
          <Loader2 className="size-12 animate-spin" />
        ) : phase === "marked" ? (
          <CheckCircle2 className="size-14" />
        ) : (
          modeIcon
        )}
      </div>

      {phase === "idle" && (
        <>
          <p className="text-sm text-muted-foreground">{idleHint}</p>
          <Button onClick={onScan}>{scanLabel}</Button>
        </>
      )}

      {phase === "scanning" && <p className="text-sm text-muted-foreground">{scanningHint}</p>}

      {phase === "identified" && (
        <div className="w-full max-w-xs space-y-4">
          <Badge variant="secondary" className="gap-1.5">
            <UserCheck className="size-3.5" />
            {identifiedLabel}
          </Badge>
          <div className="rounded-lg border p-4 text-left">
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="font-medium">{current.name}</p>
            <p className="mt-2 text-xs text-muted-foreground">Matric</p>
            <p className="font-medium text-primary">{current.matric}</p>
          </div>
          <Button className="w-full" onClick={onMark}>
            Mark Attendance
          </Button>
        </div>
      )}

      {phase === "marked" && lastMarked && (
        <div className="space-y-1">
          <p className="text-lg font-semibold text-primary">Attendance Recorded</p>
          <p className="text-sm text-muted-foreground">
            {lastMarked.name} · {lastMarked.time}
          </p>
        </div>
      )}
    </div>
  )
}
