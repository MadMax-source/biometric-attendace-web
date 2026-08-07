"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BACKENDAPI from "@/API";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await BACKENDAPI.post(
        "/send-email-for-password-update",
        { email },
      );
      if (response.status === 200) {
        toast.success("Password reset email sent. Please check your inbox.");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Unable to send reset email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#a1c6ea] p-4 flex items-center justify-center">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#0c2a5d]">
            Forgot password
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email and reset link will be sent to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="sodiqsulyman@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-12 w-full bg-[#0c2a5d] hover:bg-[#0c2a5d]/90 text-white"
          >
            {submitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            href="/"
            className="font-semibold text-[#0c2a5d] hover:underline"
          >
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}
