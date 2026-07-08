import React from "react";

type RegistrationMode = "student" | "lecturer";

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
      {/* Logo Mark */}
      <div className="flex items-center gap-2">
        <span className="text-[40px] font-semibold leading-none tracking-[-0.08em] text-[#1f1936]">
          Attendice
        </span>
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M27 3.5L44.5 13.7V40.3L27 50.5L9.5 40.3V13.7L27 3.5Z"
            stroke="#0a2f66"
            strokeWidth="3.1"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Role Toggle Switch */}
      <div className="rounded-full bg-[#f2f2f2] p-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setMode("student")}
            className={`rounded-full px-4 py-2.5 text-[12px] font-medium transition-all sm:text-[13px] ${
              mode === "student"
                ? "bg-white text-[#2b2b2b] shadow-sm"
                : "text-[#6b6b6b]"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setMode("lecturer")}
            className={`rounded-full px-4 py-2.5 text-[12px] font-medium transition-all sm:text-[13px] ${
              mode === "lecturer"
                ? "bg-white text-[#2b2b2b] shadow-sm"
                : "text-[#6b6b6b]"
            }`}
          >
            Lecturer
          </button>
        </div>
      </div>

      <h1 className="text-center text-xl font-semibold text-[#222] sm:text-2xl mt-4">
        {title}
      </h1>
    </div>
  );
}
