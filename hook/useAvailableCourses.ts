import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/auth-context";

export interface AvailableCourse {
  id: string;
  course_code: string;
  title: string;
  credits: number;
}

export function useAvailableCourses() {
  const { user } = useAuth();

  const {
    data: availableCoursesData,
    error,
    isLoading,
    mutate,
  } = useSWR(user?.id ? `available-courses` : null, fetcher, {
    revalidateOnFocus: true,
  });

  const extractedData = availableCoursesData?.data || availableCoursesData;
  const availableCoursesList: AvailableCourse[] = Array.isArray(extractedData)
    ? extractedData
    : [];

  return {
    availableCoursesLists: availableCoursesList,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
