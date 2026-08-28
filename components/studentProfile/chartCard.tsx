"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { useStudentAttendance } from "@/hook/useAttendance";

// --------------------- Helper: Parse custom date ---------------------
function parseCustomDate(dateStr: string): Date | null {
  // Expected format: "26 August 2026" or "1 January 2024"
  const parts = dateStr.trim().split(" ");
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const monthName = parts[1];
  const year = parseInt(parts[2], 10);

  const monthMap: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const month = monthMap[monthName];
  if (month === undefined) return null;

  return new Date(year, month, day);
}

// --------------------- Data transformers ---------------------
function getCourseWiseData(courses: any[]) {
  return courses.map((course) => ({
    name: course.code || course.course_code || "Unknown",
    attendance:
      course.total > 0 ? Math.round((course.present / course.total) * 100) : 0,
    present: course.present || 0,
    total: course.total || 0,
  }));
}

function getMonthlyTrendData(courses: any[]) {
  const allHistory = courses.flatMap((c) =>
    (c.history || []).map((h: any) => ({
      ...h,
      courseCode: c.code || c.course_code,
    })),
  );

  const monthMap: Record<string, { present: number; total: number }> = {};

  allHistory.forEach((record: any) => {
    if (!record.date) return;
    const d = parseCustomDate(record.date);
    if (!d) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!monthMap[key]) monthMap[key] = { present: 0, total: 0 };
    monthMap[key].total += 1;
    if (record.status === "present") monthMap[key].present += 1;
  });

  return Object.entries(monthMap)
    .map(([month, data]) => ({
      month,
      attendance:
        data.total > 0 ? Math.round((data.present / data.total) * 100) : 0,
      present: data.present,
      total: data.total,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

// --------------------- Component ---------------------
export default function ChartCard() {
  const { courses, isLoading } = useStudentAttendance();
  const [view, setView] = useState<"course" | "monthly">("course");

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center rounded-[20px] bg-white dark:bg-[#0a1c3a] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-[#d9e3f6] dark:border-[#1a365d]">
        <p className="text-sm text-[#b2b2b2] dark:text-[#8ba3c7]">
          Loading chart...
        </p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-[20px] bg-white dark:bg-[#0a1c3a] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-[#d9e3f6] dark:border-[#1a365d]">
        <p className="text-sm text-[#b2b2b2] dark:text-[#8ba3c7]">
          No attendance data yet.
        </p>
      </div>
    );
  }

  const courseData = getCourseWiseData(courses);
  const monthlyData = getMonthlyTrendData(courses);

  // Determine max Y for consistent scaling
  const maxY = Math.max(
    100,
    ...(view === "course"
      ? courseData.map((d) => d.attendance)
      : monthlyData.map((d) => d.attendance)),
  );

  return (
    <div className="flex min-h-[400px] w-full flex-col rounded-[20px] bg-white dark:bg-[#0a1c3a] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-[#d9e3f6] dark:border-[#1a365d]">
      {/* Header with toggle */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0a2f66] dark:text-white">
          {view === "course"
            ? "Attendance by Course"
            : "Monthly Attendance Trend"}
        </h3>
        <div className="flex rounded-lg bg-[#f2f2f2] dark:bg-[#1a365d] p-1">
          <button
            onClick={() => setView("course")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              view === "course"
                ? "bg-white dark:bg-[#0a2f66] text-[#0a2f66] dark:text-white shadow-sm"
                : "text-[#8ba3c7] hover:text-[#0a2f66] dark:hover:text-white"
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              view === "monthly"
                ? "bg-white dark:bg-[#0a2f66] text-[#0a2f66] dark:text-white shadow-sm"
                : "text-[#8ba3c7] hover:text-[#0a2f66] dark:hover:text-white"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        {view === "course" ? (
          <BarChart
            data={courseData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis
              domain={[0, Math.min(100, maxY + 10)]}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Attendance"]}
              labelFormatter={(label) => `Course: ${label}`}
            />
            <Legend />
            <Bar
              dataKey="attendance"
              fill="#5a8ce6"
              radius={[4, 4, 0, 0]}
              name="Attendance %"
            />
          </BarChart>
        ) : (
          <LineChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis
              domain={[0, Math.min(100, maxY + 10)]}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Attendance"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#4ade80"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Attendance %"
            />
          </LineChart>
        )}
      </ResponsiveContainer>

      {/* Footer */}
      <div className="mt-2 flex justify-end gap-4 text-[10px] text-[#b2b2b2] dark:text-[#8ba3c7]">
        {view === "course" ? (
          <span>{courseData.length} courses shown</span>
        ) : (
          <span>{monthlyData.length} months</span>
        )}
      </div>
    </div>
  );
}
