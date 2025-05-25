"use client";

import Link from "next/link";
import {
  GraduationCap,
  ListCheck,

  BookOpen,
  
  Speech,
  LifeBuoy,
  LogOut,
  Phone,
  Presentation,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <GraduationCap /> },
  { label: "Attendance", href: "/dashboard/markattendance", icon: <ListCheck /> },
  { label: "Courses", href: "/dashboard/courses", icon: <BookOpen /> },
  { label: "Class Schedule", href: "/dashboard/class-schedule", icon: <BookOpen /> },
  { label: "Meeting", href: "/dashboard/meeting", icon: <Speech /> },
  { label: "Training", href: "/dashboard/training", icon: <Presentation /> },
];



export function FacultySidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear stored role or any other user info
    localStorage.removeItem("userRole");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 h-screen p-4 flex flex-col justify-between text-gray-900 dark:text-gray-100">
      <div>
        <div className="text-xl font-bold mb-6"><Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.jpg" 
              alt="Logo"
              width={35}
              height={35}
              className="rounded" // Optional: add styling
            />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              GIET UNIVERSITY
            </span>
          </Link></div>

        <nav className="space-y-2 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <span className="text-muted-foreground">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 px-3">
            Support
          </p>
          <nav className="space-y-2">
           

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <span className="text-muted-foreground">
                <LogOut />
              </span>
              Logout
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
}
