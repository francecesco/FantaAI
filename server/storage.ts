import { type User, type InsertUser, type Player, type InsertPlayer, type UserTeam, type InsertUserTeam, type Transaction, type InsertTransaction, type TeamStats, type PlayerRecommendation, type MarketActivity } from "@shared/schema";
import { randomUUID } from "crypto";
import { footballApi } from "./football-api";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserCredits(userId: string, credits: number): Promise<void>;

  // Player operations
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(id: string): Promise<Player | undefined>;
  searchPlayers(query: string, position?: string, minPrice?: number, maxPrice?: number): Promise<Player[]>;
  getPlayersByPosition(position: string): Promise<Player[]>;

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

  // Player data refresh
  refreshPlayersFromAPI(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private players: Map<string, Player>;
  private userTeams: Map<string, UserTeam>;
  private transactions: Map<string, Transaction>;

  constructor() {
    this.users = new Map();
    this.players = new Map();
    this.userTeams = new Map();
    this.transactions = new Map();
    this.initializePlayers();
  }

  private async initializePlayers() {
    try {
      const playersData = await footballApi.refreshPlayerData();
      playersData.forEach(player => {
        const id = randomUUID();
        this.players.set(id, { 
          ...player, 
          id,
          goals: player.goals ?? 0,
          assists: player.assists ?? 0,
          yellowCards: player.yellowCards ?? 0,
          redCards: player.redCards ?? 0,
          matchesPlayed: player.matchesPlayed ?? 0,
          isActive: player.isActive ?? true
        });
      });
      console.log(`Initialized ${playersData.length} players from API`);
    } catch (error) {
      console.error('Failed to initialize players from API:', error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      totalCredits: 500,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserCredits(userId: string, credits: number): Promise<void> {
    const user = this.users.get(userId);
    if (user) {
      user.totalCredits = credits;
      this.users.set(userId, user);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return Array.from(this.players.values()).filter(p => p.isActive);
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async searchPlayers(query: string, position?: string, minPrice?: number, maxPrice?: number): Promise<Player[]> {
    const players = Array.from(this.players.values()).filter(p => p.isActive);
    
    return players.filter(player => {
      const matchesQuery = !query || 
        player.name.toLowerCase().includes(query.toLowerCase()) ||
        player.team.toLowerCase().includes(query.toLowerCase());
      
      const matchesPosition = !position || player.position === position;
      const matchesMinPrice = minPrice === undefined || player.price >= minPrice;
      const matchesMaxPrice = maxPrice === undefined || player.price <= maxPrice;
      
      return matchesQuery && matchesPosition && matchesMinPrice && matchesMaxPrice;
    });
  }

  async getPlayersByPosition(position: string): Promise<Player[]> {
    return Array.from(this.players.values()).filter(p => p.isActive && p.position === position);
  }

  async getUserTeam(userId: string): Promise<UserTeam[]> {
    return Array.from(this.userTeams.values()).filter(ut => ut.userId === userId);
  }

  async addPlayerToTeam(userTeam: InsertUserTeam): Promise<UserTeam> {
    const id = randomUUID();
    const team: UserTeam = {
      ...userTeam,
      id,
      purchasedAt: new Date(),
    };
    this.userTeams.set(id, team);
    return team;
  }

  async removePlayerFromTeam(userId: string, playerId: string): Promise<void> {
    const entries = Array.from(this.userTeams.entries());
    for (const [id, userTeam] of entries) {
      if (userTeam.userId === userId && userTeam.playerId === playerId) {
        this.userTeams.delete(id);
        break;
      }
    }
  }

  async getUserTeamStats(userId: string): Promise<TeamStats> {
    const userTeam = await this.getUserTeam(userId);
    const playerIds = userTeam.map(ut => ut.playerId);
    const players = playerIds.map(id => this.players.get(id)).filter(Boolean) as Player[];
    
    const spentCredits = userTeam.reduce((sum, ut) => sum + ut.purchasePrice, 0);
    const user = await this.getUser(userId);
    const remainingCredits = (user?.totalCredits || 500) - spentCredits;
    
    const totalRating = players.reduce((sum, p) => sum + parseFloat(p.rating), 0);
    const averageRating = players.length > 0 ? totalRating / players.length : 0;
    
    const totalGoals = players.reduce((sum, p) => sum + p.goals, 0);
    const totalAssists = players.reduce((sum, p) => sum + p.assists, 0);

    return {
      playerCount: players.length,
      spentCredits,
      remainingCredits,
      averageRating: Math.round(averageRating * 10) / 10,
      totalGoals,
      totalAssists,
    };
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const trans: Transaction = {
      ...transaction,
      id,
      createdAt: new Date(),
    };
    this.transactions.set(id, trans);
    return trans;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(t => t.userId === userId);
  }

  async getPlayerRecommendations(userId: string): Promise<PlayerRecommendation[]> {
    const userTeam = await this.getUserTeam(userId);
    const ownedPlayerIds = new Set(userTeam.map(ut => ut.playerId));
    const teamStats = await this.getUserTeamStats(userId);
    
    const allPlayers = Array.from(this.players.values()).filter(p => 
      p.isActive && !ownedPlayerIds.has(p.id)
    );

    // Enhanced recommendation algorithm
    const recommendations = allPlayers
      .map(player => {
        const valueScore = this.calculateAdvancedValueScore(player, userTeam, teamStats);
        return {
          player,
          valueScore,
          reason: this.generateAdvancedRecommendationReason(player, userTeam),
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
      const p = this.players.get(ut.playerId);
      if (p) {
        acc[p.position] = (acc[p.position] || 0) + 1;
      }
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
    
    // Position analysis
    const positionCounts = userTeam.reduce((acc, ut) => {
      const p = this.players.get(ut.playerId);
      if (p) {
        acc[p.position] = (acc[p.position] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    const positionNames = { P: "portieri", D: "difensori", C: "centrocampisti", A: "attaccanti" };
    const currentCount = positionCounts[player.position] || 0;
    const minNeeded = { P: 3, D: 8, C: 8, A: 6 }[player.position] || 0;
    
    if (currentCount < minNeeded) {
      return `Ruolo scoperto! Ti servono più ${positionNames[player.position as keyof typeof positionNames]}. Rating ${rating}, ${player.goals + player.assists} gol+assist.`;
    }
    
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
        price: 48000000,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: randomUUID(),
        playerName: "Nicolò Zaniolo",
        fromTeam: "Roma",
        toTeam: "Aston Villa",
        price: 35000000,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        id: randomUUID(),
        playerName: "Sergej Milinković-Savić",
        fromTeam: "Lazio",
        toTeam: "Al-Hilal",
        price: 40000000,
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
      },
    ];
  }

  async refreshPlayersFromAPI(): Promise<void> {
    try {
      const playersData = await footballApi.refreshPlayerData();
      
      // Clear existing players and add fresh data
      this.players.clear();
      playersData.forEach(player => {
        const id = randomUUID();
        this.players.set(id, { 
          ...player, 
          id,
          goals: player.goals ?? 0,
          assists: player.assists ?? 0,
          yellowCards: player.yellowCards ?? 0,
          redCards: player.redCards ?? 0,
          matchesPlayed: player.matchesPlayed ?? 0,
          isActive: player.isActive ?? true
        });
      });
      console.log(`Refreshed ${playersData.length} players from API`);
    } catch (error) {
      console.error('Failed to refresh players from API:', error);
    }
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

export const storage = new MemStorage();
