import {
  users,
  players,
  userTeams,
  transactions,
  matches,
  type User,
  type UpsertUser,
  type Player,
  type InsertPlayer,
  type UserTeam,
  type InsertUserTeam,
  type Transaction,
  type InsertTransaction,
  type Match,
  type InsertMatch,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql, desc, asc } from "drizzle-orm";
import { footballDataService } from "./football-api";
import { aiService } from "./ai-service";
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

  // Calendar operations
  getSerieACalendar(): Promise<Match[]>;
  getMatchFormations(matchId: string): Promise<any>;
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
        console.log(`✅ Database già popolato con giocatori esistenti (${existingPlayers.length} trovati)`);
        return;
      }

      console.log("📊 Database vuoto, inizializzazione giocatori...");
      
      // Initialize with API data
      const playersData = await footballDataService.getSerieAPlayers();
      
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
      
      console.log(`✅ Inizializzati ${playersData.length} giocatori nel database`);
    } catch (error) {
      console.error('❌ Errore durante inizializzazione giocatori:', error);
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
      console.log("Aggiornamento dati giocatori da Fantacalcio.it...");
      
      // Get fresh data from Fantacalcio.it
      const playersData = await footballDataService.getSerieAPlayers();
      
      // Clear existing players
      await db.delete(players);
      console.log("Cleared existing player data");
      
      // Insert fresh data
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
      
      console.log(`Aggiornati ${playersData.length} giocatori Serie A da Fantacalcio.it`);
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

    // Usa AI Gemini se disponibile, altrimenti algoritmo tradizionale
    if (aiService.isAvailable()) {
      console.log('🤖 Usando Gemini AI per le raccomandazioni...');
      return this.getAIRecommendations(availablePlayers, userTeamData, teamStats);
    } else {
      console.log('📊 Usando algoritmo tradizionale per le raccomandazioni...');
      return this.getTraditionalRecommendations(availablePlayers, userTeamData, teamStats);
    }
  }

  private async getAIRecommendations(availablePlayers: Player[], userTeamData: UserTeam[], teamStats: TeamStats): Promise<PlayerRecommendation[]> {
    const recommendations: PlayerRecommendation[] = [];
    
    // Analizza solo i primi 3 giocatori più promettenti per rispettare i limiti di quota
    const topCandidates = availablePlayers
      .map(player => ({
        player,
        valueScore: this.calculateBeginnerValueScore(player, userTeamData, teamStats)
      }))
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 3);

    // Processa uno alla volta con delay per evitare rate limiting
    for (const { player } of topCandidates) {
      try {
        const aiAnalysis = await aiService.analyzePlayer(player, userTeamData, teamStats);
        recommendations.push({
          player,
          valueScore: aiAnalysis.valueScore,
          reason: `${aiAnalysis.recommendation} - ${aiAnalysis.reasoning}`,
        });
        
        // Delay di 5 secondi tra le richieste per rispettare i limiti
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`Errore AI per ${player.name}:`, error);
        // Fallback all'algoritmo tradizionale
        recommendations.push({
          player,
          valueScore: this.calculateBeginnerValueScore(player, userTeamData, teamStats),
          reason: this.generateBeginnerRecommendationReason(player, userTeamData, teamStats),
        });
      }
    }

    // Completa con algoritmi tradizionali per arrivare a 8 raccomandazioni
    const remainingPlayers = availablePlayers
      .filter(p => !recommendations.some(r => r.player.id === p.id))
      .map(player => ({
        player,
        valueScore: this.calculateBeginnerValueScore(player, userTeamData, teamStats),
        reason: this.generateBeginnerRecommendationReason(player, userTeamData, teamStats),
      }))
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8 - recommendations.length);

    recommendations.push(...remainingPlayers);

    return recommendations
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8);
  }

  private getTraditionalRecommendations(availablePlayers: Player[], userTeamData: UserTeam[], teamStats: TeamStats): PlayerRecommendation[] {
    return availablePlayers
      .map(player => {
        const valueScore = this.calculateBeginnerValueScore(player, userTeamData, teamStats);
        return {
          player,
          valueScore,
          reason: this.generateBeginnerRecommendationReason(player, userTeamData, teamStats),
        };
      })
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8);
  }

  private calculateBeginnerValueScore(player: Player, userTeam: UserTeam[], teamStats: TeamStats): number {
    const rating = parseFloat(player.rating);
    const efficiency = player.matchesPlayed > 0 ? (player.goals + player.assists) / player.matchesPlayed : 0;
    
    // Per principianti: priorità a giocatori semplici e affidabili
    let score = rating * 10; // Voto base è la priorità principale
    
    // Bonus per giocatori produttivi (gol + assist)
    score += (player.goals + player.assists) * 5;
    
    // Bonus per giocatori che giocano sempre (affidabilità)
    if (player.matchesPlayed >= 15) score += 20;
    
    // Penalità per prezzi troppo alti (principianti hanno budget limitato)
    if (player.price > 40) score -= 30;
    else if (player.price > 25) score -= 10;
    
    // Bonus per rapporto qualità-prezzo
    if (rating >= 7.0 && player.price <= 20) score += 25;
    if (rating >= 6.5 && player.price <= 10) score += 15;
    
    // Analisi posizione necessaria per la squadra
    const positionNeed = this.getBeginnerPositionNeed(player.position, userTeam);
    score *= positionNeed;
    
    return Math.max(score, 0);
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

  private getBeginnerPositionNeed(position: string, userTeam: UserTeam[]): number {
    // Per principianti: conta solo i giocatori attuali per posizione
    const currentCounts = {
      P: 0, D: 0, C: 0, A: 0
    };
    
    // Nota: In implementazione completa, si dovrebbe fare join con la tabella players
    // Per ora usiamo una logica semplificata
    
    const targetCounts = { P: 3, D: 8, C: 8, A: 6 };
    const currentCount = currentCounts[position as keyof typeof currentCounts] || 0;
    const targetCount = targetCounts[position as keyof typeof targetCounts] || 0;
    
    // Priorità massima per posizioni completamente vuote
    if (currentCount === 0) return 2.0;
    
    // Alta priorità per posizioni sotto il minimo
    if (currentCount < Math.ceil(targetCount * 0.4)) return 1.8;
    
    // Media priorità per posizioni incomplete
    if (currentCount < targetCount) return 1.3;
    
    // Bassa priorità per posizioni complete
    return 0.7;
  }

  private generateBeginnerRecommendationReason(player: Player, userTeam: UserTeam[], teamStats: TeamStats): string {
    const rating = parseFloat(player.rating);
    const efficiency = player.matchesPlayed > 0 ? (player.goals + player.assists) / player.matchesPlayed : 0;
    
    const positionNames = { 
      P: "Portiere", 
      D: "Difensore", 
      C: "Centrocampista", 
      A: "Attaccante" 
    };
    
    const positionTips = {
      P: "🥅 I portieri guadagnano punti con parate e rigori parati. Cerca chi gioca sempre!",
      D: "🛡️ I difensori prendono bonus con porta inviolata e gol. Scegli titolari delle big!", 
      C: "⚡ I centrocampisti sono jolly: assist, gol e gioco. I più affidabili per punti!",
      A: "🚀 Gli attaccanti vivono di gol. Meglio 1 bomber da 40FM che 2 da 20FM!"
    };
    
    // Consigli specifici per principianti
    if (userTeam.length === 0) {
      return `🎯 PRIMO ACQUISTO: Inizia con ${player.name} (${positionNames[player.position as keyof typeof positionNames]})! Voto ${rating}, costa ${player.price}FM. ${positionTips[player.position as keyof typeof positionTips]}`;
    }
    
    if (rating >= 7.5 && player.price <= 35) {
      return `🌟 CAMPIONE ACCESSIBILE: ${player.name} è top player ma costa "solo" ${player.price}FM! Voto ${rating} garantito. ${positionTips[player.position as keyof typeof positionTips]}`;
    } 
    
    if (rating >= 7.0 && player.price <= 20) {
      return `💎 AFFARE INCREDIBILE: ${player.name} vale molto di più! Voto ${rating} a ${player.price}FM. Ha fatto ${player.goals} gol e ${player.assists} assist. COMPRALO SUBITO!`;
    } 
    
    if (player.price <= 8 && rating >= 6.0) {
      return `🎯 PERFETTO PER BUDGET: ${player.name} costa pochissimo (${player.price}FM) ma è affidabile (voto ${rating}). Ideale per completare la rosa senza rischi!`;
    } 
    
    if (player.goals >= 12) {
      return `⚽ BOMBER VERO: ${player.name} ha già ${player.goals} gol! ${positionNames[player.position as keyof typeof positionNames]} che segna sempre. I gol valgono +3 punti ciascuno!`;
    } 
    
    if (player.assists >= 10) {
      return `🎯 RE DEGLI ASSIST: ${player.name} ha servito ${player.assists} assist! Gli assist valgono +1 punto. ${positionNames[player.position as keyof typeof positionNames]} che fa giocare bene la squadra.`;
    } 
    
    if (player.matchesPlayed >= 20 && rating >= 6.5) {
      return `🛡️ CERTEZZA ASSOLUTA: ${player.name} ha giocato ${player.matchesPlayed} partite (su 25 max)! Voto ${rating} stabile. Mai infortunato, sempre titolare.`;
    } 
    
    if (teamStats.remainingCredits < 50 && player.price <= 10) {
      return `💸 PERFETTO PER FINIRE: Ti restano pochi crediti? ${player.name} costa solo ${player.price}FM ma ha voto ${rating}. Completa la rosa senza spendere troppo!`;
    }
    
    return `📈 BUONA SCELTA: ${player.name} è un ${positionNames[player.position as keyof typeof positionNames]} solido. Voto ${rating}, ${player.goals} gol stagionali. A ${player.price}FM può essere un buon investimento per il futuro!`;
  }

  private generateAdvancedRecommendationReason(player: Player, userTeam: UserTeam[]): string {
    const rating = parseFloat(player.rating);
    const efficiency = player.matchesPlayed > 0 ? (player.goals + player.assists) / player.matchesPlayed : 0;
    
    const positionNames = { 
      P: "Portiere", 
      D: "Difensore", 
      C: "Centrocampista", 
      A: "Attaccante" 
    };
    
    const positionExplanations = {
      P: "I portieri sono fondamentali: parano i rigori e prendono voti alti con le parate",
      D: "I difensori segnano punti con gol e mantenendo la porta inviolata", 
      C: "I centrocampisti sono versatili: assist, gol e tanto gioco",
      A: "Gli attaccanti sono i bomber: segnano i gol che vincono le partite"
    };
    
    // Consigli per principianti con spiegazioni chiare
    if (rating >= 7.5 && player.price <= 40) {
      return `🌟 CAMPIONE: ${player.name} è uno dei migliori ${positionNames[player.position as keyof typeof positionNames]}! Ha un voto medio di ${rating} e costa solo ${player.price}FM. ${positionExplanations[player.position as keyof typeof positionExplanations]}. CONSIGLIO: Compralo subito!`;
    } else if (rating >= 7.0 && player.price <= 25) {
      return `💰 AFFARE: ${player.name} è un ottimo ${positionNames[player.position as keyof typeof positionNames]} con voto ${rating} a prezzo conveniente (${player.price}FM). Ha fatto ${player.goals} gol e ${player.assists} assist. Perfetto per iniziare!`;
    } else if (player.price <= 10 && rating >= 6.0) {
      return `🎯 BUDGET: ${player.name} costa poco (${player.price}FM) ma è affidabile (voto ${rating}). Ideale per completare la rosa senza spendere troppo. ${positionExplanations[player.position as keyof typeof positionExplanations]}.`;
    } else if (player.goals >= 10 || player.assists >= 8) {
      return `⚽ BOMBER: ${player.name} ha segnato ${player.goals} gol e fatto ${player.assists} assist! ${positionNames[player.position as keyof typeof positionNames]} molto produttivo. Costa ${player.price}FM ma i punti sono garantiti.`;
    } else if (player.matchesPlayed >= 15 && rating >= 6.5) {
      return `🛡️ SICURO: ${player.name} gioca sempre (${player.matchesPlayed} partite) e ha voto ${rating}. ${positionNames[player.position as keyof typeof positionNames]} affidabile che non ti deluderà. Prezzo: ${player.price}FM.`;
    } else {
      return `📈 POTENZIALE: ${player.name} è un ${positionNames[player.position as keyof typeof positionNames]} con buone prospettive. Voto ${rating}, ${player.goals} gol stagionali. Costa ${player.price}FM - potrebbe essere una scommessa vincente!`;
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

  async getSerieACalendar(): Promise<Match[]> {
    try {
      // Check if matches already exist in database
      const existingMatches = await db.select().from(matches).limit(1);
      if (existingMatches.length === 0) {
        // Initialize matches from API data
        const calendarData = await footballDataService.getSerieACalendar();
        if (calendarData.length > 0) {
          await db.insert(matches).values(calendarData);
        }
      }

      // Return all matches ordered by round and date
      return await db.select().from(matches).orderBy(asc(matches.round), asc(matches.date));
    } catch (error) {
      console.error("Error fetching calendar:", error);
      return [];
    }
  }

  async getMatchFormations(matchId: string): Promise<any> {
    // Simula formazioni per le partite
    // In una implementazione reale, questi dati verrebbero da un'API esterna
    const formations = {
      home: {
        formation: "4-3-3",
        players: [
          { position: "GK", name: "Portiere", number: 1 },
          { position: "DEF", name: "Terzino Dx", number: 2 },
          { position: "DEF", name: "Difensore Cx", number: 3 },
          { position: "DEF", name: "Difensore Cx", number: 4 },
          { position: "DEF", name: "Terzino Sx", number: 5 },
          { position: "MID", name: "Centrocampista", number: 6 },
          { position: "MID", name: "Centrocampista", number: 7 },
          { position: "MID", name: "Centrocampista", number: 8 },
          { position: "ATT", name: "Ala Dx", number: 9 },
          { position: "ATT", name: "Attaccante", number: 10 },
          { position: "ATT", name: "Ala Sx", number: 11 },
        ]
      },
      away: {
        formation: "3-5-2",
        players: [
          { position: "GK", name: "Portiere", number: 1 },
          { position: "DEF", name: "Difensore", number: 2 },
          { position: "DEF", name: "Difensore", number: 3 },
          { position: "DEF", name: "Difensore", number: 4 },
          { position: "MID", name: "Centrocampista", number: 5 },
          { position: "MID", name: "Centrocampista", number: 6 },
          { position: "MID", name: "Centrocampista", number: 7 },
          { position: "MID", name: "Centrocampista", number: 8 },
          { position: "MID", name: "Centrocampista", number: 9 },
          { position: "ATT", name: "Attaccante", number: 10 },
          { position: "ATT", name: "Attaccante", number: 11 },
        ]
      }
    };

    return formations;
  }

  async getAITeamAnalysis(userTeam: UserTeam[], teamStats: TeamStats, availablePlayers: Player[]): Promise<any> {
    if (aiService.isAvailable()) {
      try {
        return await aiService.analyzeTeam(userTeam, teamStats, availablePlayers);
      } catch (error) {
        console.error('Errore nell\'analisi AI della squadra:', error);
        return aiService.getFallbackTeamAnalysis(userTeam, teamStats);
      }
    } else {
      return aiService.getFallbackTeamAnalysis(userTeam, teamStats);
    }
  }
}

// MemStorage implementation for when database is offline
export class MemStorage implements IStorage {
  private users: User[] = [];
  private playersData: Player[] = [];
  private userTeamsData: UserTeam[] = [];
  private transactionsData: Transaction[] = [];
  private calendarData: Match[] = [];
  private initialized = false;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    if (this.initialized) return;
    
    try {
      // Initialize players from API
      const apiPlayers = await footballDataService.getSerieAPlayers();
      this.playersData = apiPlayers.map(p => ({
        id: randomUUID(),
        name: p.name,
        position: p.position,
        team: p.team,
        price: p.price,
        rating: p.rating.toString(),
        goals: p.goals || 0,
        assists: p.assists || 0,
        yellowCards: p.yellowCards || 0,
        redCards: p.redCards || 0,
        matchesPlayed: p.matchesPlayed || 0,
        isActive: true,
      }));

      // Initialize calendar data
      const apiCalendar = await footballDataService.getSerieACalendar();
      this.calendarData = apiCalendar.map(m => ({
        id: randomUUID(),
        ...m,
      }));

      this.initialized = true;
      console.log(`Initialized ${this.playersData.length} players and ${this.calendarData.length} matches in memory`);
    } catch (error) {
      console.error('Error initializing memory storage:', error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async createUser(userData: Omit<User, 'id' | 'totalCredits' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      ...userData,
      id: randomUUID(),
      totalCredits: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingIndex = this.users.findIndex(u => u.id === userData.id);
    const user: User = {
      ...userData,
      username: userData.username || userData.email?.split("@")[0] || `user_${userData.id}`,
      totalCredits: userData.totalCredits || 500,
      createdAt: userData.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (existingIndex >= 0) {
      this.users[existingIndex] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }

  async updateUserCredits(userId: string, credits: number): Promise<void> {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.totalCredits = credits;
      user.updatedAt = new Date();
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    await this.initializeData();
    return this.playersData.filter(p => p.isActive);
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    await this.initializeData();
    return this.playersData.find(p => p.id === id);
  }

  async searchPlayers(query: string, position?: string, minPrice?: number, maxPrice?: number): Promise<Player[]> {
    await this.initializeData();
    let results = this.playersData.filter(p => p.isActive);
    
    if (query) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.team.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (position) {
      results = results.filter(p => p.position === position);
    }
    
    if (minPrice !== undefined) {
      results = results.filter(p => p.price >= minPrice);
    }
    
    if (maxPrice !== undefined) {
      results = results.filter(p => p.price <= maxPrice);
    }

    return results;
  }

  async getPlayersByPosition(position: string): Promise<Player[]> {
    await this.initializeData();
    return this.playersData.filter(p => p.position === position && p.isActive);
  }

  async refreshPlayersFromAPI(): Promise<void> {
    try {
      const playersData = await footballDataService.getSerieAPlayers();
      this.playersData = playersData.map(p => ({
        id: randomUUID(),
        name: p.name,
        position: p.position,
        team: p.team,
        price: p.price,
        rating: p.rating.toString(),
        goals: p.goals || 0,
        assists: p.assists || 0,
        yellowCards: p.yellowCards || 0,
        redCards: p.redCards || 0,
        matchesPlayed: p.matchesPlayed || 0,
        isActive: true,
      }));
      console.log(`Refreshed ${this.playersData.length} players from API`);
    } catch (error) {
      console.error("Failed to refresh player data:", error);
      throw error;
    }
  }

  async getUserTeam(userId: string): Promise<UserTeam[]> {
    return this.userTeamsData.filter(ut => ut.userId === userId);
  }

  async addPlayerToTeam(userTeam: InsertUserTeam): Promise<UserTeam> {
    const team: UserTeam = {
      ...userTeam,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.userTeamsData.push(team);
    return team;
  }

  async removePlayerFromTeam(userId: string, playerId: string): Promise<void> {
    this.userTeamsData = this.userTeamsData.filter(
      ut => !(ut.userId === userId && ut.playerId === playerId)
    );
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

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const tx: Transaction = {
      ...transaction,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.transactionsData.push(tx);
    return tx;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return this.transactionsData
      .filter(t => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPlayerRecommendations(userId: string): Promise<PlayerRecommendation[]> {
    await this.initializeData();
    const userTeamData = await this.getUserTeam(userId);
    const ownedPlayerIds = new Set(userTeamData.map(ut => ut.playerId));
    const teamStats = await this.getUserTeamStats(userId);
    
    const availablePlayers = this.playersData.filter(p => !ownedPlayerIds.has(p.id) && p.isActive);

    // Usa AI Gemini se disponibile, altrimenti algoritmo tradizionale
    if (aiService.isAvailable()) {
      console.log('🤖 Usando Gemini AI per le raccomandazioni (MemStorage)...');
      return this.getAIRecommendations(availablePlayers, userTeamData, teamStats);
    } else {
      console.log('📊 Usando algoritmo tradizionale per le raccomandazioni (MemStorage)...');
      return this.getTraditionalRecommendations(availablePlayers, userTeamData, teamStats);
    }
  }

  private async getAIRecommendations(availablePlayers: Player[], userTeamData: UserTeam[], teamStats: TeamStats): Promise<PlayerRecommendation[]> {
    const recommendations: PlayerRecommendation[] = [];
    
    // Analizza solo i primi 3 giocatori più promettenti per rispettare i limiti di quota
    const topCandidates = availablePlayers
      .map(player => ({
        player,
        valueScore: this.calculateBeginnerValueScore(player, userTeamData, teamStats)
      }))
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 3);

    // Processa uno alla volta con delay per evitare rate limiting
    for (const { player } of topCandidates) {
      try {
        const aiAnalysis = await aiService.analyzePlayer(player, userTeamData, teamStats);
        recommendations.push({
          player,
          valueScore: aiAnalysis.valueScore,
          reason: `${aiAnalysis.recommendation} - ${aiAnalysis.reasoning}`,
        });
        
        // Delay di 5 secondi tra le richieste per rispettare i limiti
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`Errore AI per ${player.name}:`, error);
        // Fallback all'algoritmo tradizionale
        recommendations.push({
          player,
          valueScore: this.calculateBeginnerValueScore(player, userTeamData, teamStats),
          reason: this.generateBeginnerRecommendationReason(player, userTeamData, teamStats),
        });
      }
    }

    // Completa con algoritmi tradizionali per arrivare a 8 raccomandazioni
    const remainingPlayers = availablePlayers
      .filter(p => !recommendations.some(r => r.player.id === p.id))
      .map(player => ({
        player,
        valueScore: this.calculateBeginnerValueScore(player, userTeamData, teamStats),
        reason: this.generateBeginnerRecommendationReason(player, userTeamData, teamStats),
      }))
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8 - recommendations.length);

    recommendations.push(...remainingPlayers);

    return recommendations
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8);
  }

  private getTraditionalRecommendations(availablePlayers: Player[], userTeamData: UserTeam[], teamStats: TeamStats): PlayerRecommendation[] {
    return availablePlayers
      .map(player => {
        const valueScore = this.calculateBeginnerValueScore(player, userTeamData, teamStats);
        return {
          player,
          valueScore,
          reason: this.generateBeginnerRecommendationReason(player, userTeamData, teamStats),
        };
      })
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8);
  }

  private calculateBeginnerValueScore(player: Player, userTeam: UserTeam[], teamStats: TeamStats): number {
    const rating = parseFloat(player.rating);
    
    let score = rating * 10;
    score += (player.goals + player.assists) * 5;
    
    if (player.matchesPlayed >= 15) score += 20;
    if (player.price > 40) score -= 30;
    else if (player.price > 25) score -= 10;
    if (rating >= 7.0 && player.price <= 20) score += 25;
    if (rating >= 6.5 && player.price <= 10) score += 15;
    
    const positionNeed = this.getBeginnerPositionNeed(player.position, userTeam);
    score *= positionNeed;
    
    return Math.max(score, 0);
  }

  private getBeginnerPositionNeed(position: string, userTeam: UserTeam[]): number {
    const currentCounts = { P: 0, D: 0, C: 0, A: 0 };
    const targetCounts = { P: 3, D: 8, C: 8, A: 6 };
    const currentCount = currentCounts[position as keyof typeof currentCounts] || 0;
    const targetCount = targetCounts[position as keyof typeof targetCounts] || 0;
    
    if (currentCount === 0) return 2.0;
    if (currentCount < Math.ceil(targetCount * 0.4)) return 1.8;
    if (currentCount < targetCount) return 1.3;
    return 0.7;
  }

  private generateBeginnerRecommendationReason(player: Player, userTeam: UserTeam[], teamStats: TeamStats): string {
    const rating = parseFloat(player.rating);
    const positionNames = { P: "Portiere", D: "Difensore", C: "Centrocampista", A: "Attaccante" };
    
    if (rating >= 7.5 && player.price <= 35) {
      return `🌟 CAMPIONE ACCESSIBILE: ${player.name} è top player ma costa "solo" ${player.price}FM! Voto ${rating} garantito.`;
    } 
    if (rating >= 7.0 && player.price <= 20) {
      return `💎 AFFARE INCREDIBILE: ${player.name} vale molto di più! Voto ${rating} a ${player.price}FM. Ha fatto ${player.goals} gol e ${player.assists} assist.`;
    } 
    if (player.price <= 8 && rating >= 6.0) {
      return `🎯 PERFETTO PER BUDGET: ${player.name} costa pochissimo (${player.price}FM) ma è affidabile (voto ${rating}).`;
    }
    
    return `📈 BUONA SCELTA: ${player.name} è un ${positionNames[player.position as keyof typeof positionNames]} solido. Voto ${rating}, ${player.goals} gol stagionali.`;
  }

  async getMarketActivity(): Promise<MarketActivity[]> {
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
    ];
  }

  async getFormations(userId: string): Promise<Formation[]> {
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
    return formation;
  }

  async getLeagueStandings(): Promise<LeagueStanding[]> {
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
    ];
  }

  async getSerieACalendar(): Promise<Match[]> {
    if (this.calendarData.length === 0) {
      const calendarData = await footballDataService.getSerieACalendar();
      this.calendarData = calendarData.map(m => ({
        id: randomUUID(),
        ...m,
      }));
    }
    return this.calendarData.sort((a, b) => a.round - b.round || a.date.getTime() - b.date.getTime());
  }

  async getMatchFormations(matchId: string): Promise<any> {
    // Simula formazioni per le partite
    // In una implementazione reale, questi dati verrebbero da un'API esterna
    const formations = {
      home: {
        formation: "4-3-3",
        players: [
          { position: "GK", name: "Portiere", number: 1 },
          { position: "DEF", name: "Terzino Dx", number: 2 },
          { position: "DEF", name: "Difensore Cx", number: 3 },
          { position: "DEF", name: "Difensore Cx", number: 4 },
          { position: "DEF", name: "Terzino Sx", number: 5 },
          { position: "MID", name: "Centrocampista", number: 6 },
          { position: "MID", name: "Centrocampista", number: 7 },
          { position: "MID", name: "Centrocampista", number: 8 },
          { position: "ATT", name: "Ala Dx", number: 9 },
          { position: "ATT", name: "Attaccante", number: 10 },
          { position: "ATT", name: "Ala Sx", number: 11 },
        ]
      },
      away: {
        formation: "3-5-2",
        players: [
          { position: "GK", name: "Portiere", number: 1 },
          { position: "DEF", name: "Difensore", number: 2 },
          { position: "DEF", name: "Difensore", number: 3 },
          { position: "DEF", name: "Difensore", number: 4 },
          { position: "MID", name: "Centrocampista", number: 5 },
          { position: "MID", name: "Centrocampista", number: 6 },
          { position: "MID", name: "Centrocampista", number: 7 },
          { position: "MID", name: "Centrocampista", number: 8 },
          { position: "MID", name: "Centrocampista", number: 9 },
          { position: "ATT", name: "Attaccante", number: 10 },
          { position: "ATT", name: "Attaccante", number: 11 },
        ]
      }
    };

    return formations;
  }

  async getAITeamAnalysis(userTeam: UserTeam[], teamStats: TeamStats, availablePlayers: Player[]): Promise<any> {
    if (aiService.isAvailable()) {
      try {
        return await aiService.analyzeTeam(userTeam, teamStats, availablePlayers);
      } catch (error) {
        console.error('Errore nell\'analisi AI della squadra:', error);
        return aiService.getFallbackTeamAnalysis(userTeam, teamStats);
      }
    } else {
      return aiService.getFallbackTeamAnalysis(userTeam, teamStats);
    }
  }
}

// Usa MemStorage quando il database non è disponibile
export const storage = new MemStorage();