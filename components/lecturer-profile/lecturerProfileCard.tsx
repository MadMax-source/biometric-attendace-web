import { Plus, Loader2 } from "lucide-react";

// Exporting the type so the main page can use it too
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
      <div className="sticky top-8 w-full max-w-[500px] rounded-[30px] bg-[#f7f2fe] dark:bg-purple-950/20 px-8 py-10 shadow-sm border border-purple-50 dark:border-purple-900/30">
        <div className="relative mx-auto mb-10 size-28">
          <div className="size-full rounded-full border-4 border-white dark:border-slate-800 bg-[#d9d9d9] dark:bg-slate-700 shadow-sm"></div>
          <button
            onClick={onProfilePictureChange}
            className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-800 bg-[#16085a] text-white hover:bg-[#5e3bce] transition-colors"
          >
            <Plus className="size-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 text-purple-600 dark:text-purple-400">
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
                <label className="text-xs font-bold text-slate-800 dark:text-slate-300">
                  {item.label}
                </label>
                <input
                  type="text"
                  value={item.val || ""}
                  disabled
                  className="w-full rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm opacity-80"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}