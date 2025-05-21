"use client"

import { useState, useEffect } from "react"
import { StudentDashboard } from "./studentdashboard"
import { FacultyDashboard } from "./facultydashboard"
import { AdminDashboard } from "./admindashboard"


export default function DashboardPage() {
  const [role, setRole] = useState<"student" | "faculty" | "admin">("student")
  const [isClient, setIsClient] = useState(false)

  // Get the role from localStorage on component mount
  useEffect(() => {
    setIsClient(true)
    const storedRole = localStorage.getItem("userRole") as "student" | "faculty" | "admin" | null
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  // Only render the dashboard if we're on the client
  if (!isClient) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your {role === "student" ? "student" : role === "faculty" ? "faculty" : "admin"} dashboard
        </p>
      </div>

      {role === "student" && <StudentDashboard />}
      {role === "faculty" && <FacultyDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  )
}
