#!/bin/bash

echo "⏰ Configurazione aggiornamento automatico settimanale..."

# Crea il cron job per l'aggiornamento settimanale (ogni domenica alle 6:00)
(crontab -l 2>/dev/null; echo "0 6 * * 0 cd /Users/francesconegretti/Development/FantaAI && ./server/auto-update-rosters.js") | crontab -

echo "✅ Cron job configurato per aggiornamento settimanale"
echo "📅 Aggiornamento programmato: ogni domenica alle 6:00"
echo ""
echo "🔧 Comandi utili:"
echo "   - Controlla cron jobs: crontab -l"
echo "   - Rimuovi cron jobs: crontab -r"
echo "   - Aggiornamento manuale: node server/auto-update-rosters.js"
