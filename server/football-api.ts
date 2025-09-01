import type { Player, InsertPlayer } from "@shared/schema";

interface ApiFootballPlayer {
  player: {
    id: number;
    name: string;
    age: number;
    nationality: string;
    photo: string;
  };
  statistics: [{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: null;
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
      saves: number;
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
      past: number;
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
      won: number;
      commited: number;
      scored: number;
      missed: number;
      saved: number;
    };
  }];
}

interface ApiFootballResponse {
  get: string;
  parameters: any;
  errors: any[];
  results: number;
  response: ApiFootballPlayer[];
}

export class FootballApiService {
  private readonly baseUrl = "https://v3.football.api-sports.io";
  private readonly apiKey = process.env.API_FOOTBALL_KEY;
  private readonly serieALeagueId = 135;
  private readonly currentSeason = 2024;

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        'X-API-KEY': this.apiKey || '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  async getSerieAPlayers(): Promise<InsertPlayer[]> {
    if (!this.apiKey) {
      console.warn('API_FOOTBALL_KEY not found, using mock data');
      return this.getMockPlayers();
    }

    try {
      // Get Serie A teams first
      const teamsResponse = await this.makeRequest('/teams', {
        league: this.serieALeagueId,
        season: this.currentSeason,
      });

      const teams = teamsResponse.response || [];
      const allPlayers: InsertPlayer[] = [];

      // Get players for each team (limit to first 10 teams for free tier)
      for (const teamData of teams.slice(0, 10)) {
        try {
          const playersResponse: ApiFootballResponse = await this.makeRequest('/players', {
            team: teamData.team.id,
            season: this.currentSeason,
            league: this.serieALeagueId,
          });

          const teamPlayers = this.transformPlayersData(playersResponse.response, teamData.team.name);
          allPlayers.push(...teamPlayers);

          // Rate limiting - wait 1 second between requests for free tier
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error fetching players for team ${teamData.team.name}:`, error);
        }
      }

      return allPlayers.length > 0 ? allPlayers : this.getMockPlayers();
    } catch (error) {
      console.error('Error fetching Serie A players:', error);
      return this.getMockPlayers();
    }
  }

  private transformPlayersData(apiPlayers: ApiFootballPlayer[], teamName: string): InsertPlayer[] {
    return apiPlayers.map(apiPlayer => {
      const stats = apiPlayer.statistics[0];
      const position = this.mapPosition(stats.games.position);
      const rating = stats.games.rating ? parseFloat(stats.games.rating) : 6.0;
      
      // Calculate fantasy price based on performance
      const basePrice = this.calculateFantasyPrice(apiPlayer, stats);

      return {
        name: apiPlayer.player.name,
        position,
        team: teamName,
        price: basePrice,
        rating: rating.toFixed(1),
        goals: stats.goals.total || 0,
        assists: stats.goals.assists || 0,
        yellowCards: stats.cards.yellow || 0,
        redCards: stats.cards.red || 0,
        matchesPlayed: stats.games.appearences || 0,
        isActive: true,
      };
    }).filter(player => player.position !== null);
  }

  private mapPosition(apiPosition: string): string {
    const position = apiPosition?.toUpperCase();
    if (position?.includes('GOALKEEPER')) return 'P';
    if (position?.includes('DEFENDER')) return 'D';
    if (position?.includes('MIDFIELDER')) return 'C';
    if (position?.includes('ATTACKER') || position?.includes('FORWARD')) return 'A';
    
    // Fallback based on common position abbreviations
    if (position?.includes('GK')) return 'P';
    if (position?.includes('CB') || position?.includes('LB') || position?.includes('RB')) return 'D';
    if (position?.includes('CM') || position?.includes('CAM') || position?.includes('CDM')) return 'C';
    if (position?.includes('LW') || position?.includes('RW') || position?.includes('ST')) return 'A';
    
    return 'C'; // Default to midfielder
  }

  private calculateFantasyPrice(player: ApiFootballPlayer, stats: any): number {
    const basePrice = 10;
    const rating = parseFloat(stats.games.rating || '6.0');
    const goals = stats.goals.total || 0;
    const assists = stats.goals.assists || 0;
    const matches = stats.games.appearences || 1;
    
    // Performance multiplier
    const performanceScore = (rating - 6.0) * 10 + (goals + assists) / matches * 20;
    const price = Math.max(basePrice + performanceScore, 5);
    
    return Math.round(price);
  }

  private getMockPlayers(): InsertPlayer[] {
    return [
      // Portieri Serie A
      { name: "Yann Sommer", position: "P", team: "Inter", price: 22, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Mattia Perin", position: "P", team: "Juventus", price: 18, rating: "6.8", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Alex Meret", position: "P", team: "Napoli", price: 16, rating: "6.9", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Mike Maignan", position: "P", team: "Milan", price: 28, rating: "7.3", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Juan Musso", position: "P", team: "Atalanta", price: 14, rating: "6.6", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },

      // Difensori Serie A
      { name: "Alessandro Bastoni", position: "D", team: "Inter", price: 38, rating: "7.4", goals: 3, assists: 5, yellowCards: 2, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Fikayo Tomori", position: "D", team: "Milan", price: 25, rating: "6.9", goals: 2, assists: 1, yellowCards: 4, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Kim Min-jae", position: "D", team: "Napoli", price: 35, rating: "7.2", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Davide Calabria", position: "D", team: "Milan", price: 18, rating: "6.7", goals: 1, assists: 3, yellowCards: 5, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Giorgio Scalvini", position: "D", team: "Atalanta", price: 22, rating: "7.0", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Gleison Bremer", position: "D", team: "Juventus", price: 32, rating: "7.1", goals: 3, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Mario Rui", position: "D", team: "Napoli", price: 12, rating: "6.4", goals: 0, assists: 2, yellowCards: 6, redCards: 1, matchesPlayed: 17, isActive: true },
      { name: "Borna Sosa", position: "D", team: "Atalanta", price: 15, rating: "6.8", goals: 1, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },

      // Centrocampisti Serie A
      { name: "Nicolò Barella", position: "C", team: "Inter", price: 48, rating: "7.6", goals: 4, assists: 6, yellowCards: 4, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Marcelo Brozović", position: "C", team: "Inter", price: 35, rating: "7.2", goals: 2, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Lorenzo Pellegrini", position: "C", team: "Roma", price: 32, rating: "7.0", goals: 3, assists: 5, yellowCards: 6, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Khvicha Kvaratskhelia", position: "C", team: "Napoli", price: 45, rating: "8.0", goals: 8, assists: 9, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Matteo Zaccagni", position: "C", team: "Lazio", price: 28, rating: "7.1", goals: 4, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Hakan Çalhanoğlu", position: "C", team: "Inter", price: 38, rating: "7.3", goals: 3, assists: 7, yellowCards: 4, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Piotr Zieliński", position: "C", team: "Napoli", price: 30, rating: "6.9", goals: 2, assists: 6, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Teun Koopmeiners", position: "C", team: "Atalanta", price: 35, rating: "7.2", goals: 5, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },

      // Attaccanti Serie A
      { name: "Victor Osimhen", position: "A", team: "Napoli", price: 65, rating: "8.3", goals: 18, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Lautaro Martínez", position: "A", team: "Inter", price: 58, rating: "8.0", goals: 15, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Dušan Vlahović", position: "A", team: "Juventus", price: 52, rating: "7.6", goals: 12, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Ciro Immobile", position: "A", team: "Lazio", price: 38, rating: "7.4", goals: 9, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Rafael Leão", position: "A", team: "Milan", price: 50, rating: "7.8", goals: 8, assists: 7, yellowCards: 3, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Romelu Lukaku", position: "A", team: "Roma", price: 45, rating: "7.5", goals: 10, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Tammy Abraham", position: "A", team: "Roma", price: 25, rating: "6.8", goals: 6, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Ademola Lookman", position: "A", team: "Atalanta", price: 30, rating: "7.1", goals: 7, assists: 5, yellowCards: 2, redCards: 0, matchesPlayed: 20, isActive: true },
    ];
  }

  async refreshPlayerData(): Promise<InsertPlayer[]> {
    try {
      const players = await this.getSerieAPlayers();
      console.log(`Fetched ${players.length} players from API Football`);
      return players;
    } catch (error) {
      console.error('Failed to fetch from API Football, using mock data:', error);
      return this.getMockPlayers();
    }
  }
}

export const footballApi = new FootballApiService();