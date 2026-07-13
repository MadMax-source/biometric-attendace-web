import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export interface StudentAttendance {
  id: string;
  matric: string;
  name: string;
  attendance: Record<string, string>;
}

export function useAttendanceHistory(courseId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    courseId ? `courses/${courseId}/semester-report` : null,
    fetcher,
    {
      revalidateOnFocus: true,
    },
  );

  const semesterData: StudentAttendance[] = data?.data || [];

  return {
    semesterData,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
