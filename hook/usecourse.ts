import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useCourses() {
  const { data, error, isLoading, mutate } = useSWR("/getallcourses", fetcher, {
    revalidateOnFocus: true,
  });
  return {
    courses: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
