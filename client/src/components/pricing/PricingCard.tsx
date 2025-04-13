import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SubscriptionPlan } from "@/types";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  plan: SubscriptionPlan;
  billingPeriod: 'monthly' | 'yearly';
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export default function PricingCard({ plan, billingPeriod, onSelectPlan }: PricingCardProps) {
  const { userProfile } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if this is the current plan
  const isCurrentPlan = userProfile?.subscriptionTier === plan.id;
  
  // Determine price based on billing period
  const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly;
  const discount = Math.round(100 - (plan.price.yearly * 12 / plan.price.monthly / 12 * 100));
  
  return (
    <div 
      className={`relative p-6 bg-white dark:bg-dark-card rounded-xl border ${
        plan.recommended 
          ? 'border-primary-400 dark:border-primary-500 shadow-md' 
          : 'border-gray-200 dark:border-dark-border shadow-sm'
      } flex flex-col h-full ${
        isHovered ? 'transform -translate-y-1 transition-all duration-200' : 'transition-all duration-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {plan.recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-medium">
          Recommended
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{price}</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
        </div>
        {billingPeriod === 'yearly' && (
          <div className="mt-1 text-xs text-green-600 dark:text-green-400 font-medium">
            Save {discount}% with annual billing
          </div>
        )}
      </div>
      
      <div className="mb-8 flex-grow">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Features include:</h4>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex text-sm">
              <i className="ri-check-line text-green-500 mr-2 mt-0.5"></i>
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button
        className={`w-full ${
          isCurrentPlan 
            ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            : plan.recommended
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-white hover:bg-gray-50 text-gray-800 dark:bg-dark-border dark:hover:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600'
        }`}
        onClick={() => onSelectPlan(plan)}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : 'Get Started'}
      </Button>
    </div>
  );
}
