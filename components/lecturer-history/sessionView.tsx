import { useState } from "react";
import { BookOpen } from "lucide-react";
import SemesterOverviewCard from "./semesterOverView";
import SessionControls from "./sessionControl";
import AttendanceStats from "./attendanceStat";
import AttendanceTable from "./attendanceTable";

interface SessionViewProps {
  selectedCourse: string | null;
}

export default function SessionView({ selectedCourse }: SessionViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // MOCK DATA (Will be replaced by API later)

  const mockSessions = [
    {
      id: "1",
      date: "2026-07-10",
      time: "10:00 AM - 12:00 PM",
      present: 45,
      total: 50,
    },
    {
      id: "2",
      date: "2026-07-05",
      time: "10:00 AM - 12:00 PM",
      present: 48,
      total: 50,
    },
  ];

  const mockAttendanceData = [
    {
      id: "1",
      name: "Salam Sodiq",
      matric: "ENG/21/001",
      status: "Present",
      timeIn: "10:05 AM",
    },
    {
      id: "2",
      name: "John Doe",
      matric: "ENG/21/002",
      status: "Absent",
      timeIn: "-",
    },
    {
      id: "3",
      name: "Jane Smith",
      matric: "ENG/21/003",
      status: "Present",
      timeIn: "10:12 AM",
    },
  ];

  const mockSemesterData = [
    {
      matric: "ENG/21/001",
      name: "Salam Sodiq",
      attendance: {
        "2026-07-05": "Present",
        "2026-07-10": "Present",
        "2026-07-17": "Present",
      },
    },
    {
      matric: "ENG/21/002",
      name: "John Doe",
      attendance: {
        "2026-07-05": "Absent",
        "2026-07-10": "Present",
        "2026-07-17": "Absent",
      },
    },
    {
      matric: "ENG/21/003",
      name: "Jane Smith",
      attendance: {
        "2026-07-05": "Present",
        "2026-07-10": "Absent",
        "2026-07-17": "Present",
      },
    },
  ];

  // EXPORT LOGIC
  const handleExportSingleSessionCSV = () => {
    const headers = ["Matric Number,Student Name,Status,Time In\n"];
    const rows = mockAttendanceData.map(
      (s) => `${s.matric},${s.name},${s.status},${s.timeIn}\n`,
    );
    triggerDownload(
      headers.concat(rows).join(""),
      `Daily_RollCall_${selectedCourse}.csv`,
    );
  };

  const handleExportMasterCSV = () => {
    const allDates = ["2026-07-05", "2026-07-10", "2026-07-17"];
    const totalClasses = allDates.length;
    const headers = `Matric Number,Student Name,Total Classes,Classes Attended,Attendance %,${allDates.join(",")}\n`;

    const rows = mockSemesterData.map((student) => {
      let presentCount = 0;
      const dateStatuses = allDates.map((date) => {
        const status =
          student.attendance[date as keyof typeof student.attendance] ||
          "Absent";
        if (status === "Present") presentCount++;
        return status;
      });
      const percentage = Math.round((presentCount / totalClasses) * 100);
      return `${student.matric},${student.name},${totalClasses},${presentCount},${percentage}%,${dateStatuses.join(",")}\n`;
    });

    triggerDownload(
      headers + rows.join(""),
      `Master_Semester_Report_${selectedCourse}.csv`,
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

  if (!selectedCourse) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
        <BookOpen className="size-12 text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
          No Course Selected
        </h3>
        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
          Select a course from the sidebar to view its past attendance sessions
          and export reports.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <SemesterOverviewCard
        totalSessions={3}
        totalStudents={50}
        onExportMaster={handleExportMasterCSV}
      />

      <div className="flex items-center gap-4 py-2">
        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Daily Sessions
        </span>
        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
      </div>

      <SessionControls
        sessions={mockSessions}
        onExportSession={handleExportSingleSessionCSV}
      />

      <AttendanceStats presentCount={45} absentCount={5} />

      <AttendanceTable
        attendanceData={mockAttendanceData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalEnrolled={50}
      />
    </div>
  );
}
