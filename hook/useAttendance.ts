import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/auth-context";

export function useStudentAttendance() {
  const { user } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user?.id ? "/register-courses-attendance-details" : null,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 300000,
    },
  );

  return {
    courses: data?.data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
