"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Fingerprint, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { DEMO_ACCOUNTS, type Role } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { div } from "framer-motion/m";

type LoginMode = "admin" | "lecturer" | "student";

const LEFT_SIDE_IMAGE =
  "https://res.cloudinary.com/wgoxg8df/image/upload/v1783207995/Biometric_ajlodd.webp";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [mode, setMode] = useState<LoginMode>("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showMobileConcept, setShowMobileConcept] = useState(true);

  useEffect(() => {
    if (!loading && user) router.replace(`/${user.role}`);
  }, [loading, router, user]);

  useEffect(() => {
    function syncMobileConcept() {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (!isMobile) {
        setShowMobileConcept(false);
        return;
      }

      setShowMobileConcept(true);
      const timeoutId = window.setTimeout(() => {
        setShowMobileConcept(false);
      }, 10000);

      return () => window.clearTimeout(timeoutId);
    }

    const cleanup = syncMobileConcept();
    window.addEventListener("resize", syncMobileConcept);

    return () => {
      window.removeEventListener("resize", syncMobileConcept);
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  const activeRole: Role = mode;
  const modeLabel =
    mode === "admin" ? "Admin" : mode === "lecturer" ? "Lecturer" : "Student";

  function selectMode(nextMode: LoginMode) {
    setMode(nextMode);
    const demo = DEMO_ACCOUNTS.find((item) => item.role === nextMode);
    if (demo) {
      setIdentifier(demo.identifier);
      setPassword("password");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const res = login(identifier, password);
    if (res.ok && res.role) {
      if (res.role !== activeRole) {
        setSubmitting(false);
        toast.error(
          `Those credentials are for a ${res.role}, not a ${activeRole}.`,
        );
        return;
      }

      router.replace(`/${res.role}`);
      return;
    }

    setSubmitting(false);
    toast.error(res.error ?? "Login failed");
  }

  return (
    <main className="min-h-dvh bg-[#a9c8f4] p-3 sm:p-4">
      {showMobileConcept ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a2f66] px-4 py-6 md:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,191,255,0.22),_transparent_36%),linear-gradient(135deg,_rgba(10,47,102,0.98),_rgba(23,72,145,0.84))]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:38px_38px]" />

          <div className="relative z-10 flex h-full max-h-[920px] w-full max-w-[520px] flex-col justify-center space-y-5">
            <div className="flex items-center justify-between text-white/85">
              <div>
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-white capitalize">
                  blockchain-based multimodal attendance system
                </h1>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <ShieldCheck className="size-5" />
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <img
                src={LEFT_SIDE_IMAGE}
                alt="Biometric attendance concept"
                className="h-[420px] w-full object-cover object-center sm:h-[520px]"
              />
            </div>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-white capitalize">
              with offline synchronization for low-connectivity environments
            </h1>

            <div className="space-y-4 text-white/80">
              <div className="flex flex-wrap gap-4">
                <Feature
                  icon={<Fingerprint className="size-5" />}
                  label="Hardware scan"
                />
                <Feature
                  icon={<ShieldCheck className="size-5" />}
                  label="Trusted records"
                />
                <Feature
                  icon={<Fingerprint className="size-5" />}
                  label="Secure sync"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="mx-auto grid min-h-[calc(100dvh-1.5rem)] w-full max-w-[1320px] overflow-hidden rounded-[18px] border border-[#0a2f66] bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.65)] md:grid-cols-[1.18fr_0.82fr]">
        <aside className="relative hidden overflow-hidden bg-[#0a2f66] text-white md:flex md:flex-col md:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,191,255,0.18),_transparent_36%),linear-gradient(135deg,_rgba(10,47,102,0.98),_rgba(23,72,145,0.86))]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.82)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.82)_1px,transparent_1px)] [background-size:38px_38px]" />

          <div className="relative z-10 flex items-center gap-3 px-8 pt-10 xl:px-12 xl:pt-12">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <ShieldCheck className="size-5" />
            </div>
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5 sm:px-6 md:px-8 md:py-10 xl:px-12 xl:py-12">
            <div className="max-w-2xl space-y-10">
              <div className="space-y-5">
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-white capitalize">
                  blockchain-based multimodal attendance system
                </h1>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/8 shadow-[0_18px_55px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                <img
                  src={LEFT_SIDE_IMAGE}
                  alt="Biometric attendance concept"
                  className="h-[320px] w-full object-cover object-center xl:h-[520px]"
                />
              </div>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-white capitalize">
                with offline synchronization for low-connectivity environments
              </h1>

              <div className="flex flex-wrap gap-7">
                <Feature
                  icon={<Fingerprint className="size-5" />}
                  label="Hardware scan"
                />
                <Feature
                  icon={<ShieldCheck className="size-5" />}
                  label="Trusted records"
                />
                <Feature
                  icon={<Fingerprint className="size-5" />}
                  label="Secure sync"
                />
                <Feature
                  icon={<ShieldCheck className="size-5" />}
                  label="Live verification"
                />
              </div>
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6 md:justify-end md:px-10 xl:px-16">
          <div className="w-full max-w-[420px] md:ml-8 lg:ml-16 xl:ml-24">
            <div className="space-y-8 rounded-[28px] bg-white p-6 sm:p-8 md:p-0 md:shadow-none">
              <div className="hidden items-center justify-center md:flex">
                <LogoMark />
              </div>

              <div className="w-full space-y-3">
                <button
                  type="button"
                  onClick={() => selectMode("admin")}
                  className={`flex h-11 w-full items-center justify-center rounded-full bg-[#f2f2f2] px-4 text-[12px] font-medium transition-all sm:text-[13px] ${
                    mode === "admin"
                      ? "border border-[#0a2f66] bg-white text-[#2b2b2b] shadow-sm"
                      : "text-[#6b6b6b]"
                  }`}
                >
                  Login as Admin
                </button>

                <div className="grid grid-cols-2 gap-1.5 rounded-full bg-[#f2f2f2] p-1.5">
                  <button
                    type="button"
                    onClick={() => selectMode("lecturer")}
                    className={`rounded-full px-3 py-3 text-[12px] font-medium transition-all sm:text-[13px] ${
                      mode === "lecturer"
                        ? "bg-white text-[#2b2b2b] shadow-sm"
                        : "text-[#6b6b6b]"
                    }`}
                  >
                    Login as Lecturer
                  </button>
                  <button
                    type="button"
                    onClick={() => selectMode("student")}
                    className={`rounded-full px-3 py-3 text-[12px] font-medium transition-all sm:text-[13px] ${
                      mode === "student"
                        ? "bg-white text-[#2b2b2b] shadow-sm"
                        : "text-[#6b6b6b]"
                    }`}
                  >
                    Login as Student
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="identifier"
                    className="block text-[17px] font-semibold text-[#262626] border-[#0a2f66]"
                  >
                    {modeLabel === "Student" ? "Matric No." : "Email / ID"}
                  </label>
                  <Input
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      mode === "student"
                        ? "Enter your Matric No."
                        : mode === "lecturer"
                          ? "Enter your Email / Staff ID"
                          : "Enter your Email"
                    }
                    className="h-12  border-[#0a2f66] px-3 text-[13px] placeholder:text-[#8b8b8b]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-[17px] font-semibold text-[#262626] border-[#0a2f66]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      className="h-12 rounded-[8px] border-[#0a2f66] px-3 pr-11 text-[13px] placeholder:text-[#8b8b8b]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a4a4a4] transition-colors hover:text-[#0a2f66]"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 w-full rounded-[6px] bg-[#0a2f66] text-[18px] font-medium text-white shadow-none "
                >
                  {submitting ? "Logging in..." : "Login"}
                </Button>

                <div className="flex items-center justify-between px-1 pt-1 text-[12px]">
                  <Link
                    href="/register"
                    className="text-[#0a2f66] underline underline-offset-2"
                  >
                    New? Register Here
                  </Link>
                  <button
                    type="button"
                    className="text-[#0a2f66] underline underline-offset-2"
                    onClick={() =>
                      toast.info("Password reset flow not wired yet.")
                    }
                  >
                    Forget Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2 ">
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

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-white/15 text-white">
        {icon}
      </div>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
