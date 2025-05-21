"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const TopNavbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") || "light") as
      | "light"
      | "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm h-16">
      {/* Empty div for left side to push right content to end */}
      <div></div>

      {/* Right side: Theme toggle and user info */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle Dark Mode"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div className="rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm cursor-pointer">
          <p className="text-gray-800 dark:text-gray-200">John Doe</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            john.doe@university.edu
          </p>
        </div>
      </div>
    </nav>
  );
};
