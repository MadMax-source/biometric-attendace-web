"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useAvailableCourses } from "@/hook/useAvailableCourses";
import BACKENDAPI from "@/API";
import ProfileCard from "@/components/profile";
import CourseGrid, { Course } from "@/components/studentProfile/coursegrid";
import RegistrationFAB from "@/components/studentProfile/registrationFab";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const {
    availableCoursesLists,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useAvailableCourses();

  console.log("Returned courses:", availableCoursesLists);

  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
      imageUrl: user?.imageurl || "",
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
    fileInputRef.current?.click();
  };

  async function handlePhotoSelected(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setIsUploadingPhoto(true);

    try {
      const response = await BACKENDAPI.post("/update-profile-photo", formData);
      const uploadedUrl = response.data?.data?.profile_image;

      if (uploadedUrl && user) {
        setUser({
          ...user,
          imageurl: uploadedUrl,
        });
      }

      toast.success("Profile photo updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile photo.");
    } finally {
      event.target.value = "";
      setIsUploadingPhoto(false);
    }
  }

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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoSelected}
        />
        <ProfileCard
          user={pageData.user}
          isLoading={coursesLoading || !user || isUploadingPhoto}
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
