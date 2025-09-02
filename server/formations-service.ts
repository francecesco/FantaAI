import axios from 'axios';
import type { Player } from '@shared/schema';
import { cacheService } from './cache-service';

interface ApiFootballFormation {
  formation: string;
  played: number;
}

interface ApiFootballPlayer {
  player: {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string | null;
  };
}

interface ApiFootballResponse<T> {
  get: string;
  parameters: any;
  errors: any[];
  results: number;
  paging: { current: number; total: number; };
  response: T[];
}

export class FormationsService {
  private baseURL = 'https://v3.football.api-sports.io';
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.API_FOOTBALL_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ API_FOOTBALL_KEY non configurata. Le formazioni non saranno reali.');
    }
  }

  private async makeRequest<T>(endpoint: string, params: any = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('❌ API_FOOTBALL_KEY non configurata');
    }

    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        },
        params
      });
      return response.data;
    } catch (error: any) {
      console.error(`❌ Errore API call ${endpoint}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getMatchFormation(matchId: string, teamId: string): Promise<{
    formation: string;
    players: Array<{
      name: string;
      position: string;
      number: number;
      grid: string | null;
    }>;
  } | null> {
    if (!this.apiKey) {
      return null;
    }

    try {
      // Cerca la partita per ottenere le formazioni
      const response = await this.makeRequest<ApiFootballResponse<any>>('/fixtures', {
        id: matchId,
        league: 135, // Serie A
        season: 2025
      });

      if (response.response.length === 0) {
        return null;
      }

      const match = response.response[0];
      
      // Determina se è la squadra di casa o ospite
      const isHome = match.teams.home.id.toString() === teamId;
      const teamFormation = isHome ? match.lineups?.home : match.lineups?.away;
      
      if (!teamFormation || !teamFormation.formation) {
        return null;
      }

      return {
        formation: teamFormation.formation,
        players: teamFormation.startXI?.map((player: ApiFootballPlayer) => ({
          name: player.player.name,
          position: this.mapPosition(player.player.pos),
          number: player.player.number,
          grid: player.player.grid
        })) || []
      };
    } catch (error: any) {
      console.error(`❌ Errore recupero formazione per match ${matchId}:`, error.message);
      return null;
    }
  }

  private mapPosition(apiPosition: string): string {
    const positionMap: Record<string, string> = {
      'G': 'P',
      'D': 'D',
      'M': 'C',
      'F': 'A'
    };
    return positionMap[apiPosition] || 'C';
  }

  async getTeamFormation(teamName: string, matchDate: string): Promise<{
    formation: string;
    players: Array<{
      name: string;
      position: string;
      number: number;
    }>;
  } | null> {
    if (!this.apiKey) {
      return null;
    }

    try {
      // Cerca le partite della squadra intorno alla data
      const response = await this.makeRequest<ApiFootballResponse<any>>('/fixtures', {
        team: this.getTeamId(teamName),
        league: 135, // Serie A
        season: 2025,
        date: matchDate
      });

      if (response.response.length === 0) {
        return null;
      }

      const match = response.response[0];
      const isHome = match.teams.home.name.toLowerCase().includes(teamName.toLowerCase());
      const teamFormation = isHome ? match.lineups?.home : match.lineups?.away;
      
      if (!teamFormation || !teamFormation.formation) {
        return null;
      }

      return {
        formation: teamFormation.formation,
        players: teamFormation.startXI?.map((player: ApiFootballPlayer) => ({
          name: player.player.name,
          position: this.mapPosition(player.player.pos),
          number: player.player.number
        })) || []
      };
    } catch (error: any) {
      console.error(`❌ Errore recupero formazione per ${teamName}:`, error.message);
      return null;
    }
  }

  private getTeamId(teamName: string): number {
    // Mapping dei nomi delle squadre Serie A agli ID di API-Football
    const teamIds: Record<string, number> = {
      'AC Milan': 489,
      'Inter': 505,
      'Juventus': 496,
      'Napoli': 492,
      'Roma': 497,
      'Lazio': 487,
      'Atalanta': 499,
      'Fiorentina': 502,
      'Bologna': 500,
      'Torino': 503,
      'Genoa': 495,
      'Monza': 1579,
      'Lecce': 867,
      'Sassuolo': 488,
      'Udinese': 494,
      'Verona': 504,
      'Cagliari': 490,
      'Empoli': 511,
      'Salernitana': 514,
      'Frosinone': 512
    };
    
    return teamIds[teamName] || 0;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}

export const formationsService = new FormationsService();
