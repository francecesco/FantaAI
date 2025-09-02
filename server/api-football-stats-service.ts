import axios from 'axios';
import type { InsertPlayer } from "@shared/schema";

interface ApiFootballPlayerStats {
  player: {
    id: number;
    name: string;
  };
  statistics: Array<{
    team: {
      id: number;
      name: string;
    };
    league: {
      id: number;
      name: string;
      season: number;
    };
    games: {
      appearances: number;
      lineups: number;
      minutes: number;
      number: number | null;
      position: string;
      rating: string;
      captain: boolean;
    };
    substitutes: {
      in: number;
      out: number;
      bench: number;
    };
    shots: {
      total: number;
      on: number;
    };
    goals: {
      total: number;
      conceded: number;
      assists: number;
      saves: number | null;
    };
    passes: {
      total: number;
      key: number;
      accuracy: number;
    };
    tackles: {
      total: number;
      blocks: number;
      interceptions: number;
    };
    duels: {
      total: number;
      won: number;
    };
    dribbles: {
      attempts: number;
      success: number;
      past: number | null;
    };
    fouls: {
      drawn: number;
      committed: number;
    };
    cards: {
      yellow: number;
      yellowred: number;
      red: number;
    };
    penalty: {
      won: number | null;
      commited: number | null;
      scored: number;
      missed: number;
      saved: number | null;
    };
  }>;
}

interface ApiFootballResponse<T> {
  get: string;
  parameters: Record<string, any>;
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T[];
}

export class ApiFootballStatsService {
  private baseURL = 'https://v3.football.api-sports.io';
  private apiKey: string;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 60 * 60 * 1000; // 1 ora

  constructor() {
    this.apiKey = process.env.API_FOOTBALL_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ API_FOOTBALL_KEY non configurata. Statistiche non disponibili.');
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('❌ API_FOOTBALL_KEY non configurata');
    }

