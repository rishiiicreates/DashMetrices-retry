import { Link, useLocation } from "wouter";

export default function MobileNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-10 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
      <div className="flex justify-around">
        <Link href="/dashboard">
          <a className={`flex flex-col items-center p-3 ${isActive("/dashboard") ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"}`}>
            <i className="ri-dashboard-line text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        <Link href="/analytics">
          <a className={`flex flex-col items-center p-3 ${isActive("/analytics") ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"}`}>
            <i className="ri-line-chart-line text-xl"></i>
            <span className="text-xs mt-1">Analytics</span>
          </a>
        </Link>
        <Link href="/saved">
          <a className={`flex flex-col items-center p-3 ${isActive("/saved") ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"}`}>
            <i className="ri-bookmark-line text-xl"></i>
            <span className="text-xs mt-1">Saved</span>
          </a>
        </Link>
        <Link href="/settings">
          <a className={`flex flex-col items-center p-3 ${isActive("/settings") ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"}`}>
            <i className="ri-settings-line text-xl"></i>
            <span className="text-xs mt-1">Settings</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
