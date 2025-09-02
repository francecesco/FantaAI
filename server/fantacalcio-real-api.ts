import type { Player, InsertPlayer, Match, InsertMatch } from "@shared/schema";
import { serieACalendar2025_26 } from "./serie-a-calendar-2025-26";
import { footballDataService } from "./football-data-service";

// Servizio per scaricare dati reali da Football-Data.org
export class FantacalcioRealDataService {
  
  async getSerieAPlayers(): Promise<InsertPlayer[]> {
    if (!footballDataService.isAvailable()) {
      throw new Error('❌ FOOTBALL_DATA_API_KEY non configurata. Configura la chiave API per utilizzare dati reali.');
    }
    
    console.log('🌐 Caricamento dati reali Serie A 2025/26 da Football-Data.org...');
    return await footballDataService.getSerieAPlayers();
  }

  async getSerieACalendar(): Promise<InsertMatch[]> {
    console.log('📅 Caricamento calendario completo Serie A 2025/26...');
    return serieACalendar2025_26;
  }
}

export const fantacalcioRealDataService = new FantacalcioRealDataService();
