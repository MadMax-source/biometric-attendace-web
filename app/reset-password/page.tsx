"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BACKENDAPI from "@/API";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    setTokenReady(Boolean(accessToken || refreshToken));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const accessToken = searchParams.get("access_token") || "";
      const refreshToken = searchParams.get("refresh_token") || "";

      await BACKENDAPI.post("/update-password", {
        newPassword: password,
        accessToken,
        refreshToken,
      });

      toast.success("Password updated successfully.");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Unable to update password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#a1c6ea] p-4 flex items-center justify-center">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#0c2a5d]">
            Set a new password
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose a new password for your account.
          </p>
        </div>

        {!tokenReady ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            The reset link is incomplete. Please use the link sent to your
            email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-700"
                htmlFor="password"
              >
                New password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-700"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full bg-[#0c2a5d] hover:bg-[#0c2a5d]/90 text-white"
            >
              {submitting ? "Updating..." : "Update password"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
