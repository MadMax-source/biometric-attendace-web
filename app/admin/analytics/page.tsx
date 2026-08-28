"use client";

import { useAdminAttendanceOverview } from "@/hook/useAdminAttendanceOverview";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const calcPercent = (present: number, total: number) =>
  total > 0 ? Math.round((present / total) * 100) : 0;

export default function AnalyticsPage() {
  const { overview, isLoading, isError } = useAdminAttendanceOverview();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a2f66] dark:text-white" />
      </div>
    );
  }

  if (isError || !overview) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Failed to load attendance data.
      </div>
    );
  }

  const courseData = (overview.byCourse || []).map((c: any) => ({
    name: c.course,
    percentage: calcPercent(c.present, c.total),
    present: c.present,
    total: c.total,
  }));

  const levelData = (overview.byLevel || []).map((l: any) => ({
    name: `Level ${l.level}`,
    percentage: calcPercent(l.present, l.total),
    present: l.present,
    total: l.total,
  }));

  const weeklyData = (overview.weekly || []).map((w: any) => ({
    week: w.week,
    percentage: w.total > 0 ? Math.round((w.present / w.total) * 100) : 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0a2f66] dark:text-white">
          Analytics
        </h1>
        <p className="text-muted-foreground">
          Attendance trends across the department.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course-wise Attendance */}
        <Card className="border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] rounded-[20px]">
          <CardHeader>
            <CardTitle className="text-base text-[#0a2f66] dark:text-white">
              Attendance by Course
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courseData}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  labelFormatter={(l) => `Course: ${l}`}
                />
                <Bar
                  dataKey="percentage"
                  fill="#5a8ce6"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Level-wise Attendance */}
        <Card className="border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] rounded-[20px]">
          <CardHeader>
            <CardTitle className="text-base text-[#0a2f66] dark:text-white">
              Attendance by Level
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={levelData}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  labelFormatter={(l) => `Level: ${l}`}
                />
                <Bar
                  dataKey="percentage"
                  fill="#4ade80"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card className="lg:col-span-2 border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a] shadow-[0_24px_80px_rgba(15,23,42,0.12)] rounded-[20px]">
          <CardHeader>
            <CardTitle className="text-base text-[#0a2f66] dark:text-white">
              Weekly Attendance Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#5a8ce6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Attendance %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
