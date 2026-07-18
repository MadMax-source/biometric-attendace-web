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

  const identifierLabel =
    mode === "student" ? "Student-Email" : "Email Address";
  const placeholder =
    mode === "student"
      ? "Enter your Matric No."
      : mode === "lecturer"
        ? "Enter your Staff ID"
        : "Enter your Email";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-[15px] font-bold text-gray-900">
          Email Address
        </label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="h-12 bg-white border-gray-300 rounded-xl px-4 text-[15px] text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#0c2a5d] focus-visible:border-[#0c2a5d] shadow-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[15px] font-bold text-gray-900">
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="h-12 bg-white border-gray-300 rounded-xl px-4 pr-12 text-[15px] text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#0c2a5d] focus-visible:border-[#0c2a5d] shadow-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0c2a5d] transition-colors"
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
