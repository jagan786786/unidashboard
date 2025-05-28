import { useEffect, useState } from "react";
import { Moon, Sun, User, KeyRound } from "lucide-react";
import { Menu } from "@headlessui/react";

export const TopNavbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userRole, setUserRole] = useState<"student" | "faculty" | "admin">("student");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Load theme
    const savedTheme = (localStorage.getItem("theme") || "light") as "light" | "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Load role
    const role = (localStorage.getItem("userRole") || "student") as "student" | "faculty" | "admin";
    setUserRole(role);

    // Load username (or userId)
    const storedUserName = localStorage.getItem("userid");
    setUserName(storedUserName ?? "");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const profileLink =
    userRole === "faculty"
      ? "/dashboard/facultyprofile"
      : "/dashboard/studentprofile";

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm h-16">
      <div></div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle Dark Mode"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Profile Display & Dropdown (only for student/faculty) */}
        {userRole !== "admin" ? (
          <Menu as="div" className="relative">
            <Menu.Button className="rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm cursor-pointer focus:outline-none">
              <p className="text-gray-800 dark:text-gray-200">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userRole}@university.edu
              </p>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={profileLink}
                      className={`flex items-center gap-2 px-4 py-2 ${
                        active ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      <User size={16} />
                      Profile
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/dashboard/change-password"
                      className={`flex items-center gap-2 px-4 py-2 ${
                        active ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      <KeyRound size={16} />
                      Change Password
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        ) : (
          // For admin, show plain name/email without dropdown
          <div className="rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm">
            <p className="text-gray-800 dark:text-gray-200">{userName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userRole}@university.edu
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};
