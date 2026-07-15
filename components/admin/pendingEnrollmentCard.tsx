import { ScanFace, Fingerprint, Loader2, Focus } from "lucide-react";
import { Students } from "@/hook/useStudent";

interface PendingEnrollmentCardProps {
  student: Students;
  isEnrolling: boolean;
  onTriggerEnrollment: (studentId: string, matric: string) => void;
}

export default function PendingEnrollmentCard({
  student,
  isEnrolling,
  onTriggerEnrollment,
}: PendingEnrollmentCardProps) {
  const initials = student.full_name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <div className="group relative rounded-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md">
        <div className="flex items-center gap-4">
          {/* Profile Image / Initials Fallback */}
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-lg font-black text-blue-950 dark:text-blue-100 border border-blue-100 dark:border-blue-800 overflow-hidden">
            {student.profile_image ? (
              <img
                src={student.profile_image}
                alt={`${student.full_name} profile`}
                className="size-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div>
            <p className="font-bold text-blue-950 dark:text-white text-lg tracking-tight">
              {student.full_name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {student.matric_number}
              </span>
              <span className="text-xs font-semibold text-slate-400 border-l border-slate-300 dark:border-slate-700 pl-2">
                {student.level}L • {student.department}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={() =>
              onTriggerEnrollment(student.id, student.matric_number)
            }
            disabled={isEnrolling}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-950 text-white text-sm font-bold shadow-sm hover:bg-blue-900 transition-all active:scale-95 disabled:opacity-70 disabled:hover:bg-blue-950"
          >
            {isEnrolling ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Waking Scanner...
              </>
            ) : (
              <>
                <Focus className="size-4" /> Capture Biometrics
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
