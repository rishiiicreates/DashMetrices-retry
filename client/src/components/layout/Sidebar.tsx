import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  closeMobileMenu?: () => void;
}

export default function Sidebar({ isMobileMenuOpen, closeMobileMenu }: SidebarProps) {
  const [location] = useLocation();
  const { userProfile, logout } = useAuth();

  const isActive = (path: string) => location === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarClass = isMobileMenuOpen
    ? "fixed inset-0 z-40 flex flex-col w-64 h-screen bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border transform translate-x-0 transition-transform duration-200 ease-in-out"
    : "hidden md:flex flex-col w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border";

  return (
    <aside className={sidebarClass}>
      <div className="p-4 border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
            <i className="ri-bar-chart-box-line text-white text-xl"></i>
          </div>
          <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DashMetrics</h1>
          {isMobileMenuOpen && (
            <button
              onClick={closeMobileMenu}
              className="ml-auto p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">
              <a
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  isActive("/dashboard")
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border"
                }`}
              >
                <i className="ri-dashboard-line mr-3 text-lg"></i>
                <span>Dashboard</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/saved">
              <a
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  isActive("/saved")
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border"
                }`}
              >
                <i className="ri-bookmark-line mr-3 text-lg"></i>
                <span>Saved Content</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/analytics">
              <a className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border">
                <i className="ri-line-chart-line mr-3 text-lg"></i>
                <span>Analytics</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border">
                <i className="ri-settings-line mr-3 text-lg"></i>
                <span>Settings</span>
              </a>
            </Link>
          </li>
        </ul>

        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Subscription
          </h3>
          <div className="mt-2 px-4 py-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {userProfile?.subscriptionTier === "pro" ? "PRO Plan" : 
                 userProfile?.subscriptionTier === "basic" ? "Basic Plan" : "Free Plan"}
              </p>
              {userProfile?.subscriptionTier !== "free" && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-500 text-white">
                  Active
                </span>
              )}
            </div>
            {userProfile?.subscriptionTier !== "free" && userProfile?.subscriptionExpiresAt && (
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Renews on {new Date(userProfile.subscriptionExpiresAt).toLocaleDateString()}
              </p>
            )}
            <Link href="/pricing">
              <a className="mt-2 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                {userProfile?.subscriptionTier !== "free" ? "Manage subscription" : "Upgrade plan"}
              </a>
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-dark-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {userProfile?.photoURL ? (
              <img src={userProfile.photoURL} alt="User" className="h-full w-full object-cover" />
            ) : (
              <i className="ri-user-line text-gray-600 dark:text-gray-300"></i>
            )}
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {userProfile?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border"
          >
            <i className="ri-logout-box-line"></i>
          </button>
        </div>
      </div>
    </aside>
  );
}
