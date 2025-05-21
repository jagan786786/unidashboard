"use client";

import Link from "next/link";
import {
  GraduationCap,
  ListCheck,
  FileText,
  Wallet,
  BookOpen,
  UserRoundPen,
  FilePlus,
  Speech,
  LifeBuoy,
  LogOut,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <GraduationCap /> },
  { label: "Attendance", href: "/dashboard/attendance", icon: <ListCheck /> },
  { label: "Courses", href: "/dashboard/courses", icon: <BookOpen /> },
  { label: "Class Schedule", href: "/dashboard/class-schedule", icon: <BookOpen /> },
  

  { label: " Meeting", href: "/dashboard/meeting", icon: <Speech /> },
];

const supportItems = [
  { label: "Contact Us", href: "/dashboard/contact", icon: <Phone /> },
  { label: "Help Center", href: "/dashboard/help", icon: <LifeBuoy /> },
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
        <div className="text-xl font-bold mb-6">🎓 UniPortal</div>

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
            {supportItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <span className="text-muted-foreground">{item.icon}</span>
                {item.label}
              </Link>
            ))}

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
