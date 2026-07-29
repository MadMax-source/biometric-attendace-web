"use client";

import { useState } from "react";
import useSWR from "swr";
import BACKENDAPI from "@/API";
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
import { Loader2, AlertCircle, Database, Calendar } from "lucide-react";
import { useCourses } from "@/hook/usecourse";

export default function AttendanceRecordsPage() {
  const [courseFilter, setCourseFilter] = useState<string | null>("all");

  const { courses, isLoading: coursesLoading } = useCourses();

  const endpoint =
    !courseFilter || courseFilter === "all"
      ? "/attendance-records"
      : `/attendance-records/${courseFilter}`;

  const {
    data: recordsData,
    isLoading: recordsLoading,
    error: recordsError,
  } = useSWR(endpoint, async (url) => {
    const res = await BACKENDAPI.get(url);
    return res.data;
  });

  const rows = recordsData?.records || recordsData || [];

  return (
    <div className="space-y-6 pb-10 max-w-7xl mx-auto">
      <PageHeader
        title="Attendance Records"
        description="All recorded attendance sessions across department courses."
      />

      <div className="flex items-center gap-3">
        {(() => {
          const selectedCourseObj = courses.find(
            (c: any) => String(c.id) === String(courseFilter),
          );

          const selectedLabel =
            courseFilter === "all" || !courseFilter
              ? "All courses"
              : selectedCourseObj
                ? `${selectedCourseObj.course_code || selectedCourseObj.code} — ${selectedCourseObj.title}`
                : "Filter by course";

          return (
            <Select
              value={courseFilter || "all"}
              onValueChange={(value) => setCourseFilter(value || "all")}
            >
              <SelectTrigger className="w-72 h-12 rounded-xl bg-white dark:bg-[#0a1c3a] border-[#d9e3f6] dark:border-[#1a365d] text-[#0a2f66] dark:text-white font-semibold">
                <SelectValue placeholder="Filter by course">
                  {selectedLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#0a1c3a] border-[#d9e3f6] dark:border-[#1a365d]">
                <SelectItem
                  value="all"
                  className="text-[#262626] dark:text-white hover:bg-[#f2f2f2] dark:hover:bg-[#1a4b96]/40 cursor-pointer font-medium"
                >
                  All courses
                </SelectItem>
                {courses.map((c: any) => {
                  const code = c.course_code || c.code || `Course #${c.id}`;
                  const title = c.title || "";
                  const label = title ? `${code} — ${title}` : code;

                  return (
                    <SelectItem
                      key={c.id}
                      value={String(c.id)}
                      className="text-[#262626] dark:text-white hover:bg-[#f2f2f2] dark:hover:bg-[#1a4b96]/40 cursor-pointer font-medium"
                    >
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        })()}
      </div>

      <Card className="border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] rounded-[20px] overflow-hidden">
        <CardContent className="p-0">
          {recordsLoading || coursesLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="size-8 animate-spin text-[#0a2f66] dark:text-white" />
              <p className="text-sm font-semibold text-[#6b6b6b] dark:text-[#8ba3c7]">
                Fetching live records from database...
              </p>
            </div>
          ) : recordsError ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 mb-3">
                <AlertCircle className="size-6" />
              </div>
              <p className="text-base font-bold text-[#0a2f66] dark:text-white">
                Failed to load attendance records
              </p>
              <p className="text-sm text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
                Please check your server connection or backend endpoint route.
              </p>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <Database className="size-12 text-[#b2b2b2] dark:text-[#8ba3c7] mb-3" />
              <p className="text-base font-bold text-[#0a2f66] dark:text-white">
                No attendance sessions found
              </p>
              <p className="text-sm text-[#6b6b6b] dark:text-[#8ba3c7] mt-1">
                There are no recorded sessions matching the selected filter.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-[#f2f2f2]/50 dark:bg-[#041024]/50 border-b border-[#d9e3f6] dark:border-[#1a365d]">
                <TableRow className="hover:bg-transparent border-[#d9e3f6] dark:border-[#1a365d]">
                  <TableHead className="text-[#0a2f66] dark:text-white font-bold pl-6">
                    Course
                  </TableHead>
                  <TableHead className="text-[#0a2f66] dark:text-white font-bold">
                    Date & Time
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-[#0a2f66] dark:text-white font-bold">
                    Venue
                  </TableHead>
                  <TableHead className="text-right text-[#0a2f66] dark:text-white font-bold">
                    Present
                  </TableHead>
                  <TableHead className="text-right text-[#0a2f66] dark:text-white font-bold pr-6">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-[#f2f2f2] dark:divide-[#1a365d]">
                {rows.map((r: any) => (
                  <TableRow
                    key={r.id}
                    className="hover:bg-[#f2f2f2]/50 dark:hover:bg-[#1a365d]/40 transition-colors border-[#f2f2f2] dark:border-[#1a365d]"
                  >
                    <TableCell className="font-bold text-[#0a2f66] dark:text-white pl-6">
                      {r.course_code || r.course?.code || "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#262626] dark:text-white flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-[#b2b2b2] dark:text-[#8ba3c7]" />
                          {r.date}
                        </span>
                        <span className="text-xs font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-0.5">
                          {r.start_time || r.startTime} -{" "}
                          {r.end_time || r.endTime}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-[#6b6b6b] dark:text-[#8ba3c7] sm:table-cell font-medium">
                      {r.venue || "Main Auditorium"}
                    </TableCell>
                    <TableCell className="text-right font-black text-[#0a2f66] dark:text-white">
                      {r.present_count ?? r.present ?? 0}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {r.is_active || r.active ? (
                        <Badge className="bg-[#0a2f66] dark:bg-white text-white dark:text-[#0a2f66] hover:bg-[#0a2f66]/90 border-none shadow-sm transition-colors px-3 py-1">
                          Live
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-[#f2f2f2] text-[#6b6b6b] dark:bg-[#1a365d] dark:text-[#8ba3c7] border-none px-3 py-1"
                        >
                          Closed
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
