"use client";

import {
  ScanFace,
  Fingerprint,
  Loader2,
  Focus,
  StopCircle,
} from "lucide-react";
import { Students } from "@/hook/useStudent";

interface PendingEnrollmentCardProps {
  student: Students;
  isEnrolling: boolean;
  onTriggerEnrollment: (
    studentId: string,
    matric: string,
    command: "start" | "end",
  ) => void;
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

  const handleToggle = () => {
    const command = isEnrolling ? "end" : "start";
    onTriggerEnrollment(student.id, student.matric_number, command);
  };

  return (
    <div className="group relative rounded-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 rounded-2xl bg-white/80 dark:bg-[#0a1c3a]/80 backdrop-blur-xl border border-[#d9e3f6] dark:border-[#1a365d] shadow-sm hover:shadow-md">
        <div className="flex items-center gap-4">
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
            onClick={handleToggle}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 ${
              isEnrolling
                ? "bg-rose-600 hover:bg-rose-700 text-white animate-pulse"
                : "bg-[#0a2f66] dark:bg-[#1a4b96] text-white hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80"
            }`}
          >
            {isEnrolling ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Stop Capturing</span>
              </>
            ) : (
              <>
                <Focus className="size-4" />
                <span>Capture Biometrics</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
