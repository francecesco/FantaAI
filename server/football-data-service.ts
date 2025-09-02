import axios from 'axios';
import type { Player, InsertPlayer } from '@shared/schema';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { apiFootballStatsService } from './api-football-stats-service';
import { cacheService } from './cache-service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface FootballDataTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
  squad: FootballDataPlayer[];
}

interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    winner: string | null;
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
  odds: any;
  referees: any[];
}

interface FootballDataPlayer {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  shirtNumber?: number;
  role: string;
}

interface FootballDataResponse<T> {
  count: number;
  filters: any;
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner?: any;
  };
  teams: T[];
}

export class FootballDataService {
  private baseURL = 'https://api.football-data.org/v4';
  private apiKey: string;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 30 * 60 * 1000; // 30 minuti per cache in memoria

  constructor() {
    this.apiKey = process.env.FOOTBALL_DATA_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ FOOTBALL_DATA_API_KEY non configurata. Usando dati mock.');
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log(`📦 Cache hit per ${endpoint}`);
      return cached.data;
    }

    if (!this.apiKey) {
      throw new Error('API key non configurata');
    }

    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        headers: {
          'X-Auth-Token': this.apiKey
        },
        params
      });

      const data = response.data;
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      
      console.log(`🌐 API call: ${endpoint} - ${data.count || 'N/A'} risultati`);
      return data;
    } catch (error) {
      console.error(`❌ Errore API call ${endpoint}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getSerieAPlayers(): Promise<InsertPlayer[]> {
    if (!this.apiKey) {
      throw new Error('❌ FOOTBALL_DATA_API_KEY non configurata. Configura la chiave API per utilizzare dati reali.');
    }

    // Prova prima a leggere dalla cache persistente
    const cachedPlayers = await this.getCachedPlayers();
    if (cachedPlayers.length > 0) {
      return cachedPlayers;
    }
    
    // Controlla se il database è già popolato
    const dbPlayers = await this.getPlayersFromDatabase();
    if (dbPlayers.length > 0) {
      console.log(`📦 Database già popolato con ${dbPlayers.length} giocatori, salvataggio in cache...`);
      await this.saveCache(dbPlayers);
      return dbPlayers;
    }
    
    console.log('🔄 Cache vuota e database vuoto, ricaricamento da API...');
    // Svuota anche la cache in memoria per forzare il ricaricamento
    this.clearCache();

    console.log('🌐 Caricamento giocatori Serie A 2025/26 da Football-Data.org...');
    
    try {
      // Ottieni tutte le squadre Serie A 2025/26
      const teamsResponse = await this.makeRequest<FootballDataResponse<FootballDataTeam>>('/competitions/SA/teams', {
        season: 2025
      });

      const allPlayers: InsertPlayer[] = [];
      
      console.log(`📋 Trovate ${teamsResponse.teams.length} squadre Serie A 2025/26`);

      // I giocatori sono già inclusi nella risposta delle squadre
      for (let i = 0; i < teamsResponse.teams.length; i++) {
        const team = teamsResponse.teams[i];
        console.log(`📋 [${i + 1}/${teamsResponse.teams.length}] Elaborazione giocatori ${team.name}...`);
        console.log(`🔍 Squadra ${team.name} ha ${team.squad?.length || 0} giocatori nella squadra`);
        
        let teamPlayers = 0;
        let discardedPlayers = 0;
        if (team.squad) {
          for (const playerData of team.squad) {
            const player = this.transformFootballDataPlayerToPlayer(playerData, team.name);
            if (player) {
              allPlayers.push(player);
              teamPlayers++;
            } else {
              discardedPlayers++;
              console.log(`⚠️ Scartato giocatore ${playerData.name} (posizione: ${playerData.position})`);
            }
          }
        }
        
        console.log(`✅ ${team.name}: ${teamPlayers} giocatori elaborati, ${discardedPlayers} scartati`);
      }

                        // Aggiorna le statistiche con API-Football se disponibile
                  if (apiFootballStatsService.isAvailable()) {
                    console.log('📊 Aggiornamento statistiche con API-Football...');
                    const playersWithStats = await apiFootballStatsService.updatePlayersStats(allPlayers);
                    await this.saveCache(playersWithStats);
                    console.log(`✅ Caricati ${playersWithStats.length} giocatori Serie A 2025/26 con statistiche reali`);
                    return playersWithStats;
                  } else {
                    console.log('⚠️ API-Football non disponibile, usando statistiche base');
                    await this.saveCache(allPlayers);
                    console.log(`✅ Caricati ${allPlayers.length} giocatori Serie A 2025/26 da Football-Data.org`);
                    return allPlayers;
                  }
    } catch (error) {
      console.error('❌ Errore nel caricamento giocatori:', error);
      throw error;
    }
  }

  private transformFootballDataPlayerToPlayer(footballDataPlayer: FootballDataPlayer, teamName: string): InsertPlayer | null {
    const position = this.mapPosition(footballDataPlayer.position);
    if (!position) return null;

    // Calcola età per stimare rating e prezzo
    const age = this.calculateAge(footballDataPlayer.dateOfBirth);
    const rating = this.calculateRating(age, position);
    const price = this.calculatePrice(rating, position, age);

    return {
      name: footballDataPlayer.name,
      position,
      team: teamName,
      price,
      rating: rating.toString(),
      goals: 0, // Sarà aggiornato con API-Football
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      matchesPlayed: 0,
      isActive: true
    };
  }

  private mapPosition(footballDataPosition: string): string | null {
    const positionMap: Record<string, string> = {
      // Portieri
      'Goalkeeper': 'P',
      
      // Difensori
      'Defence': 'D',
      'Defender': 'D',
      'Centre-Back': 'D',
      'Left-Back': 'D',
      'Right-Back': 'D',
      
      // Centrocampisti
      'Midfield': 'C',
      'Midfielder': 'C',
      'Central Midfield': 'C',
      'Defensive Midfield': 'C',
      'Attacking Midfield': 'C',
      'Left Midfield': 'C',
      'Right Midfield': 'C',
      
      // Attaccanti
      'Offence': 'A',
      'Attacker': 'A',
      'Forward': 'A',
      'Striker': 'A',
      'Centre-Forward': 'A',
      'Left Winger': 'A',
      'Right Winger': 'A'
    };
    return positionMap[footballDataPosition] || null;
  }

  private calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  private calculateRating(age: number, position: string): number {
    let baseRating = 6.0;
    
    // Bonus per età (picco tra 25-30 anni)
    if (age >= 25 && age <= 30) {
      baseRating += 1.0;
    } else if (age >= 22 && age <= 32) {
      baseRating += 0.5;
    } else if (age < 20 || age > 35) {
      baseRating -= 0.5;
    }
    
    // Bonus per posizione
    const positionMultipliers = { P: 0.2, D: 0.0, C: 0.1, A: 0.3 };
    baseRating += positionMultipliers[position] || 0;
    
    return Math.round((Math.max(4.0, Math.min(10.0, baseRating)) * 10)) / 10;
  }

  private calculatePrice(rating: number, position: string, age: number): number {
    let basePrice = rating * 3;
    
    // Bonus per posizione
    const positionMultipliers = { P: 1.2, D: 1.0, C: 1.1, A: 1.3 };
    basePrice *= positionMultipliers[position] || 1.0;
    
    // Bonus per età (giovani e veterani costano meno)
    if (age < 22) basePrice *= 0.8; // Giovani
    else if (age > 32) basePrice *= 0.9; // Veterani
    else if (age >= 25 && age <= 30) basePrice *= 1.2; // Picco carriera
    
    return Math.round(Math.max(5, Math.min(50, basePrice)));
  }



  private async getCachedPlayers(): Promise<InsertPlayer[]> {
    const cachedPlayers = await cacheService.get<InsertPlayer[]>('players');
    if (cachedPlayers) {
      console.log(`📦 Caricamento ${cachedPlayers.length} giocatori dalla cache persistente`);
      return cachedPlayers;
    }
    return [];
  }

  private async saveCache(players: InsertPlayer[]): Promise<void> {
    await cacheService.set('players', players, 25); // 25 ore per sicurezza
    console.log(`💾 Cache persistente salvata: ${players.length} giocatori`);
  }

  private async getPlayersFromDatabase(): Promise<InsertPlayer[]> {
    try {
      const { db } = await import('./db');
      const { players } = await import('@shared/schema');
      
      const dbPlayers = await db.select().from(players).limit(1);
      if (dbPlayers.length === 0) {
        return [];
      }
      
      // Se ci sono giocatori nel database, li convertiamo nel formato InsertPlayer
      const allPlayers = await db.select().from(players);
      return allPlayers.map(player => ({
        name: player.name,
        position: player.position,
        team: player.team,
        price: player.price,
        rating: parseFloat(player.rating),
        goals: player.goals || 0,
        assists: player.assists || 0,
        yellowCards: player.yellowCards || 0,
        redCards: player.redCards || 0,
        matchesPlayed: player.matchesPlayed || 0
      }));
    } catch (error) {
      console.error('❌ Errore lettura database:', error);
      return [];
    }
  }

  async getSerieACalendar(): Promise<InsertMatch[]> {
    if (!this.apiKey) {
      throw new Error('❌ FOOTBALL_DATA_API_KEY non configurata. Configura la chiave API per utilizzare dati reali.');
    }

    // Controlla prima la cache persistente
    const cachedCalendar = await cacheService.get<InsertMatch[]>('calendar');
    if (cachedCalendar) {
      console.log(`📦 Caricamento ${cachedCalendar.length} partite dalla cache persistente`);
      return cachedCalendar;
    }

    console.log('🔄 Cache vuota o scaduta, ricaricamento calendario da API...');
    this.clearCache(); // Svuota cache in memoria

    console.log('🌐 Caricamento calendario Serie A 2025/26 da Football-Data.org...');
    
    try {
      // Ottieni tutte le partite Serie A 2025/26
      const matchesResponse = await this.makeRequest<FootballDataResponse<FootballDataMatch>>('/competitions/SA/matches', {
        season: 2025
      });

      const allMatches: InsertMatch[] = [];
      
      console.log(`📋 Trovate ${matchesResponse.matches.length} partite Serie A 2025/26`);

      for (const matchData of matchesResponse.matches) {
        const match = this.transformFootballDataMatchToMatch(matchData);
        if (match) {
          allMatches.push(match);
        }
      }

      // Salva in cache per 25 ore
      await this.saveCalendarCache(allMatches);
      console.log(`✅ Caricati ${allMatches.length} partite Serie A 2025/26 da Football-Data.org`);
      
      return allMatches;
    } catch (error: any) {
      console.error('❌ Errore caricamento calendario:', error);
      throw error;
    }
  }

  private transformFootballDataMatchToMatch(footballDataMatch: FootballDataMatch): InsertMatch | null {
    try {
      // Per le partite finite, assicurati che i punteggi siano valorizzati
      let homeScore = footballDataMatch.score?.fullTime?.home;
      let awayScore = footballDataMatch.score?.fullTime?.away;
      
      // Se la partita è finita ma i punteggi sono null, imposta 0
      if (footballDataMatch.status === 'FINISHED') {
        homeScore = homeScore ?? 0;
        awayScore = awayScore ?? 0;
      }

      return {
        round: footballDataMatch.matchday || 1,
        homeTeam: footballDataMatch.homeTeam.name,
        awayTeam: footballDataMatch.awayTeam.name,
        homeScore,
        awayScore,
        date: new Date(footballDataMatch.utcDate),
        status: this.mapMatchStatus(footballDataMatch.status),
        fantacalcioId: footballDataMatch.id?.toString() || null
      };
    } catch (error) {
      console.error('❌ Errore trasformazione partita:', error);
      return null;
    }
  }

  private mapMatchStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'SCHEDULED': 'scheduled',
      'TIMED': 'scheduled',
      'IN_PLAY': 'live',
      'PAUSED': 'live',
      'FINISHED': 'finished',
      'POSTPONED': 'postponed',
      'SUSPENDED': 'postponed',
      'CANCELLED': 'postponed'
    };
    return statusMap[status] || 'scheduled';
  }

  private async saveCalendarCache(matches: InsertMatch[]): Promise<void> {
    await cacheService.set('calendar', matches, 25); // 25 ore per sicurezza
    console.log(`💾 Cache persistente calendario salvata: ${matches.length} partite`);
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache in memoria svuotata');
  }
}

export const footballDataService = new FootballDataService();
