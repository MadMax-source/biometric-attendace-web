import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/auth-context";

export interface DashboardCourse {
  id: string;
  code: string;
  title: string;
  level: number;
  enrolled_count: number;
}

export interface TodaySchedule {
  id: string;
  course_id: string;
  code: string;
  title: string;
  start_time: string;
  end_time: string;
  venue: string;
  is_active: boolean;
}

export function useLecturerDashboard() {
  const { user } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user?.id ? "/lecturerDashboard" : null,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 60000, // Refresh every minute to catch active session changes
    },
  );

  // Extract the JSON data returned by the RPC
  const courses: DashboardCourse[] = data?.data?.courses || [];
  const schedule: TodaySchedule[] = data?.data?.today_schedule || [];

  // Calculate the stats automatically on the frontend!
  const totalStudents = courses.reduce(
    (sum, course) => sum + course.enrolled_count,
    0,
  );
  const activeScanners = schedule.filter((session) => session.is_active).length;

  console.log("Dashboard Data:", {
    courses,
    schedule,
    stats: {
      totalCourses: courses.length,
      todayClasses: schedule.length,
      totalStudents,
      activeScanners,
    },
  });

  return {
    courses,
    schedule,
    stats: {
      totalCourses: courses.length,
      todayClasses: schedule.length,
      totalStudents,
      activeScanners,
    },
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
