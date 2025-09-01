import { type User, type InsertUser, type Player, type InsertPlayer, type UserTeam, type InsertUserTeam, type Transaction, type InsertTransaction, type TeamStats, type PlayerRecommendation, type MarketActivity } from "@shared/schema";
import { randomUUID } from "crypto";

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

  private initializePlayers() {
    const serieAPlayers: InsertPlayer[] = [
      // Portieri
      { name: "Gianluigi Donnarumma", position: "P", team: "PSG", price: 30, rating: "6.9", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Samir Handanović", position: "P", team: "Inter", price: 18, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 8 },
      { name: "Wojciech Szczęsny", position: "P", team: "Juventus", price: 22, rating: "6.7", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Alex Meret", position: "P", team: "Napoli", price: 12, rating: "6.7", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Mike Maignan", position: "P", team: "Milan", price: 25, rating: "7.1", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 8 },

      // Difensori
      { name: "Alessandro Bastoni", position: "D", team: "Inter", price: 35, rating: "7.2", goals: 2, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Fikayo Tomori", position: "D", team: "Milan", price: 28, rating: "6.8", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Kalidou Koulibaly", position: "D", team: "Chelsea", price: 32, rating: "7.0", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 8 },
      { name: "Davide Calabria", position: "D", team: "Milan", price: 18, rating: "6.6", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Giorgio Scalvini", position: "D", team: "Atalanta", price: 15, rating: "6.8", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Alessandro Florenzi", position: "D", team: "Milan", price: 12, rating: "6.4", goals: 0, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 8 },
      { name: "Gleison Bremer", position: "D", team: "Juventus", price: 30, rating: "7.0", goals: 2, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Rafael Tolói", position: "D", team: "Atalanta", price: 16, rating: "6.7", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8 },

      // Centrocampisti
      { name: "Nicolò Barella", position: "C", team: "Inter", price: 45, rating: "7.5", goals: 3, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Sandro Tonali", position: "C", team: "Newcastle", price: 38, rating: "7.1", goals: 1, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Lorenzo Pellegrini", position: "C", team: "Roma", price: 40, rating: "7.3", goals: 2, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 8 },
      { name: "Khvicha Kvaratskhelia", position: "C", team: "Napoli", price: 25, rating: "7.8", goals: 4, assists: 5, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Matteo Zaccagni", position: "C", team: "Lazio", price: 22, rating: "6.9", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Hakan Çalhanoğlu", position: "C", team: "Inter", price: 35, rating: "7.2", goals: 2, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Sergej Milinković-Savić", position: "C", team: "Al-Hilal", price: 40, rating: "7.4", goals: 3, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Franck Kessié", position: "C", team: "Barcelona", price: 28, rating: "6.8", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 8 },

      // Attaccanti
      { name: "Victor Osimhen", position: "A", team: "Napoli", price: 60, rating: "8.2", goals: 12, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Lautaro Martínez", position: "A", team: "Inter", price: 55, rating: "7.9", goals: 10, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Dušan Vlahović", position: "A", team: "Juventus", price: 52, rating: "7.6", goals: 8, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Ciro Immobile", position: "A", team: "Lazio", price: 35, rating: "7.2", goals: 6, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Federico Chiesa", position: "A", team: "Juventus", price: 42, rating: "7.4", goals: 4, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
      { name: "Rafael Leão", position: "A", team: "Milan", price: 48, rating: "7.8", goals: 5, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 8 },
      { name: "Nicolò Zaniolo", position: "A", team: "Aston Villa", price: 35, rating: "7.1", goals: 3, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 8 },
      { name: "Tammy Abraham", position: "A", team: "Roma", price: 30, rating: "6.9", goals: 4, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 8 },
    ];

    serieAPlayers.forEach(player => {
      const id = randomUUID();
      this.players.set(id, { ...player, id });
    });
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
    for (const [id, userTeam] of this.userTeams.entries()) {
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
    
    const allPlayers = Array.from(this.players.values()).filter(p => 
      p.isActive && !ownedPlayerIds.has(p.id)
    );

    // Simple recommendation algorithm based on rating/price ratio
    const recommendations = allPlayers
      .map(player => ({
        player,
        valueScore: parseFloat(player.rating) / (player.price / 10),
        reason: this.generateRecommendationReason(player),
      }))
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 5);

    return recommendations;
  }

  private generateRecommendationReason(player: Player): string {
    const rating = parseFloat(player.rating);
    const efficiency = player.matchesPlayed > 0 ? (player.goals + player.assists) / player.matchesPlayed : 0;
    
    if (rating >= 7.5 && efficiency >= 0.8) {
      return `Eccellente rendimento: media voto ${rating}, ${player.goals} gol e ${player.assists} assist in ${player.matchesPlayed} partite.`;
    } else if (rating >= 7.0) {
      return `Buona media voto (${rating}) e titolare fisso. Ottimo rapporto qualità-prezzo.`;
    } else if (player.price <= 20) {
      return `Opzione economica con potenziale. Ideale per completare la rosa.`;
    } else {
      return `Giocatore affidabile con esperienza in Serie A.`;
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
}

export const storage = new MemStorage();
