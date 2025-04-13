import { useStats } from "@/hooks/useStats";

export default function StatsSummary() {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-5 border border-gray-200 dark:border-dark-border animate-pulse">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">No analytics data available</p>
      </div>
    );
  }

  // Format large numbers with K suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Stats cards data
  const statCards = [
    {
      title: "Total Followers",
      value: formatNumber(stats.totalFollowers),
      change: "+12.5%",
      trend: "up",
      icon: "ri-user-follow-line",
      color: "primary",
    },
    {
      title: "Engagement Rate",
      value: stats.totalEngagement.toFixed(1) + "%",
      change: "-2.1%",
      trend: "down",
      icon: "ri-heart-3-line",
      color: "secondary",
    },
    {
      title: "Total Posts",
      value: formatNumber(stats.totalPosts),
      change: "+8.3%",
      trend: "up",
      icon: "ri-file-list-3-line",
      color: "accent",
    },
    {
      title: "Reach",
      value: formatNumber(stats.totalReach),
      change: "+24.2%",
      trend: "up",
      icon: "ri-eye-line",
      color: "green",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-5 border border-gray-200 dark:border-dark-border">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</h3>
              <span className={`inline-flex items-center mt-1 text-xs font-medium ${
                stat.trend === "up" 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              }`}>
                <i className={`${stat.trend === "up" ? "ri-arrow-up-line" : "ri-arrow-down-line"} mr-0.5`}></i>
                <span>{stat.change}</span>
              </span>
            </div>
            <div className={`h-10 w-10 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 flex items-center justify-center`}>
              <i className={`${stat.icon} text-${stat.color}-600 dark:text-${stat.color}-400 text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
