import { 
  users, 
  platforms, 
  savedProfiles, 
  payments, 
  type User, 
  type InsertUser,
  type Platform,
  type InsertPlatform,
  type SavedProfile,
  type InsertSavedProfile,
  type Payment,
  type InsertPayment
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User>;
  
  // Platform operations
  getPlatform(id: number): Promise<Platform | undefined>;
  getUserPlatforms(userId: number): Promise<Platform[]>;
  createPlatform(platform: InsertPlatform): Promise<Platform>;
  updatePlatform(id: number, data: Partial<Platform>): Promise<Platform>;
  deletePlatform(id: number): Promise<void>;
  getAllPlatforms(): Promise<Platform[]>; // For demo purposes
  
  // Saved profiles operations
  getSavedProfile(id: number): Promise<SavedProfile | undefined>;
  getUserSavedProfiles(userId: number): Promise<SavedProfile[]>;
  createSavedProfile(profile: InsertSavedProfile): Promise<SavedProfile>;
  deleteSavedProfile(id: number): Promise<void>;
  getAllSavedProfiles(): Promise<SavedProfile[]>; // For demo purposes
  
  // Payment operations
  getPayment(id: number): Promise<Payment | undefined>;
  getUserPayments(userId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  getAllPayments(): Promise<Payment[]>; // For demo purposes
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private platforms: Map<number, Platform>;
  private savedProfiles: Map<number, SavedProfile>;
  private payments: Map<number, Payment>;
  
  private userIdCounter: number;
  private platformIdCounter: number;
  private savedProfileIdCounter: number;
  private paymentIdCounter: number;

  constructor() {
    this.users = new Map();
    this.platforms = new Map();
    this.savedProfiles = new Map();
    this.payments = new Map();
    
    this.userIdCounter = 1;
    this.platformIdCounter = 1;
    this.savedProfileIdCounter = 1;
    this.paymentIdCounter = 1;
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Demo user
    const demoUser: User = {
      id: this.userIdCounter++,
      username: "demo_user",
      email: "demo@example.com",
      password: "hashed_password",
      avatar: "https://ui-avatars.com/api/?name=Demo+User",
      provider: "email",
      firebaseUid: "demo_firebase_uid",
      subscriptionTier: "pro",
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date(),
    };
    this.users.set(demoUser.id, demoUser);

    // Demo platforms
    const platformTypes = ["instagram", "youtube", "twitter", "facebook"];
    const platformNames = ["Instagram", "YouTube", "Twitter", "Facebook"];
    const platformUsernames = ["socialdemo", "socialdemoyt", "socialdemo", "socialdemo"];
    
    platformTypes.forEach((type, index) => {
      const stats: any = {};
      
      if (type === "instagram" || type === "twitter") {
        stats.followers = Math.floor(10000 + Math.random() * 90000);
        stats.engagement = 4 + Math.random() * 2;
        stats.posts = Math.floor(100 + Math.random() * 200);
        stats.reach = Math.floor(50000 + Math.random() * 100000);
      } else if (type === "youtube") {
        stats.subscribers = Math.floor(5000 + Math.random() * 30000);
        stats.engagement = 5 + Math.random() * 3;
        stats.videos = Math.floor(50 + Math.random() * 150);
        stats.views = Math.floor(100000 + Math.random() * 500000);
      } else if (type === "facebook") {
        stats.pageLikes = Math.floor(8000 + Math.random() * 20000);
        stats.engagement = 3 + Math.random() * 1.5;
        stats.posts = Math.floor(80 + Math.random() * 120);
        stats.reach = Math.floor(40000 + Math.random() * 80000);
      }
      
      // Add growth data
      stats.growth = {
        percentage: Math.floor(1 + Math.random() * 10),
        trend: Math.random() > 0.2 ? "up" : "down"
      };
      
      const platform: Platform = {
        id: this.platformIdCounter++,
        userId: demoUser.id,
        type: type as any,
        name: platformNames[index],
        username: platformUsernames[index],
        stats: stats,
        createdAt: new Date()
      };
      
      this.platforms.set(platform.id, platform);
    });

    // Demo saved profiles
    const profileNames = ["David Chen", "Sarah Johnson", "Michael Torres"];
    const profileUsernames = ["davidchen", "sarahj", "miketorres"];
    const profilePlatforms = ["Instagram", "YouTube", "Twitter"];
    const profileAvatars = [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/67.jpg"
    ];
    
    profileNames.forEach((name, index) => {
      const savedProfile: SavedProfile = {
        id: this.savedProfileIdCounter++,
        userId: demoUser.id,
        name: name,
        username: profileUsernames[index],
        platform: profilePlatforms[index],
        avatarUrl: profileAvatars[index],
        createdAt: new Date()
      };
      
      this.savedProfiles.set(savedProfile.id, savedProfile);
    });

    // Demo payment
    const payment: Payment = {
      id: this.paymentIdCounter++,
      userId: demoUser.id,
      amount: 2999,
      currency: "INR",
      status: "completed",
      provider: "razorpay",
      providerId: "pay_demo123456",
      planType: "monthly",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
    };
    
    this.payments.set(payment.id, payment);
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.firebaseUid === firebaseUid
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Platform operations
  async getPlatform(id: number): Promise<Platform | undefined> {
    return this.platforms.get(id);
  }

  async getUserPlatforms(userId: number): Promise<Platform[]> {
    return Array.from(this.platforms.values()).filter(
      (platform) => platform.userId === userId
    );
  }

  async createPlatform(platform: InsertPlatform): Promise<Platform> {
    const id = this.platformIdCounter++;
    const now = new Date();
    const newPlatform: Platform = { ...platform, id, createdAt: now };
    this.platforms.set(id, newPlatform);
    return newPlatform;
  }

  async updatePlatform(id: number, data: Partial<Platform>): Promise<Platform> {
    const platform = await this.getPlatform(id);
    if (!platform) {
      throw new Error(`Platform with ID ${id} not found`);
    }
    
    const updatedPlatform = { ...platform, ...data };
    this.platforms.set(id, updatedPlatform);
    return updatedPlatform;
  }

  async deletePlatform(id: number): Promise<void> {
    this.platforms.delete(id);
  }

  async getAllPlatforms(): Promise<Platform[]> {
    return Array.from(this.platforms.values());
  }

  // Saved profiles operations
  async getSavedProfile(id: number): Promise<SavedProfile | undefined> {
    return this.savedProfiles.get(id);
  }

  async getUserSavedProfiles(userId: number): Promise<SavedProfile[]> {
    return Array.from(this.savedProfiles.values()).filter(
      (profile) => profile.userId === userId
    );
  }

  async createSavedProfile(profile: InsertSavedProfile): Promise<SavedProfile> {
    const id = this.savedProfileIdCounter++;
    const now = new Date();
    const newProfile: SavedProfile = { ...profile, id, createdAt: now };
    this.savedProfiles.set(id, newProfile);
    return newProfile;
  }

  async deleteSavedProfile(id: number): Promise<void> {
    this.savedProfiles.delete(id);
  }

  async getAllSavedProfiles(): Promise<SavedProfile[]> {
    return Array.from(this.savedProfiles.values());
  }

  // Payment operations
  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.userId === userId
    );
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const id = this.paymentIdCounter++;
    const now = new Date();
    const newPayment: Payment = { ...payment, id, createdAt: now };
    this.payments.set(id, newPayment);
    return newPayment;
  }

  async getAllPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }
}

export const storage = new MemStorage();
