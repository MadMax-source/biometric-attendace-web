"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { DEMO_ACCOUNTS, type Role, type User } from "@/lib/mock-data"

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (identifier: string, password: string) => { ok: boolean; role?: Role; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = "bioattend_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  function login(identifier: string, password: string) {
    const match = DEMO_ACCOUNTS.find(
      (a) => a.identifier.toLowerCase() === identifier.trim().toLowerCase() && a.password === password,
    )
    if (!match) {
      return { ok: false, error: "Invalid credentials. Use a demo account below." }
    }
    const nextUser: User = {
      id: match.role,
      name: match.label,
      identifier: match.identifier,
      role: match.role,
    }
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    return { ok: true, role: match.role }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
