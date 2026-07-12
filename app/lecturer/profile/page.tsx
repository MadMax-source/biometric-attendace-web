"use client";

import { useAuth } from "@/lib/auth-context";
import { useLecturerDashboard } from "@/hook/useLecturerDashboard";
import LecturerProfileCard, {
  LecturerData,
} from "@/components/lecturer-profile/lecturerProfileCard";
import LecturerOverviewGrid from "@/components/lecturer-profile/lecturerOverviewGrid";

export default function LecturerProfilePage() {
  const { user } = useAuth();
  const { courses, isLoading } = useLecturerDashboard();

  const handleProfilePictureChange = () => {
    alert("Profile picture change functionality is not implemented yet.");
  };

  // Format the auth data to match what the LecturerProfileCard expects
  const lecturerData: LecturerData = {
    fullName: user?.fullName || "",
    staffId: user?.matricNumber || "STAFF-000",
    email: user?.email || "",
    department: user?.department || "",
  };

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2d2e32] dark:text-slate-100">
          Lecturer Profile
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-2">
          Manage your academic identity and hardware settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[400px_1fr] xl:gap-12 items-start">
        <LecturerProfileCard
          user={lecturerData}
          isLoading={!user}
          onProfilePictureChange={handleProfilePictureChange}
        />

        <LecturerOverviewGrid courses={courses} isLoading={isLoading} />
      </div>
    </div>
  );
}
