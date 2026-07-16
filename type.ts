export interface Lecturer {
  id: string;
  full_name: string;
}

export interface CourseSchedule {
  id?: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  venue: string;
}

export interface CourseData {
  id: string;
  course_code: string;
  title: string;
  level: string;
  semester: string;
  credits: number;
  lecturerId: string | null;
  schedules?: CourseSchedule[];
}
