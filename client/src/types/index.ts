// User types
export interface UserProfile {
  id?: number;
  uid?: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  subscriptionTier: 'free' | 'basic' | 'pro';
  subscriptionExpiresAt?: Date;
}

// Platform specific stats
export interface SocialStats {
  followers?: number;
  subscribers?: number;
  pageLikes?: number;
  engagement?: number;
  posts?: number;
  videos?: number;
  tweets?: number;
  views?: number;
  reach?: number;
  growth?: {
    percentage: number;
    trend: 'up' | 'down';
  };
}

// Social platform
export interface Platform {
  id: number;
  userId: number;
  type: 'instagram' | 'youtube' | 'twitter' | 'facebook';
  name: string;
  username: string;
  stats: SocialStats;
  createdAt?: Date;
}

// Saved profile
export interface SavedProfile {
  id: number;
  userId: number;
  name: string;
  username: string;
  platform: string;
  avatarUrl?: string;
  createdAt?: Date;
}

// Analytics summary
export interface AnalyticsSummary {
  totalFollowers: number;
  totalEngagement: number;
  totalPosts: number;
  totalReach: number;
  platforms: Platform[];
}

// Subscription plans
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  recommended?: boolean;
}

// Payment
export interface Payment {
  id: number;
  userId: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  provider: 'razorpay';
  providerId?: string;
  planType: 'monthly' | 'yearly';
  createdAt?: Date;
}
