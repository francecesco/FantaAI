import { footballDataService } from './football-data-service';
import { cacheService } from './cache-service';

export class SchedulerService {
  private static instance: SchedulerService;
  private refreshInterval: NodeJS.Timeout | null = null;
  private isRefreshing: boolean = false;

  private constructor() {
    this.startDailyRefresh();
  }

  public static getInstance(): SchedulerService {
    if (!SchedulerService.instance) {
      SchedulerService.instance = new SchedulerService();
    }
    return SchedulerService.instance;
  }

  private startDailyRefresh(): void {
    // Calcola il prossimo refresh a mezzanotte
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    console.log(`⏰ Scheduler configurato per refresh giornaliero alle 00:00`);
    console.log(`⏰ Prossimo refresh tra ${Math.round(msUntilMidnight / 1000 / 60 / 60)} ore e ${Math.round((msUntilMidnight % (1000 * 60 * 60)) / 1000 / 60)} minuti`);

    // Imposta il timeout per il primo refresh a mezzanotte
    setTimeout(() => {
      this.performDailyRefresh();
      // Poi imposta l'intervallo per ogni 24 ore
      this.refreshInterval = setInterval(() => {
        this.performDailyRefresh();
      }, 24 * 60 * 60 * 1000); // 24 ore
    }, msUntilMidnight);
  }

  private async performDailyRefresh(): Promise<void> {
    if (this.isRefreshing) {
      console.log('⏳ Refresh già in corso, salto...');
      return;
    }

    this.isRefreshing = true;
    const startTime = Date.now();
    
    try {
      console.log('🌅 === INIZIO REFRESH GIORNALIERO ===');
      console.log(`📅 Data: ${new Date().toISOString()}`);
      
      // 1. Refresh giocatori da Football-Data.org
      console.log('📊 Aggiornamento giocatori Serie A...');
      const players = await footballDataService.getSerieAPlayers();
      await cacheService.set('players', players, 25); // 25 ore per sicurezza
      console.log(`✅ ${players.length} giocatori aggiornati e salvati in cache`);

      // 2. Refresh calendario
      console.log('📅 Aggiornamento calendario Serie A...');
      const calendar = await footballDataService.getSerieACalendar();
      console.log(`✅ ${calendar.length} partite aggiornate e salvate in cache`);

      // 3. Marca il refresh come completato
      await cacheService.markDailyRefreshCompleted();
      
      const duration = Math.round((Date.now() - startTime) / 1000);
      console.log(`🌅 === REFRESH GIORNALIERO COMPLETATO ===`);
      console.log(`⏱️ Durata: ${duration} secondi`);
      console.log(`📊 Prossimo refresh: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}`);
      
    } catch (error) {
      console.error('❌ Errore durante refresh giornaliero:', error);
    } finally {
      this.isRefreshing = false;
    }
  }

  public async forceRefresh(): Promise<void> {
    console.log('🔄 Refresh forzato richiesto...');
    await this.performDailyRefresh();
  }

  public getStatus(): {
    isRefreshing: boolean;
    lastRefresh: string | null;
    needsRefresh: boolean;
    nextRefresh: string;
  } {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    return {
      isRefreshing: this.isRefreshing,
      lastRefresh: cacheService.getLastRefreshDate(),
      needsRefresh: cacheService.needsDailyRefresh(),
      nextRefresh: tomorrow.toISOString()
    };
  }

  public stop(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
      console.log('⏹️ Scheduler fermato');
    }
  }
}

export const schedulerService = SchedulerService.getInstance();
