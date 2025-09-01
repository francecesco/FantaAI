import {
  users,
  players,
  userTeams,
  transactions,
  type User,
  type UpsertUser,
  type Player,
  type InsertPlayer,
  type UserTeam,
  type InsertUserTeam,
  type Transaction,
  type InsertTransaction,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql, desc, asc } from "drizzle-orm";
import { footballApi } from "./football-api";
import type { 
  TeamStats, 
  PlayerRecommendation, 
  MarketActivity,
  Formation,
  MatchSimulation,
  LeagueStanding 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations - OAuth compatible
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: Omit<User, 'id' | 'totalCredits' | 'createdAt' | 'updatedAt'>): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserCredits(userId: string, credits: number): Promise<void>;

  // Player operations
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(id: string): Promise<Player | undefined>;
  searchPlayers(query: string, position?: string, minPrice?: number, maxPrice?: number): Promise<Player[]>;
  getPlayersByPosition(position: string): Promise<Player[]>;
  refreshPlayersFromAPI(): Promise<void>;

  // Team operations
  getUserTeam(userId: string): Promise<UserTeam[]>;
  addPlayerToTeam(userTeam: InsertUserTeam): Promise<UserTeam>;
  removePlayerFromTeam(userId: string, playerId: string): Promise<void>;
  getUserTeamStats(userId: string): Promise<TeamStats>;

  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getUserTransactions(userId: string): Promise<Transaction[]>;

  // Recommendations and market
  getPlayerRecommendations(userId: string): Promise<PlayerRecommendation[]>;
  getMarketActivity(): Promise<MarketActivity[]>;

  // Advanced features
  getFormations(userId: string): Promise<Formation[]>;
  saveFormation(userId: string, formation: Omit<Formation, 'id' | 'userId' | 'createdAt'>): Promise<Formation>;
  getLeagueStandings(): Promise<LeagueStanding[]>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializePlayers();
  }

  private async initializePlayers() {
    try {
      // Check if players already exist
      const existingPlayers = await db.select().from(players).limit(1);
      if (existingPlayers.length > 0) {
        console.log("Players already exist in database");
        return;
      }

      // Initialize with API data
      const playersData = await footballApi.refreshPlayerData();
      
      for (const playerData of playersData) {
        await db.insert(players).values({
          id: randomUUID(),
          name: playerData.name,
          position: playerData.position,
          team: playerData.team,
          price: playerData.price,
          rating: playerData.rating.toString(),
          goals: playerData.goals || 0,
          assists: playerData.assists || 0,
          yellowCards: playerData.yellowCards || 0,
          redCards: playerData.redCards || 0,
          matchesPlayed: playerData.matchesPlayed || 0,
          isActive: true,
        });
      }
      
      console.log(`Initialized ${playersData.length} players in database`);
    } catch (error) {
      console.error('Error initializing players:', error);
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: Omit<User, 'id' | 'totalCredits' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        id: randomUUID(),
      })
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        username: userData.username || userData.email?.split("@")[0] || `user_${userData.id}`,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserCredits(userId: string, credits: number): Promise<void> {
    await db.update(users)
      .set({ totalCredits: credits })
      .where(eq(users.id, userId));
  }

  // Player operations
  async getAllPlayers(): Promise<Player[]> {
    return await db.select().from(players).where(eq(players.isActive, true));
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    const [player] = await db.select().from(players).where(eq(players.id, id));
    return player;
  }

  async searchPlayers(query: string, position?: string, minPrice?: number, maxPrice?: number): Promise<Player[]> {
    let conditions = [eq(players.isActive, true)];
    
    if (query) {
      conditions.push(sql`${players.name} ILIKE ${`%${query}%`} OR ${players.team} ILIKE ${`%${query}%`}`);
    }
    
    if (position) {
      conditions.push(eq(players.position, position));
    }
    
    if (minPrice !== undefined) {
      conditions.push(sql`${players.price} >= ${minPrice}`);
    }
    
    if (maxPrice !== undefined) {
      conditions.push(sql`${players.price} <= ${maxPrice}`);
    }

    return await db.select().from(players).where(and(...conditions));
  }

  async getPlayersByPosition(position: string): Promise<Player[]> {
    return await db.select().from(players)
      .where(and(eq(players.position, position), eq(players.isActive, true)));
  }

  async refreshPlayersFromAPI(): Promise<void> {
    try {
      await footballApi.refreshPlayerData();
      console.log("Player data refreshed from API Football");
    } catch (error) {
      console.error("Failed to refresh player data:", error);
      throw error;
    }
  }

  // Team operations
  async getUserTeam(userId: string): Promise<UserTeam[]> {
    return await db.select().from(userTeams).where(eq(userTeams.userId, userId));
  }

  async addPlayerToTeam(userTeam: InsertUserTeam): Promise<UserTeam> {
    const [team] = await db.insert(userTeams).values(userTeam).returning();
    return team;
  }

  async removePlayerFromTeam(userId: string, playerId: string): Promise<void> {
    await db.delete(userTeams)
      .where(and(eq(userTeams.userId, userId), eq(userTeams.playerId, playerId)));
  }

  async getUserTeamStats(userId: string): Promise<TeamStats> {
    const team = await this.getUserTeam(userId);
    const user = await this.getUser(userId);
    
    let totalGoals = 0;
    let totalAssists = 0;
    let totalRating = 0;
    let spentCredits = 0;
    
    for (const ut of team) {
      const player = await this.getPlayerById(ut.playerId);
      if (player) {
        totalGoals += player.goals;
        totalAssists += player.assists;
        totalRating += parseFloat(player.rating);
        spentCredits += ut.purchasePrice;
      }
    }

    return {
      playerCount: team.length,
      totalGoals,
      totalAssists,
      averageRating: team.length > 0 ? totalRating / team.length : 0,
      spentCredits,
      remainingCredits: (user?.totalCredits || 500) - spentCredits,
    };
  }

  // Transaction operations
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [tx] = await db.insert(transactions).values(transaction).returning();
    return tx;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return await db.select().from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt));
  }

  // Recommendations
  async getPlayerRecommendations(userId: string): Promise<PlayerRecommendation[]> {
    const userTeamData = await this.getUserTeam(userId);
    const ownedPlayerIds = new Set(userTeamData.map(ut => ut.playerId));
    const teamStats = await this.getUserTeamStats(userId);
    
    const allPlayers = await db.select().from(players)
      .where(eq(players.isActive, true));
    
    const availablePlayers = allPlayers.filter(p => !ownedPlayerIds.has(p.id));

    // Enhanced recommendation algorithm
    const recommendations = availablePlayers
      .map(player => {
        const valueScore = this.calculateAdvancedValueScore(player, userTeamData, teamStats);
        return {
          player,
          valueScore,
          reason: this.generateAdvancedRecommendationReason(player, userTeamData),
        };
      })
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8);

    return recommendations;
  }

  private calculateAdvancedValueScore(player: Player, userTeam: UserTeam[], teamStats: TeamStats): number {
    const rating = parseFloat(player.rating);
    const efficiency = player.matchesPlayed > 0 ? (player.goals + player.assists) / player.matchesPlayed : 0;
    const priceEfficiency = rating / (player.price / 10);
    
    // Position need analysis
    const positionCounts = userTeam.reduce((acc, ut) => {
      // Note: We'd need to join with players table to get position, simplified for now
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const positionNeed = this.getPositionNeedMultiplier(player.position, positionCounts);
    
    // Form factor (recent performance)
    const formFactor = player.matchesPlayed >= 5 ? 1 + (efficiency * 0.3) : 0.8;
    
    return priceEfficiency * positionNeed * formFactor;
  }

  private getPositionNeedMultiplier(position: string, positionCounts: Record<string, number>): number {
    const counts = {
      P: positionCounts.P || 0,
      D: positionCounts.D || 0,
      C: positionCounts.C || 0,
      A: positionCounts.A || 0,
    };
    
    const needs = {
      P: counts.P < 3 ? 1.5 : 0.8,
      D: counts.D < 8 ? 1.3 : 0.9,
      C: counts.C < 8 ? 1.3 : 0.9,
      A: counts.A < 6 ? 1.2 : 0.9,
    };
    
    return needs[position as keyof typeof needs] || 1.0;
  }

  private generateAdvancedRecommendationReason(player: Player, userTeam: UserTeam[]): string {
    const rating = parseFloat(player.rating);
    const efficiency = player.matchesPlayed > 0 ? (player.goals + player.assists) / player.matchesPlayed : 0;
    
    const positionNames = { P: "portieri", D: "difensori", C: "centrocampisti", A: "attaccanti" };
    const currentCount = userTeam.filter(ut => {
      // Simplified - in real implementation would join tables
      return true; // player.position check
    }).length;
    const minNeeded = { P: 3, D: 8, C: 8, A: 6 }[player.position] || 0;
    
    if (rating >= 7.5 && efficiency >= 0.8) {
      return `⭐ Top player: rating ${rating}, ${efficiency.toFixed(1)} gol+assist/partita. Investimento di qualità.`;
    } else if (rating >= 7.0 && player.price <= 30) {
      return `💎 Affare: rating ${rating} a solo €${player.price}. Ottimo rapporto qualità-prezzo.`;
    } else if (player.price <= 15) {
      return `🔥 Budget: opzione economica per completare la rosa. Rating ${rating}, prezzo accessibile.`;
    } else if (efficiency >= 0.6) {
      return `⚽ Produttivo: ${player.goals} gol e ${player.assists} assist in ${player.matchesPlayed} partite.`;
    } else {
      return `Giocatore affidabile con esperienza in Serie A. Rating ${rating}.`;
    }
  }

  async getMarketActivity(): Promise<MarketActivity[]> {
    // Mock recent market activity
    return [
      {
        id: randomUUID(),
        playerName: "Rafael Leão",
        fromTeam: "Milan",
        toTeam: "Chelsea", 
        price: 48,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: randomUUID(),
        playerName: "Nicolò Zaniolo",
        fromTeam: "Roma",
        toTeam: "Aston Villa",
        price: 35,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        id: randomUUID(),
        playerName: "Sergej Milinković-Savić",
        fromTeam: "Lazio",
        toTeam: "Al-Hilal",
        price: 40,
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
      },
    ];
  }

  async getFormations(userId: string): Promise<Formation[]> {
    // Mock formations for demo
    return [
      {
        id: "formation-1",
        userId,
        name: "Formazione Principale",
        formation: "3-5-2",
        playerIds: [],
        isActive: true,
        createdAt: new Date(),
      },
    ];
  }

  async saveFormation(userId: string, formationData: Omit<Formation, 'id' | 'userId' | 'createdAt'>): Promise<Formation> {
    const formation: Formation = {
      id: Date.now().toString(),
      userId,
      ...formationData,
      createdAt: new Date(),
    };
    
    console.log("Formation saved:", formation);
    return formation;
  }

  async getLeagueStandings(): Promise<LeagueStanding[]> {
    // Mock league standings
    return [
      {
        position: 1,
        userId: "user1",
        username: "FantaExpert",
        totalPoints: 125,
        matchesPlayed: 5,
        wins: 4,
        draws: 1,
        losses: 0,
      },
      {
        position: 2,
        userId: "user2", 
        username: "SerieAFan",
        totalPoints: 118,
        matchesPlayed: 5,
        wins: 3,
        draws: 2,
        losses: 0,
      },
      {
        position: 3,
        userId: "user3",
        username: "CalcioMaster", 
        totalPoints: 112,
        matchesPlayed: 5,
        wins: 3,
        draws: 1,
        losses: 1,
      },
    ];
  }
}

export const storage = new DatabaseStorage();