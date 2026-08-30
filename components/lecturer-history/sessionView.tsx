import { useState, useMemo, useEffect } from "react";
import { BookOpen, Loader2, XCircle } from "lucide-react";
import { useAttendanceHistory } from "@/hook/useAttendanceHistory";

import SemesterOverviewCard from "./semesterOverView";
import SessionControls from "./sessionControl";
import AttendanceStats from "./attendanceStat";
import AttendanceTable from "./attendanceTable";

interface SessionViewProps {
  selectedCourse: string | null;
}

export default function SessionView({ selectedCourse }: SessionViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { semesterData, isLoading, isError } =
    useAttendanceHistory(selectedCourse);

  // Reset selected date when course changes
  useEffect(() => {
    setSelectedDate("");
  }, [selectedCourse]);

  // Extract and sort dates dynamically
  const allDates = useMemo(() => {
    if (!semesterData || semesterData.length === 0) return [];
    const dates = new Set<string>();
    semesterData.forEach((student) => {
      Object.keys(student.attendance || {}).forEach((d) => dates.add(d));
    });
    return Array.from(dates).sort();
  }, [semesterData]);

  // Auto-select the latest date when data loads
  useEffect(() => {
    if (allDates.length > 0 && !allDates.includes(selectedDate)) {
      setSelectedDate(allDates[allDates.length - 1]);
    } else if (allDates.length === 0) {
      setSelectedDate("");
    }
  }, [allDates, selectedDate]);

  // Format daily table data with case-insensitive status
  const dailyTableData = useMemo(() => {
    if (!semesterData || semesterData.length === 0) return [];
    return semesterData.map((student) => {
      const rawStatus = student.attendance?.[selectedDate] || "Absent";
      const status =
        rawStatus.toLowerCase() === "present" ? "Present" : "Absent";
      return {
        id: student.id,
        matric: student.matric,
        name: student.name,
        status: status,
        timeIn: status === "Present" ? "Scanned" : "-",
      };
    });
  }, [semesterData, selectedDate]);

  const presentCount = dailyTableData.filter(
    (s) => s.status === "Present",
  ).length;
  const absentCount = dailyTableData.length - presentCount;

  // Export logic (unchanged)
  const handleExportSingleSessionCSV = () => {
    if (!selectedDate) return;
    const headers = ["Matric Number,Student Name,Status,Time In\n"];
    const rows = dailyTableData.map(
      (s) => `${s.matric},${s.name},${s.status},${s.timeIn}\n`,
    );
    triggerDownload(
      headers.concat(rows).join(""),
      `Daily_RollCall_${selectedDate}.csv`,
    );
  };

  const handleExportMasterCSV = () => {
    if (allDates.length === 0) return;
    const totalClasses = allDates.length;
    const headers = `Matric Number,Student Name,Total Classes,Classes Attended,Attendance %,${allDates.join(",")}\n`;

    const rows = semesterData.map((student) => {
      let attendedCount = 0;
      const dateStatuses = allDates.map((date) => {
        const raw = student.attendance?.[date] || "Absent";
        const status = raw.toLowerCase() === "present" ? "Present" : "Absent";
        if (status === "Present") attendedCount++;
        return status;
      });
      const percentage = Math.round((attendedCount / totalClasses) * 100);
      return `${student.matric},${student.name},${totalClasses},${attendedCount},${percentage}%,${dateStatuses.join(",")}\n`;
    });

    triggerDownload(
      headers + rows.join(""),
      `Semester_Report_${selectedCourse}.csv`,
    );
  };

  const triggerDownload = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Render logic ---

  if (!selectedCourse) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-[#0a1c3a] rounded-2xl border border-dashed border-[#d9e3f6] dark:border-[#1a365d]">
        <BookOpen className="size-12 text-[#b2b2b2] dark:text-[#8ba3c7] mb-4" />
        <h3 className="text-lg font-bold text-[#0a2f66] dark:text-white">
          No Course Selected
        </h3>
        <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-1 max-w-sm">
          Select a course from the sidebar to view its past attendance sessions
          and export reports.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 h-full">
        <Loader2 className="size-8 animate-spin text-[#0a2f66] dark:text-white mb-4" />
        <p className="text-sm font-bold text-[#6b6b6b] dark:text-[#8ba3c7]">
          Loading attendance data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 h-full text-center">
        <XCircle className="size-10 text-rose-500 mb-4" />
        <p className="text-lg font-bold text-rose-600">Failed to load data</p>
        <p className="text-sm text-[#6b6b6b] dark:text-[#8ba3c7] mt-2">
          The backend returned an error. Please try again.
        </p>
      </div>
    );
  }

  // If there are no attendance sessions at all, show a message
  if (allDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-[#0a1c3a] rounded-2xl border border-dashed border-[#d9e3f6] dark:border-[#1a365d]">
        <BookOpen className="size-12 text-[#b2b2b2] dark:text-[#8ba3c7] mb-4" />
        <h3 className="text-lg font-bold text-[#0a2f66] dark:text-white">
          No Attendance Sessions
        </h3>
        <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-1 max-w-sm">
          This course has no recorded attendance sessions yet.
        </p>
      </div>
    );
  }

  // If there are students but no attendance for the selected date, still show table with all absent.
  // But we already handle that in dailyTableData.

  return (
    <div className="flex flex-col gap-8">
      <SemesterOverviewCard
        totalSessions={allDates.length}
        totalStudents={semesterData.length}
        onExportMaster={handleExportMasterCSV}
      />

      <div className="flex items-center gap-4 py-2">
        <div className="h-px bg-[#d9e3f6] dark:bg-[#1a365d] flex-1"></div>
        <span className="text-xs font-bold text-[#b2b2b2] dark:text-[#8ba3c7] uppercase tracking-widest">
          Daily Sessions
        </span>
        <div className="h-px bg-[#d9e3f6] dark:bg-[#1a365d] flex-1"></div>
      </div>

      <SessionControls
        sessions={allDates}
        selectedSession={selectedDate}
        onSessionChange={setSelectedDate}
        onExportSession={handleExportSingleSessionCSV}
      />

      <AttendanceStats presentCount={presentCount} absentCount={absentCount} />

      <AttendanceTable
        attendanceData={dailyTableData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalEnrolled={semesterData.length}
      />
    </div>
  );
}
