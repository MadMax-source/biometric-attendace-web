"use client";

import { useState } from "react";
import { courses, sessions } from "@/lib/mock-data";
import { PageHeader } from "@/components/widgets";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AttendanceRecordsPage() {
  const [courseFilter, setCourseFilter] = useState<string | null>("all");

  const rows = sessions
    .filter((s) => courseFilter === "all" || s.courseId === courseFilter)
    .map((s) => ({ ...s, course: courses.find((c) => c.id === s.courseId) }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Records"
        description="All recorded attendance sessions."
      />

      <div className="flex items-center gap-3">
        <Select
          value={courseFilter}
          onValueChange={(value) => setCourseFilter(value)}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All courses</SelectItem>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden sm:table-cell">Venue</TableHead>
                <TableHead className="text-right">Present</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-primary">
                    {r.course?.code}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{r.date}</span>
                      <span className="text-xs text-muted-foreground">
                        {r.startTime} - {r.endTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {r.venue}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {r.present}
                  </TableCell>
                  <TableCell className="text-right">
                    {r.active ? (
                      <Badge className="bg-primary text-primary-foreground">
                        Live
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Closed</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
