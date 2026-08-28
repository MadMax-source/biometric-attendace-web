import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/auth-context";

export function useActiveCourses() {
  const { user } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user?.id ? "/active-courses" : null,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
    },
  );

  return {
    activeCourses: data?.data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
