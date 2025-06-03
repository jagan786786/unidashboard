import { useEffect, useState } from "react";
import { Moon, Sun, User, KeyRound } from "lucide-react";
import { Menu } from "@headlessui/react";
import { Bell } from "lucide-react";
import axios from "axios";

export const TopNavbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userRole, setUserRole] = useState<"student" | "faculty" | "admin">(
    "student"
  );
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  // Inside TopNavbar component
  const [announcements, setAnnouncements] = useState<
    { title: string; message: string; date: string }[]
  >([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/admin/announcements"
        ); // adjust URL as needed
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

        const recent = res.data.filter((announcement: any) => {
          const announcementDate = new Date(announcement.date);
          return announcementDate >= fiveDaysAgo;
        });

        setAnnouncements(recent);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    // Load theme
    const savedTheme = (localStorage.getItem("theme") || "light") as
      | "light"
      | "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Load role
    const role = (localStorage.getItem("userRole") || "student") as
      | "student"
      | "faculty"
      | "admin";
    setUserRole(role);

    // Load user name and email
    const storedName = localStorage.getItem("name");
    const storedUserId = localStorage.getItem("userid") || "";
    const storedEmail = localStorage.getItem("email");

    setUserName(storedName || storedUserId); // fallback to userId if name isn't available
    setUserEmail(storedEmail || `${storedUserId}@university.edu`);
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

        {(userRole === "student" || userRole === "faculty") && (
          <Menu as="div" className="relative">
            <Menu.Button
              className="relative rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Notifications"
            >
              <Bell size={18} className="text-gray-800 dark:text-gray-200" />
              {announcements.length > 0 && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
              )}
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-96 overflow-y-auto">
              <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {announcements.length === 0 ? (
                  <div className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                    No recent announcements
                  </div>
                ) : (
                  announcements.map((item, idx) => (
                    <Menu.Item key={idx}>
                      {({ active }) => (
                        <div
                          className={`px-4 py-2 ${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.message}
                          </p>
                        </div>
                      )}
                    </Menu.Item>
                  ))
                )}
              </div>
            </Menu.Items>
          </Menu>
        )}

        {/* Profile Display & Dropdown */}
        {userRole !== "admin" ? (
          <Menu as="div" className="relative">
            <Menu.Button className="rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm cursor-pointer focus:outline-none">
              <p className="text-gray-800 dark:text-gray-200">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userEmail}
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
          <div className="rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm">
            <p className="text-gray-800 dark:text-gray-200">{userName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userEmail}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};
