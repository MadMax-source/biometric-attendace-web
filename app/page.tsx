"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/login/loginHeader";
import LoginFormFields from "@/components/login/formfield";
import AsideBanner from "@/components/login/lefsidebanner";
import MobileSplashOverlay from "@/components/login/mobilesplash";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import BACKENDAPI from "@/API";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();

  const [mode, setMode] = useState<"admin" | "lecturer" | "student">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showMobileSplash, setShowMobileSplash] = useState(true);

  // Auth Redirect
  useEffect(() => {
    if (!loading && user) router.replace(`/${user.role}`);
  }, [loading, router, user]);

  // Mobile Splash Logic
  const hasTriggeredSplash = useRef(false);
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile && !hasTriggeredSplash.current) {
      hasTriggeredSplash.current = true;
      const timer = setTimeout(() => setShowMobileSplash(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowMobileSplash(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await BACKENDAPI.post("/login", {
        email,
        password,
        role: mode,
      });
      const data = response.data;
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        toast.success(`Welcome back, ${data.fullName}!`);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Login failed.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-[#a9c8f4] p-3 sm:p-4">
      {/* Conditionally render the mobile splash */}
      {showMobileSplash && <MobileSplashOverlay />}

      <section className="mx-auto grid min-h-[calc(100dvh-1.5rem)] w-full max-w-[1320px] overflow-hidden rounded-[18px] border border-[#0a2f66] bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.65)] md:grid-cols-[1.18fr_0.82fr]">
        <AsideBanner />

        <section className="flex items-center justify-center px-4 py-8 md:justify-end md:px-16">
          <div className="w-full max-w-[420px]">
            <div className="space-y-8 bg-white">
              <LoginHeader mode={mode} setMode={setMode} />

              <form onSubmit={handleLogin} className="space-y-5">
                <LoginFormFields
                  mode={mode}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 w-full bg-[#0a2f66]"
                >
                  {submitting ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center text-[12px]">
                  <Link
                    href="/Registration"
                    className="text-[#0a2f66] underline"
                  >
                    New? Register Here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
