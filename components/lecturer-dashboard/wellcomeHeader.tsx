import { Sparkles } from "lucide-react";

export function WelcomeHeader({ lecturerName }: { lecturerName: string }) {
  return (
    <div className="relative">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white">
        Welcome, {lecturerName}
      </h1>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
        <Sparkles className="size-4 text-indigo-500" />
        Your course schedule is up to date
      </p>
    </div>
  );
}
