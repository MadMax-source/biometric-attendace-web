import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useAdminAttendanceOverview() {
  const { data, error, isLoading, mutate } = useSWR(
    "/attendanceOverview",
    fetcher,
    { revalidateOnFocus: true, refreshInterval: 60000 },
  );
  return {
    overview: data?.data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
