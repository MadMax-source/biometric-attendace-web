type LoginMode = "admin" | "lecturer" | "student";

interface LoginHeaderProps {
  mode: LoginMode;
  setMode: (mode: LoginMode) => void;
}

export default function LoginHeader({ mode, setMode }: LoginHeaderProps) {
  return (
    <div className="space-y-10">
      {/* Logo and Title */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-[40px] font-bold tracking-tight text-[#0c2a5d]">
          Attendice
        </span>
        <svg
          width="40"
          height="40"
          viewBox="0 0 54 54"
          fill="none"
          className="text-[#0c2a5d]"
        >
          <path
            d="M27 3.5L44.5 13.7V40.3L27 50.5L9.5 40.3V13.7L27 3.5Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Pill Toggles */}
      {/* <div className="w-full space-y-3">
        <button
          type="button"
          onClick={() => setMode("admin")}
          className={`flex h-12 w-full items-center justify-center rounded-full px-4 text-[14px] font-medium transition-all ${
            mode === "admin"
              ? "bg-white text-[#0c2a5d] shadow-md border border-gray-200"
              : "bg-[#f3f4f6] text-gray-500 hover:text-gray-800"
          }`}
        >
          Login as Admin
        </button>
        <div className="grid grid-cols-2 gap-1 rounded-full bg-[#f3f4f6] p-1">
          <button
            type="button"
            onClick={() => setMode("lecturer")}
            className={`rounded-full py-2.5 text-[14px] font-medium transition-all ${
              mode === "lecturer"
                ? "bg-white text-[#0c2a5d] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Login as Lecturer
          </button>
          <button
            type="button"
            onClick={() => setMode("student")}
            className={`rounded-full py-2.5 text-[14px] font-medium transition-all ${
              mode === "student"
                ? "bg-white text-[#0c2a5d] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Login as Student
          </button>
        </div>
      </div> */}
    </div>
  );
}
