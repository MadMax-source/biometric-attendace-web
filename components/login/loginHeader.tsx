import React from "react";

type LoginMode = "admin" | "lecturer" | "student";

interface LoginHeaderProps {
  mode: LoginMode;
  setMode: (mode: LoginMode) => void;
}

export default function LoginHeader({ mode, setMode }: LoginHeaderProps) {
  return (
    <div className="space-y-8">
      <div className="hidden items-center justify-center md:flex">
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
      </div>

      <div className="w-full space-y-3">
        <button
          type="button"
          onClick={() => setMode("admin")}
          className={`flex h-11 w-full items-center justify-center rounded-full bg-[#f2f2f2] px-4 text-[12px] font-medium transition-all sm:text-[13px] ${
            mode === "admin"
              ? "border border-[#0a2f66] bg-white text-[#2b2b2b] shadow-sm"
              : "text-[#6b6b6b]"
          }`}
        >
          Login as Admin
        </button>

        <div className="grid grid-cols-2 gap-1.5 rounded-full bg-[#f2f2f2] p-1.5">
          <button
            type="button"
            onClick={() => setMode("lecturer")}
            className={`rounded-full px-3 py-3 text-[12px] font-medium transition-all sm:text-[13px] ${
              mode === "lecturer"
                ? "bg-white text-[#2b2b2b] shadow-sm"
                : "text-[#6b6b6b]"
            }`}
          >
            Login as Lecturer
          </button>
          <button
            type="button"
            onClick={() => setMode("student")}
            className={`rounded-full px-3 py-3 text-[12px] font-medium transition-all sm:text-[13px] ${
              mode === "student"
                ? "bg-white text-[#2b2b2b] shadow-sm"
                : "text-[#6b6b6b]"
            }`}
          >
            Login as Student
          </button>
        </div>
      </div>
    </div>
  );
}
