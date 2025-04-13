import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password"),
  avatar: text("avatar"),
  provider: text("provider"),
  firebaseUid: text("firebase_uid").unique(),
  subscriptionTier: text("subscription_tier").default("free"),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const platforms = pgTable("platforms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // instagram, youtube, twitter, facebook
  name: text("name").notNull(),
  username: text("username").notNull(),
  stats: jsonb("stats").notNull(), // Followers, engagement rate, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const savedProfiles = pgTable("saved_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(), 
  username: text("username").notNull(),
  platform: text("platform").notNull(), // instagram, youtube, twitter, facebook
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("INR"),
  status: text("status").notNull(),
  provider: text("provider").notNull(),
  providerId: text("provider_id"),
  planType: text("plan_type").notNull(), // monthly, yearly
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});

export const insertPlatformSchema = createInsertSchema(platforms).omit({
  id: true,
  createdAt: true
});

export const insertSavedProfileSchema = createInsertSchema(savedProfiles).omit({
  id: true,
  createdAt: true
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPlatform = z.infer<typeof insertPlatformSchema>;
export type Platform = typeof platforms.$inferSelect;

export type InsertSavedProfile = z.infer<typeof insertSavedProfileSchema>;
export type SavedProfile = typeof savedProfiles.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
