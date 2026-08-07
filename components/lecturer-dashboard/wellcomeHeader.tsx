import { Sparkles } from "lucide-react";

export function WelcomeHeader({
  lecturerName,
  avatarUrl,
}: {
  lecturerName: string;
  avatarUrl?: string;
}) {
  return (
    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a2f66] dark:text-white">
          Welcome, {lecturerName}
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7]">
          <Sparkles className="size-4 text-[#0a2f66] dark:text-white" />
          Your course schedule is up to date
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <div className="flex size-12 overflow-hidden items-center justify-center rounded-full border border-[#d9e3f6] bg-white shadow-sm dark:border-[#1a365d] dark:bg-[#0a1c3a]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={lecturerName}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-sm font-black text-[#0a2f66] dark:text-white">
              {lecturerName.charAt(0)?.toUpperCase() || "L"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
