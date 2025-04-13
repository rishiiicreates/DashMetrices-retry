import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import PricingCard from "@/components/pricing/PricingCard";
import { SubscriptionPlan } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Define subscription plans
  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      description: "For individuals just getting started",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        "Track up to 3 social profiles",
        "Basic analytics",
        "7-day data history",
        "Email support",
      ],
    },
    {
      id: "basic",
      name: "Basic",
      description: "For growing creators and small businesses",
      price: {
        monthly: 999,
        yearly: 9990,
      },
      features: [
        "Track up to 10 social profiles",
        "Standard analytics and reports",
        "30-day data history",
        "Email notifications",
        "Priority support",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professional marketers and businesses",
      price: {
        monthly: 2999,
        yearly: 29990,
      },
      features: [
        "Track up to 25 social profiles",
        "Advanced analytics and reports",
        "Custom dashboard views",
        "Team collaboration (3 members)",
        "API access",
        "Priority support",
      ],
      recommended: true,
    },
  ];

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    // Check if user is logged in
    if (!currentUser) {
      toast({
        title: "Login required",
        description: "Please login or signup to subscribe to a plan",
        variant: "default",
      });
      
      setLocation("/login?redirect=pricing");
      return;
    }

    // For a real implementation, you would integrate with Razorpay here
    console.log(`Selected plan: ${plan.id}, Billing: ${billingPeriod}`);
    
    toast({
      title: "Payment integration",
      description: "Razorpay payment integration would be triggered here in a production environment",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <a className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
                  <i className="ri-bar-chart-box-line text-white text-xl"></i>
                </div>
                <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DashMetrics</h1>
              </a>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <i className={`${theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'} text-xl`}></i>
              </button>
              
              {currentUser ? (
                <Link href="/dashboard">
                  <a className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                    Dashboard
                  </a>
                </Link>
              ) : (
                <div className="flex space-x-3">
                  <Link href="/login">
                    <a className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                      Login
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium">
                      Sign up
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans come with a 14-day free trial.
          </p>

          {/* Billing toggle */}
          <div className="flex justify-center mt-8">
            <div className="relative bg-gray-100 dark:bg-dark-border p-1 rounded-lg inline-flex">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  billingPeriod === 'monthly'
                    ? 'bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  billingPeriod === 'yearly'
                    ? 'bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                onClick={() => setBillingPeriod('yearly')}
              >
                Yearly <span className="text-green-500 font-medium">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Can I change my plan later?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time from your account settings.
                </p>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway powered by Razorpay.
                </p>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Can I cancel my subscription?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-card mt-20 py-12 border-t border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
                <i className="ri-bar-chart-box-line text-white text-xl"></i>
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DashMetrics</h1>
            </div>
            
            <p className="mt-4 md:mt-0 text-gray-500 dark:text-gray-400 text-sm">
              © 2023 DashMetrics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
