"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BACKENDAPI from "@/API";
import RegistrationHeader from "@/components/registration/registrationHeader";
import RegistrationFormFields from "@/components/registration/registrationFormField";

type RegistrationMode = "student" | "lecturer";

export function RegisterStudentForm({
  backHref,
  defaultMode = "student",
}: {
  backHref: string;
  defaultMode?: RegistrationMode;
}) {
  const router = useRouter();

  const [mode, setMode] = useState<RegistrationMode>(defaultMode);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    matricNumber: "",
    staffKey: "",
    email: "",
    phoneNumber: "",
    department: "Computer Engineering",
    level: "100",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const {
      firstName,
      lastName,
      matricNumber,
      staffKey,
      email,
      department,
      password,
      confirmPassword,
      level,
      phoneNumber,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      (mode === "student" && !matricNumber) ||
      (mode === "lecturer" && !staffKey) ||
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

    try {
      setSaving(true);
      const response = await BACKENDAPI.post("/register", {
        email,
        password,
        role: mode,
        phoneNumber,
        staffKey: mode === "lecturer" ? staffKey : "",
        matricNumber: mode === "student" ? matricNumber : "",
        fullName: `${firstName} ${lastName}`,
        department,
        level: mode === "student" ? level : "",
      });

      if (response.status === 200) {
        toast.success("Registration successful");
        router.push(backHref);
      } else {
        toast.error(response.data.error || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please check your details.";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-[#a9c8f4]">
      <form
        onSubmit={handleRegister}
        className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-[640px] items-center justify-center px-3 py-4 sm:px-4"
      >
        <Card className="w-full max-w-[520px] border border-[#d9e3f6] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
          <CardContent className="space-y-6 p-5 sm:p-7">
            <RegistrationHeader mode={mode} setMode={setMode} />

            <RegistrationFormFields
              mode={mode}
              formData={formData}
              updateField={updateField}
            />

            <Button
              type="submit"
              disabled={saving}
              className="h-12 w-full rounded-[6px] bg-[#0a2f66] text-[18px] font-medium text-white shadow-none hover:bg-white hover:text-[#0a2f66] hover:shadow-[0_4px_16px_rgba(15,23,42,0.12)] focus-visible:bg-white focus-visible:text-[#0a2f66] focus-visible:shadow-[0_4px_16px_rgba(15,23,42,0.12)]"
            >
              {saving ? "Saving..." : "Sign up"}
            </Button>

            <div className="text-center text-[12px]">
              <button
                type="button"
                className="text-[#0a2f66] underline underline-offset-2"
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
