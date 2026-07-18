import { Plus, Loader2 } from "lucide-react";

export interface LecturerData {
  fullName: string;
  staffId: string;
  email: string;
  department: string;
}

interface LecturerProfileCardProps {
  user: LecturerData;
  isLoading: boolean;
  onProfilePictureChange: () => void;
}

export default function LecturerProfileCard({
  user,
  isLoading,
  onProfilePictureChange,
}: LecturerProfileCardProps) {
  return (
    <div className="flex w-full justify-center xl:justify-start">
      <div className="sticky top-8 w-full max-w-[500px] rounded-[30px] bg-white dark:bg-[#0a1c3a] px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-[#d9e3f6] dark:border-[#1a365d]">
        <div className="relative mx-auto mb-10 size-28">
          <div className="size-full rounded-full border-4 border-white dark:border-[#0a1c3a] bg-[#f2f2f2] dark:bg-[#1a365d] shadow-sm"></div>
          <button
            onClick={onProfilePictureChange}
            className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-white dark:border-[#0a1c3a] bg-[#0a2f66] dark:bg-[#1a4b96] text-white hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 transition-colors"
          >
            <Plus className="size-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 text-[#0a2f66] dark:text-[#8ba3c7]">
            <Loader2 className="size-8 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {[
              { label: "Name", val: user.fullName },
              { label: "Staff ID", val: user.staffId },
              { label: "University Email", val: user.email },
              { label: "Department", val: user.department },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#262626] dark:text-white">
                  {item.label}
                </label>
                <input
                  type="text"
                  value={item.val || ""}
                  disabled
                  className="w-full rounded-[10px] border border-[#b2b2b2] dark:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024] px-4 py-3 text-sm opacity-80 text-[#262626] dark:text-[#8ba3c7]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
