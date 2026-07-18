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

  useEffect(() => {
    if (!loading && user) router.replace(`/${user.role}`);
  }, [loading, router, user]);

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
      toast.error(error.response?.data?.error || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#a1c6ea] p-4 flex items-center justify-center">
      {showMobileSplash && <MobileSplashOverlay />}
      <section className="w-full max-w-[1320px] bg-white rounded-3xl shadow-2xl overflow-hidden grid min-h-[750px] md:grid-cols-[1.1fr_0.9fr]">
        <AsideBanner />

        <section className="flex flex-col justify-center px-6 py-12 md:px-16 bg-white">
          <div className="w-full max-w-[400px] mx-auto space-y-8">
            <LoginHeader mode={mode} setMode={setMode} />

            <form onSubmit={handleLogin} className="space-y-6">
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
                className="h-12 w-full bg-[#0c2a5d] hover:bg-[#0c2a5d]/90 text-white rounded-lg font-medium text-[16px] shadow-sm transition-all"
              >
                {submitting ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-[14px] mt-4">
                <Link
                  href="/Registration"
                  className="text-[#0c2a5d] font-semibold hover:underline transition-colors"
                >
                  New? Register Here
                </Link>
              </div>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
