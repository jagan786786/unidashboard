"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";

const navItems: Record<string, { label: string; href: string }[]> = {
  student: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Attendance", href: "/dashboard/attendance" },
    { label: "Courses", href: "/dashboard/courses" },
    { label: "Dues", href: "/dashboard/dues" },
    { label: "Semester Registration", href: "/dashboard/registration" },
    { label: "Form Fillup", href: "/dashboard/form-fillup" },
    { label: "Proctor Meeting", href: "/dashboard/proctor-meeting" },
  ],
  faculty: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Attendance", href: "/dashboard/attendance" },
    { label: "Courses", href: "/dashboard/courses" },
    { label: "Class Schedule", href: "/dashboard/schedule" },
    { label: "Student List", href: "/dashboard/students" },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "User Management", href: "/dashboard/users" },
    { label: "Reports", href: "/dashboard/reports" },
  ],
};

export function SideNav() {
  const [role, setRole] = useState<string | null>(null);

  React.useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  if (!role || !navItems[role]) return null;

  return (
    <nav className="w-64 bg-white dark:bg-gray-900 border-r p-4 h-screen">
      <ul className="space-y-2">
        {navItems[role].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

