"use client"

import { useEffect, useState } from "react"
import { FacultySidebar } from "@/components/sidebar/faculty-sidebar"
import { StudentSidebar } from "@/components/sidebar/student-sidebar"
import { AdminSidebar } from "@/components/sidebar/admin-sidebar"
import { TopNavbar } from "@/components/topnavbar"


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<"student" | "faculty" | "admin" | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedRole = localStorage.getItem("userRole") as "student" | "faculty" | "admin" | null
    setRole(storedRole)
  }, [])

  if (!isClient || !role) {
    return null
  }

  const renderSidebar = () => {
    switch (role) {
      case "student":
        return <StudentSidebar />
      case "faculty":
        return <FacultySidebar />
      case "admin":
        return <AdminSidebar />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar - fixed width */}
      <div className="w-64 shrink-0">
        {renderSidebar()}
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  )
}
