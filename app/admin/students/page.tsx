"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, ScanFace, Fingerprint } from "lucide-react"
import { students } from "@/lib/mock-data"
import { PageHeader } from "@/components/widgets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function StudentsPage() {
  const [query, setQuery] = useState("")
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.matric.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description={`${students.length} registered students`}
        action={
          <Button asChild>
            <Link href="/admin/students/register">
              <Plus className="size-4" />
              Register Student
            </Link>
          </Button>
        }
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or matric number"
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex flex-wrap items-center gap-4 p-4">
              <Avatar className="size-11">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {s.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{s.name}</p>
                <p className="text-sm text-primary">{s.matric}</p>
              </div>
              <div className="flex flex-col items-start gap-1 text-sm">
                <span className="text-muted-foreground">{s.level} Level</span>
                <span className="text-xs text-muted-foreground">{s.department}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant={s.faceRegistered ? "default" : "secondary"} className="gap-1">
                  <ScanFace className="size-3" />
                  {s.faceRegistered ? "Face" : "No face"}
                </Badge>
                <Badge variant={s.fingerprintRegistered ? "default" : "secondary"} className="gap-1">
                  <Fingerprint className="size-3" />
                  {s.fingerprintRegistered ? "Print" : "No print"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No students found.</p>
        )}
      </div>
    </div>
  )
}
