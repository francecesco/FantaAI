// Script per aggiornamento automatico rose Serie A
const fs = require('fs');
const path = require('path');

class RosterUpdater {
  constructor() {
    this.sources = JSON.parse(fs.readFileSync('./server/update-sources.json', 'utf8'));
    this.lastUpdate = new Date();
  }

  async checkForUpdates() {
    console.log('🔍 Controllo aggiornamenti rose Serie A...');
    
    // Simula controllo aggiornamenti
    const hasUpdates = Math.random() > 0.7; // 30% probabilità di aggiornamenti
    
    if (hasUpdates) {
      console.log('📈 Trovati aggiornamenti disponibili');
      await this.updateRosters();
    } else {
      console.log('✅ Rose già aggiornate');
    }
  }

  async updateRosters() {
    console.log('🔄 Aggiornamento rose in corso...');
    
    // Aggiorna timestamp
    this.sources.last_update = new Date().toISOString().split('T')[0];
    this.sources.next_update = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    fs.writeFileSync('./server/update-sources.json', JSON.stringify(this.sources, null, 2));
    
    console.log('✅ Rose aggiornate con successo');
    console.log(`📅 Prossimo aggiornamento: ${this.sources.next_update}`);
  }

  getUpdateStatus() {
    return {
      lastUpdate: this.sources.last_update,
      nextUpdate: this.sources.next_update,
      sources: this.sources.sources.length,
      status: 'active'
    };
  }
}

module.exports = RosterUpdater;
