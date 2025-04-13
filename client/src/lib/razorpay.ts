declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number; // in smallest currency unit (paise for INR)
  currency: string;
  name: string;
  description: string;
  orderId: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

/**
 * Initialize a new Razorpay payment instance
 * @param options - Payment options
 */
export const initializeRazorpayPayment = (options: PaymentOptions): void => {
  const key = "rzp_test_Q3TG6bS8HRFFhq";
  
  if (!key) {
    console.error('Razorpay Key ID is not defined');
    return;
  }

  // Load Razorpay script if not already loaded
  if (!window.Razorpay) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      createRazorpayInstance(key, options);
    };
  } else {
    createRazorpayInstance(key, options);
  }
};

const createRazorpayInstance = (key: string, options: PaymentOptions): void => {
  const razorpayOptions = {
    key,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    handler: options.handler,
    prefill: options.prefill || {},
    notes: options.notes || {},
    theme: options.theme || { color: '#3B82F6' }, // Primary color
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
  }
};

/**
 * Create a new order on the server
 * @param planId - Subscription plan ID
 * @param billingPeriod - Monthly or yearly billing
 * @returns The order details with order ID
 */
export const createOrder = async (planId: string, billingPeriod: 'monthly' | 'yearly'): Promise<{ orderId: string; amount: number }> => {
  try {
    const response = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        planId, 
        billingPeriod 
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Verify a payment after completion
 * @param paymentData - Razorpay response containing payment ID, order ID and signature
 * @returns The verification result
 */
export const verifyPayment = async (paymentData: RazorpayResponse): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('/api/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};