import { fileURLToPath } from 'url';
import * as path from 'path';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CacheData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  version: string;
}

export class CacheService {
  private static instance: CacheService;
  private cacheDir: string;
  private lastRefreshDate: string | null = null;

  private constructor() {
    this.cacheDir = path.join(__dirname, 'cache');
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.ensureCacheDir();
    this.loadLastRefreshDate();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  private async ensureCacheDir(): Promise<void> {
    const fs = await import('fs');
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  private async loadLastRefreshDate(): Promise<void> {
    try {
      const fs = await import('fs');
      const dateFile = path.join(this.cacheDir, 'last-refresh.txt');
      if (fs.existsSync(dateFile)) {
        this.lastRefreshDate = fs.readFileSync(dateFile, 'utf8').trim();
      }
    } catch (error) {
      console.error('❌ Errore caricamento data ultimo refresh:', error);
    }
  }

  private async saveLastRefreshDate(): Promise<void> {
    try {
      const fs = await import('fs');
      const dateFile = path.join(this.cacheDir, 'last-refresh.txt');
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      fs.writeFileSync(dateFile, today);
      this.lastRefreshDate = today;
      console.log(`📅 Data ultimo refresh salvata: ${today}`);
    } catch (error) {
      console.error('❌ Errore salvataggio data ultimo refresh:', error);
    }
  }

  public needsDailyRefresh(): boolean {
    const today = new Date().toISOString().split('T')[0];
    return this.lastRefreshDate !== today;
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const fs = await import('fs');
      const cacheFile = path.join(this.cacheDir, `${key}.json`);
      
      if (!fs.existsSync(cacheFile)) {
        return null;
      }

      const cacheData: CacheData<T> = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      
      // Verifica se la cache è scaduta
      if (Date.now() > cacheData.expiresAt) {
        console.log(`🔄 Cache scaduta per ${key}, rimozione...`);
        fs.unlinkSync(cacheFile);
        return null;
      }

      console.log(`📦 Cache hit per ${key} (età: ${Math.round((Date.now() - cacheData.timestamp) / 1000 / 60)} minuti)`);
      return cacheData.data;
    } catch (error) {
      console.error(`❌ Errore lettura cache ${key}:`, error);
      return null;
    }
  }

  public async set<T>(key: string, data: T, ttlHours: number = 24): Promise<void> {
    try {
      const fs = await import('fs');
      const cacheFile = path.join(this.cacheDir, `${key}.json`);
      
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + (ttlHours * 60 * 60 * 1000),
        version: '1.0.0'
      };

      fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
      console.log(`💾 Cache salvata per ${key} (TTL: ${ttlHours}h)`);
    } catch (error) {
      console.error(`❌ Errore salvataggio cache ${key}:`, error);
    }
  }

  public async clear(key?: string): Promise<void> {
    try {
      const fs = await import('fs');
      
      if (key) {
        const cacheFile = path.join(this.cacheDir, `${key}.json`);
        if (fs.existsSync(cacheFile)) {
          fs.unlinkSync(cacheFile);
          console.log(`🗑️ Cache rimossa per ${key}`);
        }
      } else {
        // Rimuovi tutti i file cache
        const files = fs.readdirSync(this.cacheDir);
        for (const file of files) {
          if (file.endsWith('.json')) {
            fs.unlinkSync(path.join(this.cacheDir, file));
          }
        }
        console.log(`🗑️ Tutte le cache rimosse`);
      }
    } catch (error) {
      console.error(`❌ Errore pulizia cache:`, error);
    }
  }

  public async getCacheInfo(): Promise<{ key: string; age: number; size: number }[]> {
    try {
      const fs = await import('fs');
      const files = fs.readdirSync(this.cacheDir);
      const info: { key: string; age: number; size: number }[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const cacheFile = path.join(this.cacheDir, file);
          const stats = fs.statSync(cacheFile);
          const cacheData: CacheData<any> = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
          
          info.push({
            key: file.replace('.json', ''),
            age: Math.round((Date.now() - cacheData.timestamp) / 1000 / 60), // minuti
            size: stats.size
          });
        }
      }

      return info;
    } catch (error) {
      console.error('❌ Errore info cache:', error);
      return [];
    }
  }

  public async markDailyRefreshCompleted(): Promise<void> {
    await this.saveLastRefreshDate();
  }

  public getLastRefreshDate(): string | null {
    return this.lastRefreshDate;
  }
}

export const cacheService = CacheService.getInstance();
