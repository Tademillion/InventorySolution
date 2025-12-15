"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, UserRole } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    email: "admin@inventorypro.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "cashier@inventorypro.com",
    password: "cashier123",
    name: "Cashier User",
    role: "cashier",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    email: "auditor@inventorypro.com",
    password: "auditor123",
    name: "Auditor User",
    role: "auditor",
    createdAt: new Date("2024-01-01"),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("inventory_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const mockUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!mockUser) {
      throw new Error("Invalid credentials")
    }

    const { password: _, ...userWithoutPassword } = mockUser
    setUser(userWithoutPassword)
    localStorage.setItem("inventory_user", JSON.stringify(userWithoutPassword))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("inventory_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return { user: null, isLoading: true, isAuthorized: false }
  }

  if (!user) {
    return { user: null, isLoading: false, isAuthorized: false }
  }

  const isAuthorized = allowedRoles ? allowedRoles.includes(user.role) : true

  return { user, isLoading: false, isAuthorized }
}
