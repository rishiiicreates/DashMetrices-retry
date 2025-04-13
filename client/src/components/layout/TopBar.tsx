import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface TopBarProps {
  toggleSidebar: () => void;
}

export default function TopBar({ toggleSidebar }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-dark-card shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border"
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
          <h1 className="ml-2 text-lg font-bold text-gray-900 dark:text-white">DashMetrics</h1>
        </div>

        <div className="hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
            />
            <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="md:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border">
            <i className="ri-search-line text-xl"></i>
          </button>
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i className={`${theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'} text-xl`}></i>
          </button>
          <button className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border relative">
            <i className="ri-notification-3-line text-xl"></i>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
