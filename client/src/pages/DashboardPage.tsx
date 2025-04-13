import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MobileNavigation from "@/components/layout/MobileNavigation";
import StatsSummary from "@/components/dashboard/StatsSummary";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import PlatformCard from "@/components/dashboard/PlatformCard";
import SavedProfileCard from "@/components/dashboard/SavedProfileCard";
import SubscriptionOverview from "@/components/subscription/SubscriptionOverview";
import { Link } from "wouter";
import { Platform, SavedProfile } from "@/types";

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: platforms, isLoading: isLoadingPlatforms } = useQuery<Platform[]>({
    queryKey: ["/api/platforms"],
  });
  
  const { data: savedProfiles, isLoading: isLoadingSavedProfiles } = useQuery<SavedProfile[]>({
    queryKey: ["/api/saved-profiles"],
  });

  const toggleSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-bg">
        <TopBar toggleSidebar={toggleSidebar} />

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Track and analyze your social media performance</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <select className="pl-4 pr-8 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-800 dark:text-gray-200 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-2.5 text-gray-400"></i>
              </div>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium flex items-center">
                <i className="ri-download-2-line mr-1.5"></i>
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          <StatsSummary />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Platform Performance - Column 1-2 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Chart */}
              <PerformanceChart />

              {/* Social Media Platforms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoadingPlatforms ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-5 border border-gray-200 dark:border-dark-border animate-pulse">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="ml-3 h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <div key={i}>
                            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                            <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : platforms && platforms.length > 0 ? (
                  platforms.map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <i className="ri-add-line text-3xl text-gray-400"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No social platforms added</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Connect your social media accounts to start tracking
                    </p>
                    <button className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
                      <i className="ri-add-line mr-1.5"></i>
                      <span>Add Platform</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Content - Column 3 */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-dark-border">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Saved Profiles</h3>
                    <Link href="/saved">
                      <a className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View all</a>
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {isLoadingSavedProfiles ? (
                      Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center p-3 animate-pulse">
                          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          <div className="ml-3 flex-1">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        </div>
                      ))
                    ) : savedProfiles && savedProfiles.length > 0 ? (
                      <>
                        {savedProfiles.slice(0, 3).map((profile) => (
                          <SavedProfileCard key={profile.id} profile={profile} />
                        ))}
                        {savedProfiles.length > 3 && (
                          <Link href="/saved">
                            <a className="block text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline py-2">
                              Show more profiles
                            </a>
                          </Link>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                          <i className="ri-bookmark-line text-xl text-gray-400"></i>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No saved profiles yet
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Bookmark profiles you want to track
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Subscription Overview */}
              <SubscriptionOverview />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
}
