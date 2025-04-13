import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { storage } from "../storage";

// Extend Express Request type to include session
declare global {
  namespace Express {
    interface Request {
      session: {
        userId?: number;
      };
    }
  }
}

// Initialize Razorpay with API keys
const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// Define subscription plans with prices
const SUBSCRIPTION_PLANS = {
  basic: {
    name: "Basic Plan",
    description: "Access to data for 30 days",
    price: {
      monthly: 999, // ₹999 (in paise)
      yearly: 9990, // ₹9,990 (in paise)
    },
    dataRetentionDays: 30,
  },
  pro: {
    name: "Pro Plan",
    description: "Access to data for 90 days with advanced analytics",
    price: {
      monthly: 2999, // ₹2,999 (in paise)
      yearly: 29990, // ₹29,990 (in paise)
    },
    dataRetentionDays: 90,
  },
};

/**
 * Create a new Razorpay order
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { planId, billingPeriod } = req.body;
    const userId = req.session.userId;

    // Check if plan exists
    if (!planId || !SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    // Check if billing period is valid
    if (!billingPeriod || !["monthly", "yearly"].includes(billingPeriod)) {
      return res.status(400).json({ error: "Invalid billing period" });
    }

    // Get plan details
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];
    const amount = plan.price[billingPeriod as keyof typeof plan.price];
    const currency = "INR";

    // Create Razorpay order
    const options = {
      amount,
      currency,
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        planId,
        billingPeriod,
        userId: userId?.toString() || "guest",
      },
    };

    const order = await razorpay.orders.create(options);

    // Return order details to client
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

/**
 * Verify Razorpay payment signature
 */
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const userId = req.session.userId;

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Fetch order details to get plan information
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const { planId, billingPeriod } = order.notes;

    // Fetch payment details
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // If userId is not available, user is not logged in
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Get current user
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create payment record in database
    const paymentRecord = await storage.createPayment({
      userId,
      amount: payment.amount,
      currency: payment.currency,
      status: "completed",
      provider: "razorpay",
      providerId: razorpay_payment_id,
      planType: billingPeriod,
    });

    // Calculate subscription expiry date
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];
    const now = new Date();
    const expiryDate = new Date();
    
    if (billingPeriod === "monthly") {
      expiryDate.setDate(now.getDate() + 30); // 30 days for monthly
    } else {
      expiryDate.setDate(now.getDate() + 365); // 365 days for yearly
    }

    // Update user subscription
    await storage.updateUser(userId, {
      subscriptionTier: planId,
      subscriptionExpiresAt: expiryDate,
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      subscription: {
        tier: planId,
        expiresAt: expiryDate,
        dataRetentionDays: plan.dataRetentionDays,
      },
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment" });
  }
};