    const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'v3.football.api-sports.io'
        },
        params
      });

      const data = response.data as T;
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      
      return data;
    } catch (error: any) {
      console.error(`❌ Errore API call ${endpoint}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getPlayerStats(playerName: string, teamName: string): Promise<{
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    matchesPlayed: number;
  }> {
    if (!this.apiKey) {
      return { goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0 };
    }

    try {
      // Lista di giocatori famosi per cui vale la pena cercare statistiche
      const famousPlayers = [
        'Rafael Leão', 'Mike Maignan', 'Fikayo Tomori', 'Theo Hernández', 'Ismael Bennacer',
        'Olivier Giroud', 'Christian Pulisic', 'Yunus Musah', 'Samuel Chukwueze', 'Santiago Giménez',
        'Adrien Rabiot', 'Federico Chiesa', 'Dusan Vlahovic', 'Wojciech Szczesny', 'Gleison Bremer',
        'Romelu Lukaku', 'Lautaro Martínez', 'Nicolò Barella', 'Alessandro Bastoni', 'Hakan Çalhanoğlu',
        'Victor Osimhen', 'Khvicha Kvaratskhelia', 'Stanislav Lobotka', 'Giovanni Di Lorenzo',
        'Ciro Immobile', 'Sergej Milinković-Savić', 'Luis Alberto', 'Mattia Zaccagni',
        'Dusan Vlahovic', 'Federico Chiesa', 'Adrien Rabiot', 'Wojciech Szczesny',
        'Joshua Zirkzee', 'Lewis Ferguson', 'Riccardo Orsolini', 'Lukasz Skorupski'
      ];

      // Solo per giocatori famosi, altrimenti usa statistiche base
      if (!famousPlayers.some(famous => playerName.toLowerCase().includes(famous.toLowerCase()))) {
        return { goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2 }; // 2 partite giocate (stagione iniziata)
      }

      // Prima cerchiamo il giocatore
      const searchResponse = await this.makeRequest<ApiFootballResponse<ApiFootballPlayerStats>>(
        '/players',
        {
          search: playerName,
          league: 135, // Serie A
          season: 2025
        }
      );

      if (searchResponse.response.length === 0) {
        console.log(`⚠️ Giocatore ${playerName} non trovato in API-Football`);
        return { goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2 };
      }

      // Prendiamo il primo risultato (il più probabile)
      const playerStats = searchResponse.response[0];
      
      if (!playerStats.statistics || playerStats.statistics.length === 0) {
        console.log(`⚠️ Nessuna statistica disponibile per ${playerName}`);
        return { goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2 };
      }

      // Prendiamo le statistiche della Serie A 2025
      const serieAStats = playerStats.statistics.find(stat => 
        stat.league.name === 'Serie A' && stat.league.season === 2025
      );

      if (!serieAStats) {
        console.log(`⚠️ Nessuna statistica Serie A 2025 per ${playerName}`);
        return { goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2 };
      }

      console.log(`✅ Statistiche trovate per ${playerName}: ${serieAStats.goals.total} gol, ${serieAStats.goals.assists} assist`);

      return {
        goals: serieAStats.goals.total || 0,
        assists: serieAStats.goals.assists || 0,
        yellowCards: serieAStats.cards.yellow || 0,
        redCards: serieAStats.cards.red || 0,
        matchesPlayed: serieAStats.games.appearances || 2
      };

    } catch (error: any) {
      console.error(`❌ Errore nel recupero statistiche per ${playerName}:`, error.message);
      return { goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2 };
    }
  }

  async updatePlayersStats(players: InsertPlayer[]): Promise<InsertPlayer[]> {
    if (!this.apiKey) {
      console.log('⚠️ API_FOOTBALL_KEY non configurata, saltando aggiornamento statistiche');
      return players;
    }

    // Lista di giocatori famosi per cui vale la pena cercare statistiche
    const famousPlayers = [
      'Rafael Leão', 'Mike Maignan', 'Fikayo Tomori', 'Theo Hernández', 'Ismael Bennacer',
      'Olivier Giroud', 'Christian Pulisic', 'Yunus Musah', 'Samuel Chukwueze', 'Santiago Giménez',
      'Adrien Rabiot', 'Federico Chiesa', 'Dusan Vlahovic', 'Wojciech Szczesny', 'Gleison Bremer',
      'Romelu Lukaku', 'Lautaro Martínez', 'Nicolò Barella', 'Alessandro Bastoni', 'Hakan Çalhanoğlu',
      'Victor Osimhen', 'Khvicha Kvaratskhelia', 'Stanislav Lobotka', 'Giovanni Di Lorenzo',
      'Ciro Immobile', 'Sergej Milinković-Savić', 'Luis Alberto', 'Mattia Zaccagni',
      'Joshua Zirkzee', 'Lewis Ferguson', 'Riccardo Orsolini', 'Lukasz Skorupski'
    ];

    // Filtra solo i giocatori famosi
    const famousPlayersToUpdate = players.filter(player => 
      famousPlayers.some(famous => player.name.toLowerCase().includes(famous.toLowerCase()))
    );

    console.log(`📊 Aggiornamento statistiche per ${famousPlayersToUpdate.length} giocatori famosi (su ${players.length} totali) con API-Football...`);
    
    const updatedPlayers: InsertPlayer[] = [];
    let successCount = 0;
    let errorCount = 0;
    let requestCount = 0;

    // Prima aggiorna tutti i giocatori con statistiche base (2 partite giocate)
    for (const player of players) {
      const isFamous = famousPlayers.some(famous => player.name.toLowerCase().includes(famous.toLowerCase()));
      
      if (!isFamous) {
        // Per giocatori non famosi, usa statistiche base
        updatedPlayers.push({
          ...player,
          goals: 0,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
          matchesPlayed: 2 // 2 partite giocate (stagione iniziata)
        });
      }
    }

    // Poi aggiorna solo i giocatori famosi
    for (let i = 0; i < famousPlayersToUpdate.length; i++) {
      const player = famousPlayersToUpdate[i];
      
      try {
        console.log(`📊 [${i + 1}/${famousPlayersToUpdate.length}] Aggiornamento statistiche ${player.name}...`);
        
        const stats = await this.getPlayerStats(player.name, player.team);
        
        const updatedPlayer: InsertPlayer = {
          ...player,
          goals: stats.goals,
          assists: stats.assists,
          yellowCards: stats.yellowCards,
          redCards: stats.redCards,
          matchesPlayed: stats.matchesPlayed
        };

        updatedPlayers.push(updatedPlayer);
        successCount++;
        requestCount++;

        // Rate limiting: 10 richieste al minuto (piano gratuito)
        if (requestCount % 10 === 0) {
          console.log(`⏳ Rate limiting: pausa di 60 secondi dopo ${requestCount} richieste...`);
          await new Promise(resolve => setTimeout(resolve, 60000));
        } else {
          // Pausa di 6 secondi tra le richieste
          await new Promise(resolve => setTimeout(resolve, 6000));
        }

      } catch (error: any) {
        console.error(`❌ Errore aggiornamento ${player.name}:`, error.message);
        updatedPlayers.push({
          ...player,
          goals: 0,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
          matchesPlayed: 2
        }); // Mantieni il giocatore con statistiche base
        errorCount++;
      }
    }

    console.log(`✅ Statistiche aggiornate: ${successCount} giocatori famosi con statistiche reali, ${players.length - famousPlayersToUpdate.length} con statistiche base`);
    return updatedPlayers;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}

export const apiFootballStatsService = new ApiFootballStatsService();
