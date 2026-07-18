"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useAvailableCourses } from "@/hook/useAvailableCourses";
import BACKENDAPI from "@/API";
import ProfileCard from "@/components/profile";
import CourseGrid, { Course } from "@/components/studentProfile/coursegrid";
import RegistrationFAB from "@/components/studentProfile/registrationFab";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const {
    availableCoursesLists,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useAvailableCourses();

  console.log("Returned courses:", availableCoursesLists);

  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const coursesArray = Array.isArray(availableCoursesLists)
    ? availableCoursesLists
    : availableCoursesLists || [];

  const pageData = {
    user: {
      fullName: user?.fullName || "",
      matric: user?.matricNumber || "",
      email: user?.email || "",
      department: user?.department || "",
      level: user?.level?.toString() || "",
    },
    registration: {
      availableCourses:
        coursesArray?.map((c: any) => ({
          id: c.id,
          code: c.course_code,
          title: c.title,
          credits: c.credits,
        })) || [],
    },
  };

  function toggleCourse(courseId: string) {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  }

  async function handleRegisterCourses() {
    setIsSubmitting(true);
    try {
      const response = await BACKENDAPI.post("register-courses", {
        courseIds: selectedCourseIds,
      });
      if (response.status == 200) {
        toast.success("Courses registered successfully!");
        setSelectedCourseIds([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to register courses.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleProfilePictureChange = () => {
    alert("Profile picture change functionality is not implemented yet.");
  };

  // Pagination Math
  const allCourses = pageData.registration.availableCourses;
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);
  const displayCourses = allCourses.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0a2f66] dark:text-white">
          Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[400px_1fr] xl:gap-12 items-start">
        <ProfileCard
          user={pageData.user}
          isLoading={coursesLoading || !user}
          onProfilePictureChange={handleProfilePictureChange}
        />

        <CourseGrid
          courses={displayCourses}
          isLoading={coursesLoading}
          selectedCourseIds={selectedCourseIds}
          onToggleCourse={toggleCourse}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <RegistrationFAB
        selectedCount={selectedCourseIds.length}
        isSubmitting={isSubmitting}
        onRegister={handleRegisterCourses}
      />
    </div>
  );
}
