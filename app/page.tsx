"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  Fingerprint,
  ScanFace,
  ShieldCheck,
  Loader2,
  GraduationCap,
  UserCog,
  Presentation,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { DEMO_ACCOUNTS, type Role } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { EngineeringBackground } from "@/components/engineering-bg"

type RoleMeta = { role: Role; label: string; description: string; icon: LucideIcon }

const ROLES: RoleMeta[] = [
  { role: "admin", label: "Administrator", description: "Manage students, courses & analytics", icon: UserCog },
  { role: "lecturer", label: "Lecturer", description: "Run sessions & capture attendance", icon: Presentation },
  { role: "student", label: "Student", description: "Track your courses & attendance", icon: GraduationCap },
]

export default function LoginPage() {
  const router = useRouter()
  const { user, loading, login } = useAuth()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) router.replace(`/${user.role}`)
  }, [loading, user, router])

  const roleMeta = ROLES.find((r) => r.role === selectedRole)

  function chooseRole(role: Role) {
    setSelectedRole(role)
    const demo = DEMO_ACCOUNTS.find((a) => a.role === role)
    if (demo) {
      setIdentifier(demo.identifier)
      setPassword("password")
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const res = login(identifier, password)
    if (res.ok && res.role) {
      if (selectedRole && res.role !== selectedRole) {
        setSubmitting(false)
        toast.error(`Those credentials are for a ${res.role}, not a ${selectedRole}.`)
        return
      }
      toast.success("Login successful", { description: `Signed in as ${res.role}` })
      router.replace(`/${res.role}`)
    } else {
      setSubmitting(false)
      toast.error(res.error ?? "Login failed")
    }
  }

  return (
    <main className="relative grid min-h-dvh lg:grid-cols-2">
      <EngineeringBackground />

      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      {/* Brand panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/15">
            <ShieldCheck className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">BioAttend</span>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-balance text-4xl font-semibold leading-tight">
            Blockchain-secured biometric attendance for Computer Engineering.
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-primary-foreground/80">
            Multimodal verification with Face ID and Fingerprint, tamper-proof records backed by a
            distributed ledger. Department of Computer Engineering, FUTMINNA.
          </p>
          <div className="flex gap-6">
            <Feature icon={<ScanFace className="size-5" />} label="Face Recognition" />
            <Feature icon={<Fingerprint className="size-5" />} label="Fingerprint" />
            <Feature icon={<ShieldCheck className="size-5" />} label="On-chain proof" />
          </div>
        </div>

        <p className="relative text-sm text-primary-foreground/60">Final-year MVP — frontend prototype</p>
      </section>

      {/* Right column */}
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <ShieldCheck className="size-6 text-primary" />
            <span className="text-xl font-semibold">BioAttend</span>
          </div>

          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="role-select"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="space-y-2 text-center lg:text-left">
                  <h2 className="text-2xl font-semibold tracking-tight">Choose your role</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Select how you&apos;d like to{" "}
                    <span className="font-medium text-primary">sign in</span> to BioAttend.
                  </p>
                </div>

                <div className="grid gap-3">
                  {ROLES.map((r, i) => {
                    const Icon = r.icon
                    return (
                      <motion.button
                        key={r.role}
                        type="button"
                        onClick={() => chooseRole(r.role)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center gap-4 rounded-xl border bg-card/70 p-4 text-left backdrop-blur transition-colors hover:border-primary/60"
                      >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">{r.label}</p>
                          <p className="truncate text-xs text-muted-foreground">{r.description}</p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="size-4" />
                  Change role
                </button>

                <div className="space-y-2 text-center lg:text-left">
                  <div className="flex items-center justify-center gap-2 lg:justify-start">
                    {roleMeta && (
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <roleMeta.icon className="size-5" />
                      </div>
                    )}
                    <h2 className="text-2xl font-semibold tracking-tight">{roleMeta?.label}</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Sign in with your{" "}
                    <span className="font-medium text-primary">Email, Staff ID or Matric Number</span>.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="identifier">Email / Staff ID / Matric Number</Label>
                    <Input
                      id="identifier"
                      placeholder="you@futminna.edu.ng"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        className="text-xs font-medium text-primary hover:underline"
                        onClick={() => toast.info("Password reset link sent (demo).")}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting && <Loader2 className="size-4 animate-spin" />}
                    Login as {roleMeta?.label}
                  </Button>
                </form>

                <p className="rounded-lg border border-dashed bg-muted/40 px-3 py-2 text-center text-xs text-muted-foreground">
                  Demo credentials are pre-filled. Password for all accounts:{" "}
                  <span className="font-medium text-foreground">password</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary-foreground/15">
        {icon}
      </div>
      <span className="text-xs text-primary-foreground/80">{label}</span>
    </div>
  )
}
