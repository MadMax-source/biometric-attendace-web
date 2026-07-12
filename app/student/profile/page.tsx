"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import BACKENDAPI from "@/API";
import ProfileCard from "@/components/profile";
import CourseGrid, { Course } from "@/components/studentProfile/coursegrid";
import RegistrationFAB from "@/components/studentProfile/registrationFab";
import { toast } from "sonner";

type ProfilePayload = {
  user: {
    fullName: string;
    matric: string;
    email: string;
    department: string;
    level: string;
  };
  registration: { availableCourses: Course[] };
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [pageData, setPageData] = useState<ProfilePayload | null>(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    if (!user) return;

    async function fetchAvailableCourseforStudent() {
      const basePageData = {
        user: {
          fullName: user?.fullName || "",
          matric: user?.matricNumber || "",
          email: user?.email || "",
          department: user?.department || "",
          level: user?.level?.toString() || "",
        },
        registration: { availableCourses: [] },
      };

      if (!user?.level) {
        setPageData(basePageData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await BACKENDAPI.get("available-courses");
        const fetchedCourses = response.data.data;

        setPageData({
          ...basePageData,
          registration: {
            availableCourses:
              fetchedCourses?.map((c: any) => ({
                id: c.id,
                code: c.code || c.course_code,
                title: c.title,
                credits: c.credits,
              })) || [],
          },
        });
      } catch (error) {
        console.error("Failed to load courses:", error);
        setPageData(basePageData);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAvailableCourseforStudent();
  }, [user]);

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
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleProfilePictureChange = () => {
    alert("Profile picture change functionality is not implemented yet.");
  };

  // Pagination Math
  const allCourses = pageData?.registration?.availableCourses || [];
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);
  const displayCourses = allCourses.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2d2e32] dark:text-slate-100">
          Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[400px_1fr] xl:gap-12 items-start">
        <ProfileCard
          user={pageData?.user}
          isLoading={isLoading || !pageData}
          onProfilePictureChange={handleProfilePictureChange}
        />

        <CourseGrid
          courses={displayCourses}
          isLoading={isLoading || !pageData}
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
