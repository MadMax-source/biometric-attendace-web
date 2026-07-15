export type Role = "admin" | "lecturer" | "student";

export type User = {
  email: string;
  imageurl: string;
  role: string;
  matricNumber: string;
  phoneNumber: string;
  fullName: string;
  token: string;
  department: string;
  id: string;
  level: string;
};

export type Student = {
  id: string;
  matric: string;
  full_name: string;
  level: string;
  department: string;
  faceRegistered: boolean;
  fingerprintRegistered: boolean;
  profile_Image?: string;
  enrolled: boolean;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  level: string;
  semester: string;
  lecturer: string;
  studentIds: string[];
};

export type AttendanceRecord = {
  id: string;
  date: string;
  status: "present" | "absent";
};

export type Session = {
  id: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  present: number;
  active: boolean;
};

export const DEMO_ACCOUNTS: {
  full_name: string;
  email: string;
  password: string;
  role: Role;
}[] = [
  {
    full_name: "Administrator",
    email: "admin@futminna.edu.ng",
    password: "password",
    role: "admin",
  },
  {
    full_name: "Dr. D. Maliki",
    email: "d.maliki@futminna.edu.ng",
    password: "password",
    role: "lecturer",
  },
  {
    full_name: "Muhammad Sodiq",
    email: "m.sodiq@futminna.edu.ng",
    password: "password",
    role: "student",
  },
];

export const students: Student[] = [
  {
    id: "s1",
    matric: "2021/1/81940CP",
    full_name: "Sulyman Muhammad Sodiq",
    level: "100",
    department: "Computer Engineering",
    faceRegistered: true,
    fingerprintRegistered: true,
    profile_Image: "https://randomuser.me/api/portraits/men/1.jpg",
    enrolled: true,
  },
  {
    id: "s2",
    matric: "2021/1/81941CP",
    full_name: "Victor Okonkwo",
    level: "100",
    department: "Computer Engineering",
    faceRegistered: true,
    fingerprintRegistered: false,
    profile_Image: undefined,
    enrolled: true,
  },
  {
    id: "s3",
    matric: "2021/1/81942CP",
    full_name: "Musa Ibrahim",
    level: "100",
    department: "Computer Engineering",
    faceRegistered: true,
    fingerprintRegistered: true,
    profile_Image: "https://randomuser.me/api/portraits/men/2.jpg",
    enrolled: true,
  },
  {
    id: "s4",
    matric: "2021/1/81943CP",
    full_name: "Ibrahim Bello",
    level: "200",
    department: "Computer Engineering",
    faceRegistered: false,
    fingerprintRegistered: true,
    profile_Image: undefined,
    enrolled: true,
  },
  {
    id: "s5",
    matric: "2021/1/81944CP",
    full_name: "Aisha Lawal",
    level: "200",
    department: "Computer Engineering",
    faceRegistered: true,
    fingerprintRegistered: true,
    profile_Image: "https://randomuser.me/api/portraits",
    enrolled: true,
  },
  {
    id: "s6",
    matric: "2021/1/81945CP",
    full_name: "Chidinma Eze",
    level: "300",
    department: "Computer Engineering",
    faceRegistered: true,
    fingerprintRegistered: true,
    profile_Image: "https://randomuser.me/api/portraits/women/3.jpg",
    enrolled: true,
  },
  {
    id: "s7",
    matric: "2021/1/81946CP",
    full_name: "Daniel Adeyemi",
    level: "300",
    department: "Computer Engineering",
    faceRegistered: false,
    fingerprintRegistered: false,
    profile_Image: undefined,
    enrolled: true,
  },
  {
    id: "s8",
    matric: "2021/1/81947CP",
    full_name: "Fatima Yusuf",
    level: "100",
    department: "Computer Engineering",
    faceRegistered: true,
    fingerprintRegistered: true,
    profile_Image: "https://randomuser.me/api/portraits/women/4.jpg",
    enrolled: true,
  },
];

export const courses: Course[] = [
  {
    id: "c1",
    code: "CPE121",
    title: "Introduction to Computer Engineering",
    level: "100",
    semester: "First Semester",
    lecturer: "Dr. D. Maliki",
    studentIds: ["s1", "s2", "s3", "s8"],
  },
  {
    id: "c2",
    code: "CPE122",
    title: "Digital Logic Design",
    level: "100",
    semester: "First Semester",
    lecturer: "Dr. D. Maliki",
    studentIds: ["s1", "s3", "s8"],
  },
  {
    id: "c3",
    code: "CPE123",
    title: "Programming Fundamentals",
    level: "100",
    semester: "Second Semester",
    lecturer: "Engr. A. Bala",
    studentIds: ["s1", "s2", "s8"],
  },
  {
    id: "c4",
    code: "CPE221",
    title: "Circuit Theory",
    level: "200",
    semester: "First Semester",
    lecturer: "Dr. D. Maliki",
    studentIds: ["s4", "s5"],
  },
  {
    id: "c5",
    code: "CPE311",
    title: "Microprocessors",
    level: "300",
    semester: "First Semester",
    lecturer: "Prof. K. Usman",
    studentIds: ["s6", "s7"],
  },
];

export const sessions: Session[] = [
  {
    id: "se1",
    courseId: "c1",
    date: "20/06/2026",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    venue: "ETF Lecture Hall",
    present: 0,
    active: true,
  },
  {
    id: "se2",
    courseId: "c2",
    date: "20/06/2026",
    startTime: "12:00 PM",
    endTime: "2:00 PM",
    venue: "SEET Hall A",
    present: 28,
    active: false,
  },
  {
    id: "se3",
    courseId: "c4",
    date: "19/06/2026",
    startTime: "8:00 AM",
    endTime: "10:00 AM",
    venue: "ETF Lecture Hall",
    present: 41,
    active: false,
  },
];

export const studentAttendanceHistory: AttendanceRecord[] = [
  { id: "a1", date: "12 June 2026", status: "present" },
  { id: "a2", date: "15 June 2026", status: "present" },
  { id: "a3", date: "17 June 2026", status: "absent" },
  { id: "a4", date: "19 June 2026", status: "present" },
  { id: "a5", date: "20 June 2026", status: "present" },
];

// Admin analytics
export const attendanceByLevel = [
  { level: "100 Level", percentage: 89 },
  { level: "200 Level", percentage: 85 },
  { level: "300 Level", percentage: 78 },
];

export const attendanceByCourse = [
  { course: "CPE121", percentage: 92 },
  { course: "CPE122", percentage: 86 },
  { course: "CPE123", percentage: 80 },
  { course: "CPE221", percentage: 88 },
  { course: "CPE311", percentage: 74 },
];

export const weeklyAttendance = [
  { week: "Wk 1", percentage: 82 },
  { week: "Wk 2", percentage: 86 },
  { week: "Wk 3", percentage: 79 },
  { week: "Wk 4", percentage: 90 },
  { week: "Wk 5", percentage: 88 },
  { week: "Wk 6", percentage: 84 },
];

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}

export function getStudentById(id: string) {
  return students.find((s) => s.id === id);
}

export function getStudentByMatric(matric: string) {
  return students.find((s) => s.matric.toLowerCase() === matric.toLowerCase());
}
