import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LoginFormFieldsProps {
  mode: "admin" | "lecturer" | "student";
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
}

export default function LoginFormFields({
  mode,
  email,
  setEmail,
  password,
  setPassword,
}: LoginFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const identifierLabel = mode === "student" ? "Student-Email." : "Email / ID";
  const placeholder =
    mode === "student"
      ? "Enter your Matric No."
      : mode === "lecturer"
        ? "Enter your Email / Staff ID"
        : "Enter your Email";

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="block text-[17px] font-semibold text-[#262626] border-[#0a2f66]">
          {identifierLabel}
        </label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="text-black h-12 border-[#0a2f66] px-3 text-[13px] placeholder:text-[#8b8b8b]"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[17px] font-semibold text-[#262626]">
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="h-12 rounded-[8px] border-[#0a2f66] px-3 pr-11 text-[13px] placeholder:text-[#8b8b8b] text-black"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a4a4a4] hover:text-[#0a2f66]"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
