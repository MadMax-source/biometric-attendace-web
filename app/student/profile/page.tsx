"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  BookOpen,
  Clock,
  CheckCircle2,
  Loader2,
  Check,
} from "lucide-react";
import BACKENDAPI from "@/API";

// Defining the Single Massive Object Type
type BackendPayload = {
  user: {
    name: string;
    matric: string;
    email: string;
    department: string;
    level: string;
  };
  Department: {
    availableDepartments: string[];
  };
  registration: {
    availableCourses: {
      id: string;
      code: string;
      title: string;
      credits: number;
    }[];
  };
};
// exactly the way i will query the data base later
const MOCK_BACKEND_RESPONSE: BackendPayload = {
  user: {
    name: "Sulyman Muhammad Sodiq",
    matric: "2021/1/81940CP",
    email: "muhammad.m190508@st.futminna.edu.ng",
    department: "Computer Engineering",
    level: "500 Level",
  },
  Department: {
    availableDepartments: [
      "Telecommunication Engineering",
      "Computer Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
  },
  registration: {
    availableCourses: [
      {
        id: "course_1",
        code: "CPE 501",
        title: "Software Engineering",
        credits: 3,
      },
      {
        id: "course_2",
        code: "CPE 503",
        title: "Computer Architecture",
        credits: 3,
      },
      {
        id: "course_3",
        code: "CPE 505",
        title: "Embedded Systems",
        credits: 3,
      },
      {
        id: "course_4",
        code: "CPE 507",
        title: "Artificial Intelligence",
        credits: 2,
      },
    ],
  },
};

export default function ProfilePage() {
  const [pageData, setPageData] = useState<BackendPayload | null>(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [editedDepartment, setEditedDepartment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        // Simulating API call to backend
        // const response = await BACKENDAPI.fetchUserDetails()
        // const data = await response.json()

        // Simulating network delay for the mock
        await new Promise((resolve) => setTimeout(resolve, 800));
        const data = MOCK_BACKEND_RESPONSE;

        setPageData(data);
        setEditedDepartment(data.user.department); // Initialize the dropdown
      } catch (error) {
        console.error("Error loading page data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  function toggleCourse(courseId: string) {
    setSelectedCourseIds((prevSelected) => {
      if (prevSelected.includes(courseId)) {
        return prevSelected.filter((id) => id !== courseId);
      }
      return [...prevSelected, courseId];
    });
  }
  const handleDepartmentChange = async (newDepartment: string) => {
    setEditedDepartment(newDepartment);
    // fetch available course for new department and update the pageData.registration.availableCourses accordingly base on user level and department
    // const response = await BACKENDAPI.get(
    //   `/courses?department=${newDepartment}&level=${pageData?.user.level}`,
    // );
    // MOCK_BACKEND_RESPONSE.registration.availableCourses = response.data.courses;
  };

  async function handleRegisterCourses() {
    setIsSubmitting(true);
    try {
      // Here i will send the selectedCourseIds to the backend for registration
      // const response = await BACKENDAPI.registerCourses(userid, selectedCourseIds)
      // const data = await response.json()

      console.log("Submitting IDs to backend:", selectedCourseIds);

      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Successfully registered ${selectedCourseIds.length} courses!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2d2e32] dark:text-slate-100">
          Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-12 items-start">
        {/* LEFT COLUMN: Profile Card */}
        <div className="flex w-full justify-center xl:justify-start">
          <div className="w-full max-w-[500px] rounded-[30px] bg-[#f7f2fe] dark:bg-purple-950/20 px-8 py-10 shadow-sm border border-purple-50 dark:border-purple-900/30 relative">
            <div className="relative mx-auto mb-10 size-28">
              <div className="size-full rounded-full border-4 border-white dark:border-slate-800 bg-[#d9d9d9] dark:bg-slate-700 shadow-sm"></div>
              <button className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-800 bg-[#16085a] text-white hover:bg-[#5e3bce] transition-colors">
                <Plus className="size-5" />
              </button>
            </div>

            {isLoading || !pageData ? (
              <div className="flex flex-col items-center justify-center py-10 text-purple-600 dark:text-purple-400">
                <Loader2 className="size-8 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={pageData.user.name}
                    disabled
                    className="w-full rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm opacity-80"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-300">
                    Matric No.
                  </label>
                  <input
                    type="text"
                    value={pageData.user.matric}
                    disabled
                    className="w-full rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm opacity-80"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-300">
                    Student Email
                  </label>
                  <input
                    type="text"
                    value={pageData.user.email}
                    disabled
                    className="w-full rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm opacity-80"
                  />
                </div>

                {/* Department Dropdown mapping from the backend payload */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-300">
                    Select your Department
                  </label>
                  <select
                    value={editedDepartment}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full cursor-pointer rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
                  >
                    {pageData.Department.availableDepartments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Courses Grid */}
        <div className="flex w-full flex-col">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Available Courses
            </h2>
            {!isLoading && pageData && (
              <span className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-400">
                {pageData.registration.availableCourses.length} Courses
              </span>
            )}
          </div>

          {isLoading || !pageData ? (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <Loader2 className="size-8 animate-spin" />
            </div>
          ) : pageData.registration.availableCourses.length === 0 ? (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 py-16">
              <p className="text-sm font-medium text-slate-500">
                No courses found for your level/department.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {pageData.registration.availableCourses.map((course) => {
                const isSelected = selectedCourseIds.includes(course.id);

                return (
                  <div
                    key={course.id}
                    className={`flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-50/50 dark:bg-purple-900/10 dark:border-purple-500"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[#f0f6ff] dark:bg-blue-950/30 text-[#5a8ce6]">
                        <BookOpen className="size-5" />
                      </div>

                      {isSelected ? (
                        <CheckCircle2 className="size-6 text-purple-600 dark:text-purple-400" />
                      ) : (
                        <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-700"></div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-black text-slate-800 dark:text-slate-100">
                        {course.code}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                        {course.title}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <Clock className="size-3.5" />
                        <span>{course.credits} Credits</span>
                      </div>

                      <button
                        onClick={() => toggleCourse(course.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          isSelected
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 hover:bg-purple-200"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {isSelected ? "Deselect" : "Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      {selectedCourseIds.length > 0 && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5">
          <button
            onClick={handleRegisterCourses}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-full bg-[#16085a] px-6 py-4 font-bold text-white shadow-xl hover:bg-[#5e3bce] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Check className="size-5" />
            )}
            Register {selectedCourseIds.length} Course
            {selectedCourseIds.length > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
