import type { Player, InsertPlayer, Match, InsertMatch } from "@shared/schema";
import { fantacalcioRealDataService } from "./fantacalcio-real-api";

// Sistema basato esclusivamente su dati reali Fantacalcio.it per Serie A 2025/26
export class FantacalcioDataService {
  
  async getSerieAPlayers(): Promise<InsertPlayer[]> {
    return fantacalcioRealDataService.getSerieAPlayers();
  }

  async getSerieACalendar(): Promise<InsertMatch[]> {
    return fantacalcioRealDataService.getSerieACalendar();
  }
}

export const footballDataService = new FantacalcioDataService();