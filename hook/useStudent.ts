import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/auth-context";

export interface Students {
  id: string;
  matric_number: string;
  full_name: string;
  department: string;
  level: string;
  enrolled: boolean;
  profile_image?: string;
}

export function useStudents() {
  const { user } = useAuth();

  const {
    data: studentsData,
    error,
    isLoading,
    mutate,
  } = useSWR(user?.id ? `getallstudents` : null, fetcher, {
    revalidateOnFocus: true,
  });
  console.log("studentsData", studentsData);
  const studentsList: Students[] = studentsData || [];

  return {
    studentLists: studentsList,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
