import React from "react";

type RegistrationMode = "admin" | "student" | "lecturer";

interface RegistrationHeaderProps {
  mode: RegistrationMode;
  setMode: (mode: RegistrationMode) => void;
}

export default function RegistrationHeader({
  mode,
  setMode,
}: RegistrationHeaderProps) {
  const title =
    mode === "student" ? "Student Registration" : "Lecturer Registration";

  return (
    <div className="flex flex-col items-center gap-3 pt-1">
      <div className="flex items-center gap-2">
        <span className="text-[40px] font-semibold leading-none tracking-[-0.08em] text-[#1f1936] dark:text-white">
          Attendice
        </span>
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          aria-hidden="true"
          className="text-[#0a2f66] dark:text-white"
        >
          <path
            d="M27 3.5L44.5 13.7V40.3L27 50.5L9.5 40.3V13.7L27 3.5Z"
            stroke="currentColor"
            strokeWidth="3.1"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="rounded-full bg-[#f2f2f2] dark:bg-[#041024] p-1.5 w-full max-w-[300px]">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setMode("student")}
            className={`rounded-full px-4 py-2.5 text-[12px] font-medium transition-all sm:text-[13px] ${
              mode === "student"
                ? "bg-white dark:bg-[#1a4b96] text-[#2b2b2b] dark:text-white shadow-sm"
                : "text-[#6b6b6b] dark:text-[#8ba3c7] hover:text-[#2b2b2b] dark:hover:text-white"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setMode("lecturer")}
            className={`rounded-full px-4 py-2.5 text-[12px] font-medium transition-all sm:text-[13px] ${
              mode === "lecturer"
                ? "bg-white dark:bg-[#1a4b96] text-[#2b2b2b] dark:text-white shadow-sm"
                : "text-[#6b6b6b] dark:text-[#8ba3c7] hover:text-[#2b2b2b] dark:hover:text-white"
            }`}
          >
            Lecturer
          </button>
        </div>
      </div>

      <h1 className="text-center text-xl font-semibold text-[#222] dark:text-white sm:text-2xl mt-4">
        {title}
      </h1>
    </div>
  );
}
