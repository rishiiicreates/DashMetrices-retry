import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionPlan } from '@/types';
import { createOrder, initializeRazorpayPayment, verifyPayment } from '@/lib/razorpay';

interface SubscriptionPaymentProps {
  plan: SubscriptionPlan;
  billingPeriod: 'monthly' | 'yearly';
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function SubscriptionPayment({
  plan,
  billingPeriod,
  onSuccess,
  onCancel
}: SubscriptionPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser, userProfile } = useAuth();

  // Get price based on billing period
  const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price / 100);

  const handlePayment = async () => {
    if (!currentUser) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to subscribe to a plan',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create order on server
      const orderData = await createOrder(plan.id, billingPeriod);
      
      // Initialize Razorpay payment
      initializeRazorpayPayment({
        amount: orderData.amount,
        currency: 'INR',
        name: 'DashMetrics',
        description: `${plan.name} - ${billingPeriod} subscription`,
        orderId: orderData.orderId,
        prefill: {
          name: currentUser.displayName || undefined,
          email: currentUser.email || undefined,
        },
        handler: async (response) => {
          try {
            // Verify payment on server
            const verificationResult = await verifyPayment(response);
            
            if (verificationResult.success) {
              toast({
                title: 'Payment Successful',
                description: `You've successfully subscribed to the ${plan.name} plan.`,
              });
              
              // Call success callback
              if (onSuccess) {
                onSuccess();
              }
            } else {
              toast({
                title: 'Payment Failed',
                description: verificationResult.message || 'There was an error processing your payment.',
                variant: 'destructive',
              });
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: 'Verification Failed',
              description: 'We could not verify your payment. Please contact support.',
              variant: 'destructive',
            });
          } finally {
            setIsLoading(false);
          }
        },
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: 'Payment Failed',
        description: 'There was an error initializing the payment gateway. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>
          {billingPeriod === 'monthly' ? 'Monthly' : 'Annual'} subscription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-3xl font-bold">{formattedPrice}</span>
            <span className="text-gray-500 dark:text-gray-400">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium mb-2">Included in this plan:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <svg
                    className="h-4 w-4 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {userProfile?.subscriptionTier === plan.id && (
            <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm">
              You are currently subscribed to this plan
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          onClick={handlePayment}
          className="w-full"
          disabled={isLoading || userProfile?.subscriptionTier === plan.id}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : userProfile?.subscriptionTier === plan.id ? (
            'Current Plan'
          ) : (
            `Subscribe ${formattedPrice}/${billingPeriod === 'monthly' ? 'mo' : 'yr'}`
          )}
        </Button>
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full"
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}