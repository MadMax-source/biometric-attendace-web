import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/auth-context";

export interface lecturer {
  id: string;
  full_name: string;
}

export function useLecturer() {
  const { user } = useAuth();

  const {
    data: lecturersData,
    error,
    isLoading,
    mutate,
  } = useSWR(user?.id ? `getalllecturers` : null, fetcher, {
    revalidateOnFocus: true,
  });
  console.log("lecturersData", lecturersData);
  const lecturersList: lecturer[] = lecturersData || [];

  return {
    lecturerLists: lecturersList,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
