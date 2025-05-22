"use client";

import Link from "next/link";
import {
  GraduationCap,
  ListCheck,
  FilePlus,
  Wallet,
  BookOpen,
  UserRoundPen,
  Speech,
  LifeBuoy,
  LogOut,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <GraduationCap /> },
  { label: "Attendance", href: "/dashboard/attendance", icon: <ListCheck /> },
  { label: "Subjects", href: "/dashboard/subjects", icon: <BookOpen /> },
  { label: "College Dues", href: "/dashboard/dues", icon: <Wallet /> },
  {
    label: "Semester Registration",
    href: "/dashboard/registration",
    icon: <UserRoundPen />,
  },
  {
    label: "Semester Formfillup",
    href: "/dashboard/formfillup",
    icon: <FilePlus />,
  },
  { label: "Proctor Meeting", href: "/dashboard/proctormeeting", icon: <Speech /> },
];

const supportItems = [
  { label: "Contact Us", href: "/dashboard/contact", icon: <Phone /> },
  { label: "Help Center", href: "/dashboard/help", icon: <LifeBuoy /> },
];

export function StudentSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 h-screen p-4 flex flex-col justify-between text-gray-900 dark:text-gray-100">
      <div>
        <div className="text-xl font-bold mb-6">
          <Link href="/dashboard" className="flex items-center gap-2">
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
          </Link>
        </div>

        <nav className="space-y-2 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <span className="text-muted-foreground dark:text-gray-400">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-3">
            Support
          </p>
          <nav className="space-y-2">
            {supportItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <span className="text-muted-foreground dark:text-gray-400">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <span className="text-muted-foreground dark:text-gray-400">
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
