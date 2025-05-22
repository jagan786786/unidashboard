"use client";

import Link from "next/link";
import {
  GraduationCap,
  ListCheck,
  BookOpen,
  LogOut,
  ChevronDown,
  ChevronUp,
  Mic2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export function AdminSidebar() {
  const router = useRouter();
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);

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
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <span className="text-muted-foreground dark:text-gray-400">
              <GraduationCap />
            </span>
            Dashboard
          </Link>

          {/* Faculty Dropdown */}
          <button
            onClick={() => setIsFacultyOpen(!isFacultyOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <span className="flex items-center gap-3">
              <ListCheck className="text-muted-foreground dark:text-gray-400" />
              Faculty
            </span>
            {isFacultyOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {isFacultyOpen && (
            <div className="pl-10 space-y-1">
              <Link
                href="/dashboard/faculty/list"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Faculty List
              </Link>
              <Link
                href="/dashboard/faculty/courselist"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Course List
              </Link>
              <Link
                href="/dashboard/faculty/schedulelist"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Schedule List
              </Link>
            </div>
          )}

          {/* Student Dropdown */}
          <button
            onClick={() => setIsStudentOpen(!isStudentOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <span className="flex items-center gap-3">
              <BookOpen className="text-muted-foreground dark:text-gray-400" />
              Student
            </span>
            {isStudentOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {isStudentOpen && (
            <div className="pl-10 space-y-1">
              <Link
                href="/dashboard/student/list"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Student List
              </Link>
              <Link
                href="/dashboard/student/course"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Course List
              </Link>
              <Link
                href="/dashboard/student/course"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Semester Registration
              </Link>
              <Link
                href="/dashboard/student/course"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Semester Form Fillup
              </Link>
            </div>
          )}
          <Link href="/dashboard/annoucement">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200">
              <span className="flex items-center gap-3">
                <Mic2 className="text-muted-foreground dark:text-gray-400" />
                Annoucements
              </span>
            </button>
          </Link>
        </nav>

        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-3">
            Support
          </p>
          <nav className="space-y-2">
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
