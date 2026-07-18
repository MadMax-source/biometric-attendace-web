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
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 rounded-2xl bg-white/80 dark:bg-[#0a1c3a]/80 backdrop-blur-xl border border-[#d9e3f6] dark:border-[#1a365d] shadow-sm hover:shadow-md">
        <div className="flex items-center gap-4">
          {/* Profile Image / Initials Fallback */}
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#f2f2f2] dark:bg-[#1a4b96]/30 text-lg font-black text-[#0a2f66] dark:text-white border border-[#d9e3f6] dark:border-[#1a365d] overflow-hidden">
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
            <p className="font-bold text-[#0a2f66] dark:text-white text-lg tracking-tight">
              {student.full_name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-bold text-[#6b6b6b] dark:text-[#8ba3c7]">
                {student.matric_number}
              </span>
              <span className="text-xs font-semibold text-[#b2b2b2] dark:text-[#8ba3c7] border-l border-[#b2b2b2] dark:border-[#1a365d] pl-2">
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
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a2f66] dark:bg-[#1a4b96] text-white text-sm font-bold shadow-[0_24px_80px_rgba(15,23,42,0.12)] hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 transition-all active:scale-95 disabled:opacity-70 disabled:hover:bg-[#0a2f66] dark:disabled:hover:bg-[#1a4b96]"
          >
            {isEnrolling ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Enrolling...
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
