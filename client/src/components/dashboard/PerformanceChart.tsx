import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

type ChartType = "followers" | "engagement" | "reach";

interface ChartData {
  date: string;
  followers: number;
  engagement: number;
  reach: number;
}

// Mock data for chart demonstration
const mockChartData: ChartData[] = [
  { date: "Oct 12", followers: 70, engagement: 30, reach: 45 },
  { date: "Oct 14", followers: 85, engagement: 35, reach: 60 },
  { date: "Oct 16", followers: 60, engagement: 55, reach: 70 },
  { date: "Oct 18", followers: 90, engagement: 60, reach: 85 },
  { date: "Oct 20", followers: 75, engagement: 40, reach: 65 },
  { date: "Oct 22", followers: 80, engagement: 70, reach: 90 },
  { date: "Oct 24", followers: 95, engagement: 65, reach: 55 },
  { date: "Oct 26", followers: 65, engagement: 50, reach: 75 },
  { date: "Oct 28", followers: 75, engagement: 45, reach: 80 },
];

export default function PerformanceChart() {
  const [activeType, setActiveType] = useState<ChartType>("followers");
  const [animated, setAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Animate bars on load
    if (!animated && chartRef.current) {
      setAnimated(true);
      const bars = chartRef.current.querySelectorAll('.chart-bar');
      
      bars.forEach(bar => {
        const htmlBar = bar as HTMLElement;
        const originalHeight = htmlBar.style.height;
        htmlBar.style.height = '0%';
        
        setTimeout(() => {
          htmlBar.style.height = originalHeight;
        }, 100);
      });
    }
  }, [animated]);

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-dark-border">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white">Performance Overview</h3>
          <div className="flex items-center space-x-2 text-sm">
            <button 
              className={`px-3 py-1 rounded-full ${activeType === 'followers' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} font-medium`}
              onClick={() => setActiveType('followers')}
            >
              Followers
            </button>
            <button 
              className={`px-3 py-1 rounded-full ${activeType === 'engagement' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} font-medium`}
              onClick={() => setActiveType('engagement')}
            >
              Engagement
            </button>
            <button 
              className={`px-3 py-1 rounded-full ${activeType === 'reach' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} font-medium`}
              onClick={() => setActiveType('reach')}
            >
              Reach
            </button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="chart-container" ref={chartRef}>
          {mockChartData.map((item, index) => (
            <div 
              key={index} 
              className="chart-bar" 
              style={{
                left: `${4 + (index * 10)}%`, 
                height: `${item[activeType]}%`,
                backgroundColor: theme === 'dark' ? '#60A5FA' : '#3B82F6'
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {mockChartData.map((item, index) => (
            <span key={index}>{item.date}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
