import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/auth-context";

export interface AttendanceLevelData {
  level: string;
  percentage: number;
}

export interface AdminRecentSession {
  id: string;
  course_id: string;
  course_code: string;
  date: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  present_count: number;
}

export function useAdminDashboard() {
  const { user } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user?.id ? "/adminDashboard" : null,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 60000,
    },
  );

  const extractedData = data?.data || data || {};

  const stats = {
    totalStudents: extractedData.total_students || 0,
    totalLecturers: extractedData.total_lecturers || 0,
    totalCourses: extractedData.total_courses || 0,
    todaysAttendance: extractedData.todays_attendance || 0,
    activeSessions: extractedData.active_sessions_count || 0,
    overallAttendance: extractedData.overall_attendance_percentage || 0,
  };

  const attendanceByLevel: AttendanceLevelData[] =
    extractedData.attendance_by_level || [];
  const recentSessions: AdminRecentSession[] =
    extractedData.recent_sessions || [];

  return {
    stats,
    attendanceByLevel,
    recentSessions,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
