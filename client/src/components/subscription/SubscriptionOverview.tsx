import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

export default function SubscriptionOverview() {
  const { userProfile } = useAuth();

  const tierDetails = {
    free: {
      icon: "ri-user-line",
      color: "gray",
      features: [
        "Track up to 3 social profiles",
        "Basic analytics",
        "7-day data history",
      ],
      progress: 0,
    },
    basic: {
      icon: "ri-vip-line",
      color: "primary",
      features: [
        "Track up to 10 social profiles",
        "Standard analytics and reports",
        "30-day data history",
        "Email notifications",
      ],
      progress: 50,
    },
    pro: {
      icon: "ri-vip-crown-line",
      color: "primary",
      features: [
        "Track up to 25 social profiles",
        "Advanced analytics and reports",
        "Custom dashboard views",
        "Team collaboration (3 members)",
      ],
      progress: 73,
    },
  };

  const currentTier = userProfile?.subscriptionTier || "free";
  const tierInfo = tierDetails[currentTier as keyof typeof tierDetails];

  // Calculate days until renewal
  const getRenewalDate = () => {
    if (!userProfile?.subscriptionExpiresAt) {
      return "Not applicable";
    }
    
    const expiryDate = new Date(userProfile.subscriptionExpiresAt);
    return expiryDate.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-dark-border">
        <h3 className="font-semibold text-gray-900 dark:text-white">Subscription Overview</h3>
      </div>
      <div className="p-5">
        <div className={`bg-${tierInfo.color}-50 dark:bg-${tierInfo.color}-900/20 rounded-lg p-4`}>
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full bg-${tierInfo.color}-100 dark:bg-${tierInfo.color}-800/40 flex items-center justify-center`}>
              <i className={`${tierInfo.icon} text-${tierInfo.color}-600 dark:text-${tierInfo.color}-400 text-xl`}></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {currentTier === "pro" 
                  ? "PRO Plan" 
                  : currentTier === "basic" 
                    ? "Basic Plan" 
                    : "Free Plan"}
              </p>
              {currentTier !== "free" && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {currentTier === "pro" ? "$29/month" : "$9/month"}, billed monthly
                </p>
              )}
            </div>
          </div>
          
          {currentTier !== "free" && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">
                  Next billing: {getRenewalDate()}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {tierInfo.progress}% used
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                <div 
                  className={`bg-${tierInfo.color}-600 dark:bg-${tierInfo.color}-500 h-2 rounded-full`} 
                  style={{ width: `${tierInfo.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-between">
            <Link href="/pricing">
              <a className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                {currentTier === "free" ? "Upgrade plan" : "Change plan"}
              </a>
            </Link>
            {currentTier !== "free" && (
              <Link href="/billing">
                <a className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:underline">
                  Billing history
                </a>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Plan Features
          </h4>
          <ul className="space-y-2">
            {tierInfo.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <i className="ri-check-line text-green-500 mr-2"></i>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
