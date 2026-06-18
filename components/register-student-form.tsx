"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Check, Fingerprint, Loader2, ScanFace } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/widgets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const FACE_ANGLES = ["Front", "Left", "Right"] as const

export function RegisterStudentForm({ backHref }: { backHref: string }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [matric, setMatric] = useState("")
  const [level, setLevel] = useState("")
  const [capturedFaces, setCapturedFaces] = useState<string[]>([])
  const [capturingAngle, setCapturingAngle] = useState<string | null>(null)
  const [fingerScans, setFingerScans] = useState(0)
  const [scanning, setScanning] = useState(false)
  const [saving, setSaving] = useState(false)

  const faceDone = capturedFaces.length === FACE_ANGLES.length
  const fingerDone = fingerScans >= 2

  function captureFace(angle: string) {
    if (capturedFaces.includes(angle)) return
    setCapturingAngle(angle)
    setTimeout(() => {
      setCapturedFaces((prev) => [...prev, angle])
      setCapturingAngle(null)
      toast.success(`${angle} face captured`)
    }, 1200)
  }

  function scanFinger() {
    if (fingerDone) return
    setScanning(true)
    setTimeout(() => {
      setFingerScans((n) => n + 1)
      setScanning(false)
      toast.success(`Fingerprint scan ${fingerScans + 1} of 2 recorded`)
    }, 1200)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !matric || !level) {
      toast.error("Fill in all student details")
      return
    }
    if (!faceDone) {
      toast.error("Complete the face registration (3 angles)")
      return
    }
    if (!fingerDone) {
      toast.error("Scan the fingerprint twice")
      return
    }
    setSaving(true)
    setTimeout(() => {
      toast.success("Student Registered Successfully", { description: `${name} · ${matric}` })
      router.push(backHref)
    }, 900)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <PageHeader title="Register Student" description="Capture details and biometric templates." />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Student details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="matric">Matric Number</Label>
            <Input
              id="matric"
              value={matric}
              onChange={(e) => setMatric(e.target.value)}
              placeholder="2021/1/00000CP"
            />
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Input value="Computer Engineering" disabled />
          </div>
          <div className="space-y-2">
            <Label>Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {["100", "200", "300", "400", "500"].map((l) => (
                  <SelectItem key={l} value={l}>
                    {l} Level
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Face */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ScanFace className="size-4 text-primary" />
              Face Registration
              {faceDone && <Check className="size-4 text-primary" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {FACE_ANGLES.map((angle) => {
                const done = capturedFaces.includes(angle)
                const busy = capturingAngle === angle
                return (
                  <div
                    key={angle}
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-xs",
                      done ? "border-primary bg-primary/5 text-primary" : "text-muted-foreground",
                    )}
                  >
                    {busy ? (
                      <Loader2 className="size-5 animate-spin text-primary" />
                    ) : done ? (
                      <Check className="size-5" />
                    ) : (
                      <Camera className="size-5" />
                    )}
                    {angle}
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {FACE_ANGLES.map((angle) => (
                <Button
                  key={angle}
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={capturedFaces.includes(angle) || capturingAngle !== null}
                  onClick={() => captureFace(angle)}
                >
                  Capture {angle}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fingerprint */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Fingerprint className="size-4 text-primary" />
              Fingerprint Registration
              {fingerDone && <Check className="size-4 text-primary" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 py-2">
            <div
              className={cn(
                "flex size-28 items-center justify-center rounded-full border-2",
                fingerDone ? "border-primary bg-primary/5" : "border-dashed",
                scanning && "animate-pulse border-primary",
              )}
            >
              <Fingerprint className={cn("size-12", fingerDone ? "text-primary" : "text-muted-foreground")} />
            </div>
            <p className="text-sm text-muted-foreground">
              {fingerDone ? "Fingerprint template stored" : `Scanned ${fingerScans} of 2`}
            </p>
            <Button type="button" variant="outline" disabled={fingerDone || scanning} onClick={scanFinger}>
              {scanning && <Loader2 className="size-4 animate-spin" />}
              Scan Fingerprint
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push(backHref)}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save Student
        </Button>
      </div>
    </form>
  )
}
