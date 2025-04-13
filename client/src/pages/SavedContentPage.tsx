import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MobileNavigation from "@/components/layout/MobileNavigation";
import SavedProfileCard from "@/components/dashboard/SavedProfileCard";
import { SavedProfile } from "@/types";

export default function SavedContentPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState<string | null>(null);
  
  const { data: savedProfiles, isLoading } = useQuery<SavedProfile[]>({
    queryKey: ["/api/saved-profiles"],
  });

  const toggleSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Get unique platforms for filter
  const platforms = savedProfiles
    ? Array.from(new Set(savedProfiles.map(profile => profile.platform)))
    : [];

  // Filter profiles based on selected platform
  const filteredProfiles = filterPlatform
    ? savedProfiles?.filter(profile => profile.platform === filterPlatform)
    : savedProfiles;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-bg">
        <TopBar toggleSidebar={toggleSidebar} />

        {/* Saved Content */}
        <div className="p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Content</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your bookmarked profiles and content</p>
            </div>
            
            {/* Filter controls */}
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <select 
                  className="pl-4 pr-8 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-800 dark:text-gray-200 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={filterPlatform || ''}
                  onChange={(e) => setFilterPlatform(e.target.value || null)}
                >
                  <option value="">All platforms</option>
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-2.5 text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Saved Profiles Grid */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="p-5 border-b border-gray-200 dark:border-dark-border">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Saved Profiles {filterPlatform && `- ${filterPlatform}`}
              </h3>
            </div>
            
            <div className="p-5">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 animate-pulse">
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="ml-3 flex-1">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProfiles && filteredProfiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProfiles.map((profile) => (
                    <div key={profile.id} className="border border-gray-100 dark:border-gray-800 rounded-lg">
                      <SavedProfileCard profile={profile} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <i className="ri-bookmark-line text-2xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved profiles</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {filterPlatform 
                      ? `You haven't saved any profiles from ${filterPlatform} yet.` 
                      : "You haven't saved any profiles yet."}
                  </p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
                    <i className="ri-search-line mr-1.5"></i>
                    <span>Discover profiles</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
}
