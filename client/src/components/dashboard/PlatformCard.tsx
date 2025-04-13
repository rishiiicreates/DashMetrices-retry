import { Platform } from "@/types";

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  // Get the appropriate icon and color based on platform type
  const getPlatformIcon = (type: string) => {
    switch (type) {
      case 'instagram':
        return { icon: 'ri-instagram-line', color: 'blue' };
      case 'youtube':
        return { icon: 'ri-youtube-line', color: 'red' };
      case 'twitter':
        return { icon: 'ri-twitter-x-line', color: 'blue' };
      case 'facebook':
        return { icon: 'ri-facebook-circle-line', color: 'blue' };
      default:
        return { icon: 'ri-global-line', color: 'gray' };
    }
  };

  const { icon, color } = getPlatformIcon(platform.type);

  // Helper to format stats and determine if growth is positive
  const formatStat = (value: number | undefined) => {
    if (value === undefined) return "N/A";
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
  };

  // Extract the appropriate metrics based on platform type
  const getMetrics = () => {
    const stats = platform.stats;
    const metrics = [];

    if (platform.type === 'instagram' || platform.type === 'twitter') {
      metrics.push({
        name: 'Followers',
        value: formatStat(stats.followers),
        growth: stats.growth
      });
      metrics.push({
        name: 'Engagement',
        value: stats.engagement ? `${stats.engagement.toFixed(1)}%` : 'N/A',
        growth: stats.growth
      });
    } else if (platform.type === 'youtube') {
      metrics.push({
        name: 'Subscribers',
        value: formatStat(stats.subscribers),
        growth: stats.growth
      });
      metrics.push({
        name: 'Views',
        value: formatStat(stats.views),
        growth: stats.growth
      });
    } else if (platform.type === 'facebook') {
      metrics.push({
        name: 'Page Likes',
        value: formatStat(stats.pageLikes),
        growth: stats.growth
      });
      metrics.push({
        name: 'Engagement',
        value: stats.engagement ? `${stats.engagement.toFixed(1)}%` : 'N/A',
        growth: stats.growth
      });
    }

    return metrics;
  };

  const metrics = getMetrics();

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-5 border border-gray-200 dark:border-dark-border">
      <div className="flex items-center mb-4">
        <div className={`h-10 w-10 rounded-full bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center`}>
          <i className={`${icon} text-${color}-600 dark:text-${color}-400 text-xl`}></i>
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {platform.name}
          </h3>
        </div>
        <button className="ml-auto p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border">
          <i className="ri-more-2-fill"></i>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index}>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{metric.name}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{metric.value}</p>
            {metric.growth && (
              <span className={`inline-flex items-center mt-1 text-xs font-medium ${
                metric.growth.trend === 'up' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <i className={`${metric.growth.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-0.5`}></i>
                <span>{metric.growth.percentage.toFixed(1)}%</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
