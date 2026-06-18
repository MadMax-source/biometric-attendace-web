"use client"

import Link from "next/link"
import { BookOpen, Plus, UserPlus, Users } from "lucide-react"
import { courses } from "@/lib/mock-data"
import { PageHeader } from "@/components/widgets"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description={`${courses.length} courses this session`}
        action={
          <Button asChild>
            <Link href="/admin/courses/create">
              <Plus className="size-4" />
              Create Course
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="size-5" />
                </div>
                <Badge variant="secondary">{c.level} Level</Badge>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-primary">{c.code}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.title}</p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t pt-3 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="size-4" />
                  {c.studentIds.length} enrolled
                </span>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/courses/${c.id}`}>
                    <UserPlus className="size-4" />
                    Manage
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
