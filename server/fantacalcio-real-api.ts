import type { Player, InsertPlayer, Match, InsertMatch } from "@shared/schema";
import { serieACalendar2025_26 } from "./serie-a-calendar-2025-26";
import { footballDataService } from "./football-data-service";
import { cacheService } from "./cache-service";

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
    if (!footballDataService.isAvailable()) {
      console.log('⚠️ FOOTBALL_DATA_API_KEY non configurata, uso calendario statico...');
      // Fallback al calendario statico se l'API non è disponibile
      return serieACalendar2025_26;
    }
    
    console.log('🌐 Caricamento calendario Serie A 2025/26 da Football-Data.org...');
    return await footballDataService.getSerieACalendar();
  }
}

export const fantacalcioRealDataService = new FantacalcioRealDataService();
