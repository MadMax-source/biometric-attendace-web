import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEPARTMENTS = ["Computer Engineering"];

interface RegistrationFormFieldsProps {
  mode: "admin" | "student" | "lecturer";
  formData: any;
  updateField: (field: string, value: string) => void;
}

export default function RegistrationFormFields({
  mode,
  formData,
  updateField,
}: RegistrationFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const identifierLabel = mode === "student" ? "Matric No." : "Staff ID";
  const emailLabel = mode === "student" ? "Student Email" : "Email";

  return (
    <div className="space-y-4 mt-2">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" id="firstName">
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="Enter your First Name"
            className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px]"
          />
        </Field>
        <Field label="Last Name" id="lastName">
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Enter your Last Name"
            className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px]"
          />
        </Field>
      </div>

      <Field label={identifierLabel} id="identifier">
        <Input
          id="identifier"
          value={mode === "student" ? formData.matricNumber : formData.staffKey}
          onChange={(e) =>
            updateField(
              mode === "student" ? "matricNumber" : "staffKey",
              e.target.value,
            )
          }
          placeholder={
            mode === "student" ? "Enter your Matric No." : "Enter your Staff ID"
          }
          className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px]"
        />
      </Field>

      <Field label={emailLabel} id="email">
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder={
            mode === "student" ? "Enter your Student Email" : "Enter your Email"
          }
          className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px]"
        />
      </Field>

      <Field label="Phone Number" id="phoneNumber">
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => updateField("phoneNumber", e.target.value)}
          placeholder="Enter your Phone Number"
          className="h-11 rounded-[8px] border-[#b2b2b2] px-3 text-[13px]"
        />
      </Field>

      <Field label="Select your Department" id="department">
        <Select
          value={formData.department}
          onValueChange={(value) => updateField("department", value)}
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

      {mode === "student" && (
        <Field label="Level" id="level">
          <Select
            value={formData.level}
            onValueChange={(value) => updateField("level", value)}
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
      )}

      <Field label="Enter Password" id="password">
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="Enter your Password"
            className="h-11 rounded-[8px] border-[#b2b2b2] px-3 pr-11 text-[13px]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a4a4a4] hover:text-[#6f6f6f]"
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
            value={formData.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            placeholder="Confirm your Password"
            className="h-11 rounded-[8px] border-[#b2b2b2] px-3 pr-11 text-[13px]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a4a4a4] hover:text-[#6f6f6f]"
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
  );
}

// Local Field Wrapper Component
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
