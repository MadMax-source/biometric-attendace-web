"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RegistrationMode = "student" | "lecturer";

const DEPARTMENTS = [
  "Computer Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Mechatronics Engineering",
];

export function RegisterStudentForm({
  backHref,
  defaultMode = "student",
}: {
  backHref: string;
  defaultMode?: RegistrationMode;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<RegistrationMode>(defaultMode);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Engineering");
  const [level, setLevel] = useState("100");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const title =
    mode === "student" ? "Student Registration" : "Lecturer Registration";
  const identifierLabel = mode === "student" ? "Matric No." : "Staff ID";
  const emailLabel = mode === "student" ? "Student Email" : "Email";

  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !identifier ||
      !email ||
      !department ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Fill in all required fields");
      return;
    }

    if (mode === "student" && !level) {
      toast.error("Select a level");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSaving(true);
    window.setTimeout(() => {
      toast.success(
        `${mode === "student" ? "Student" : "Lecturer"} registered successfully`,
        {
          description: `${firstName} ${lastName} · ${identifier}`,
        },
      );
      router.push(backHref);
    }, 900);
  }

  return (
    <div className="bg-[#a9c8f4]">
      <form
        onSubmit={handleSave}
        className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-[640px] items-center justify-center px-3 py-4 sm:px-4 "
      >
        <Card className="w-full max-w-[520px] border border-[#d9e3f6] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
          <CardContent className="space-y-6 p-5 sm:p-7">
            <div className="flex flex-col items-center gap-3 pt-1">
              <LogoMark />
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
            </div>

            <div className="space-y-4">
              <h1 className="text-center text-xl font-semibold text-[#222] sm:text-2xl">
                {title}
              </h1>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First Name" id="firstName">
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your First Name"
                    className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px] placeholder:text-[#8b8b8b]"
                  />
                </Field>
                <Field label="Last Name" id="lastName">
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your Last Name"
                    className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px] placeholder:text-[#8b8b8b]"
                  />
                </Field>
              </div>

              <Field label={identifierLabel} id="identifier">
                <Input
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    mode === "student"
                      ? "Enter your Matric No."
                      : "Enter your Staff ID"
                  }
                  className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px] placeholder:text-[#8b8b8b]"
                />
              </Field>

              <Field label={emailLabel} id="email">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    mode === "student"
                      ? "Enter your Student Email"
                      : "Enter your Email"
                  }
                  className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px] placeholder:text-[#8b8b8b]"
                />
              </Field>

              <Field label="Select your Department" id="department">
                <Select
                  value={department}
                  onValueChange={(value) => setDepartment(value ?? "")}
                >
                  <SelectTrigger className="h-11 rounded-[8px] border-[#b2b2b2] text-[13px]">
                    <SelectValue placeholder="Select your Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {mode === "student" ? (
                <Field label="Level" id="level">
                  <Select
                    value={level}
                    onValueChange={(value) => setLevel(value ?? "")}
                  >
                    <SelectTrigger className="h-11 rounded-[8px] border-[#b2b2b2] text-[13px]">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {["100", "200", "300", "400", "500"].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              ) : null}

              <Field label="Enter Password" id="password">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="h-11 rounded-[8px] border-[#b2b2b2] px-3 pr-11 text-[13px] placeholder:text-[#8b8b8b]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a4a4a4] transition-colors hover:text-[#6f6f6f]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </Field>

              <Field label="Confirm Password" id="confirmPassword">
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your Password"
                    className="h-11 rounded-[8px] border-[#b2b2b2] px-3 pr-11 text-[13px] placeholder:text-[#8b8b8b]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a4a4a4] transition-colors hover:text-[#6f6f6f]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password confirmation"
                        : "Show password confirmation"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </Field>
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="h-12 w-full rounded-[6px] bg-[#0a2f66] text-[18px] font-medium text-white shadow-none hover:bg-[#5330cc]"
            >
              {saving ? "Saving..." : "Sign up"}
            </Button>

            <div className="text-center text-[12px]">
              <button
                type="button"
                className="text-[#8a66ff] underline underline-offset-2"
                onClick={() => router.push(backHref)}
              >
                Have an account? Login
              </button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

function LogoMark() {
  return (
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
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[14px] font-medium text-[#262626]">
        {label}
      </Label>
      {children}
    </div>
  );
}
