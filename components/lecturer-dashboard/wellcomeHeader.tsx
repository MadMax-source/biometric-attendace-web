import { Sparkles } from "lucide-react";

export function WelcomeHeader({ lecturerName }: { lecturerName: string }) {
  return (
    <div className="relative">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a2f66] dark:text-white">
        Welcome, {lecturerName}
      </h1>
      <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#8ba3c7] mt-2 flex items-center gap-2">
        <Sparkles className="size-4 text-[#0a2f66] dark:text-white" />
        Your course schedule is up to date
      </p>
    </div>
  );
}
