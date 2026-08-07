"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLecturerDashboard } from "@/hook/useLecturerDashboard";
import LecturerProfileCard, {
  LecturerData,
} from "@/components/lecturer-profile/lecturerProfileCard";
import LecturerOverviewGrid from "@/components/lecturer-profile/lecturerOverviewGrid";
import BACKENDAPI from "@/API";
import { toast } from "sonner";

export default function LecturerProfilePage() {
  const { user, setUser } = useAuth();
  const { courses, isLoading } = useLecturerDashboard();
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const lecturerData: LecturerData = {
    fullName: user?.fullName || "",
    staffId: user?.matricNumber || "STAFF-000",
    email: user?.email || "",
    department: user?.department || "",
    imageUrl: user?.imageurl || "",
  };

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0a2f66] dark:text-white">
          Lecturer Profile
        </h1>
        <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-2">
          Manage your academic identity and hardware settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[400px_1fr] xl:gap-12 items-start">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoSelected}
        />
        <LecturerProfileCard
          user={lecturerData}
          isLoading={!user || isUploadingPhoto}
          onProfilePictureChange={handleProfilePictureChange}
        />

        <LecturerOverviewGrid courses={courses} isLoading={isLoading} />
      </div>
    </div>
  );
}
