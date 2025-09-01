import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  totalCredits: integer("total_credits").notNull().default(500),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: varchar("position", { length: 1 }).notNull(), // P, D, C, A
  team: text("team").notNull(),
  price: integer("price").notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  goals: integer("goals").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  yellowCards: integer("yellow_cards").notNull().default(0),
  redCards: integer("red_cards").notNull().default(0),
  matchesPlayed: integer("matches_played").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const userTeams = pgTable("user_teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  playerId: varchar("player_id").notNull().references(() => players.id),
  purchasePrice: integer("purchase_price").notNull(),
  purchasedAt: timestamp("purchased_at").notNull().default(sql`now()`),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  playerId: varchar("player_id").notNull().references(() => players.id),
  type: varchar("type", { length: 10 }).notNull(), // BUY, SELL
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  totalCredits: true,
  createdAt: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
});

export const insertUserTeamSchema = createInsertSchema(userTeams).omit({
  id: true,
  purchasedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type UserTeam = typeof userTeams.$inferSelect;
export type InsertUserTeam = z.infer<typeof insertUserTeamSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

// Additional types for API responses
export type TeamStats = {
  playerCount: number;
  spentCredits: number;
  remainingCredits: number;
  averageRating: number;
  totalGoals: number;
  totalAssists: number;
};

export type PlayerRecommendation = {
  player: Player;
  reason: string;
  valueScore: number;
};

export type MarketActivity = {
  id: string;
  playerName: string;
  fromTeam: string;
  toTeam: string;
  price: number;
  timestamp: Date;
};

export type Formation = {
  id: string;
  userId: string;
  name: string;
  formation: string; // e.g., "3-5-2", "4-4-2"
  playerIds: string[];
  isActive: boolean;
  createdAt: Date;
};

export type MatchSimulation = {
  id: string;
  userId: string;
  opponentTeam: string;
  userScore: number;
  opponentScore: number;
  fantasyPoints: number;
  matchDate: Date;
};

export type LeagueStanding = {
  position: number;
  userId: string;
  username: string;
  totalPoints: number;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
};
