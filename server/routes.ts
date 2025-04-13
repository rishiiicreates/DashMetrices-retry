import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSavedProfileSchema, insertPaymentSchema } from "@shared/schema";
import { z } from "zod";
import { createOrder, verifyPayment } from "./controllers/payments";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/auth/user", async (req, res) => {
    // This route would typically be protected by Firebase Auth
    // For now, we'll return a success message
    res.json({ message: "Authentication will be handled by Firebase" });
  });

  // Get user platforms
  app.get("/api/platforms", async (req, res) => {
    try {
      const platforms = await storage.getAllPlatforms();
      res.json(platforms);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch platforms" });
    }
  });

  // Get user saved profiles
  app.get("/api/saved-profiles", async (req, res) => {
    try {
      const savedProfiles = await storage.getAllSavedProfiles();
      res.json(savedProfiles);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch saved profiles" });
    }
  });

  // Save a profile
  app.post("/api/saved-profiles", async (req, res) => {
    try {
      const data = insertSavedProfileSchema.parse(req.body);
      const savedProfile = await storage.createSavedProfile(data);
      res.status(201).json(savedProfile);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data format", errors: err.errors });
      }
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  // Delete a saved profile
  app.delete("/api/saved-profiles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      await storage.deleteSavedProfile(id);
      res.status(200).json({ message: "Profile removed from saved list" });
    } catch (err) {
      res.status(500).json({ message: "Failed to remove saved profile" });
    }
  });

  // Process payment (legacy route)
  app.post("/api/payments", async (req, res) => {
    try {
      const data = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(data);
      res.status(201).json(payment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid payment data", errors: err.errors });
      }
      res.status(500).json({ message: "Failed to process payment" });
    }
  });
  
  // Razorpay - Create new order
  app.post("/api/payments/create-order", createOrder);
  
  // Razorpay - Verify payment
  app.post("/api/payments/verify", verifyPayment);

  // Get analytics data
  app.get("/api/analytics", async (req, res) => {
    try {
      const platforms = await storage.getAllPlatforms();
      
      // Calculate totals and aggregates from platforms data
      const totalFollowers = platforms.reduce((sum, p) => {
        const stats = p.stats as any;
        return sum + (stats.followers || stats.subscribers || stats.pageLikes || 0);
      }, 0);
      
      const totalEngagement = platforms.reduce((sum, p) => {
        const stats = p.stats as any;
        return sum + (stats.engagement || 0);
      }, 0) / platforms.length || 0;
      
      const totalPosts = platforms.reduce((sum, p) => {
        const stats = p.stats as any;
        return sum + (stats.posts || stats.videos || stats.tweets || 0);
      }, 0);
      
      const totalReach = platforms.reduce((sum, p) => {
        const stats = p.stats as any;
        return sum + (stats.reach || stats.views || 0);
      }, 0);
      
      res.json({
        totalFollowers,
        totalEngagement,
        totalPosts,
        totalReach,
        platforms
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch analytics data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
