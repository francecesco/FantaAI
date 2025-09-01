#!/bin/bash

echo "🔄 Aggiornamento Database Calciatori Serie A 2025/26"
echo "====================================================="

# Verifica che l'applicazione sia in esecuzione
if ! curl -s http://localhost:3000/api/players > /dev/null; then
    echo "❌ Errore: L'applicazione non è in esecuzione"
    echo "💡 Avvia prima l'applicazione con: ./start.sh"
    exit 1
fi

echo "✅ Applicazione in esecuzione"

# Backup dei dati attuali
echo "📦 Backup dati attuali..."
CURRENT_DATA=$(curl -s http://localhost:3000/api/players)
echo "$CURRENT_DATA" > backup-players-$(date +%Y%m%d-%H%M%S).json
echo "✅ Backup salvato"

echo ""
echo "🔄 Prossimi passi per l'aggiornamento:"
echo "1. 📊 Analisi dati attuali completata"
echo "2. 🔍 Identificazione squadre da espandere"
echo "3. 📈 Aggiornamento con dati Fantacalcio.it"
echo ""
echo "📋 Squadre da espandere:"
echo "   - Torino (4 → 15+ giocatori)"
echo "   - Sassuolo (4 → 15+ giocatori)"
echo "   - Verona (3 → 15+ giocatori)"
echo "   - Parma (3 → 15+ giocatori)"
echo "   - Genoa (2 → 15+ giocatori)"
echo "   - Pisa (1 → 15+ giocatori)"
echo "   - Lecce (1 → 15+ giocatori)"
echo ""
echo "🎯 Obiettivo: 400+ giocatori totali"
echo ""
echo "💡 Per procedere con l'aggiornamento:"
echo "   1. Modifica il file server/football-api.ts"
echo "   2. Aggiungi i giocatori mancanti"
echo "   3. Riavvia l'applicazione"
echo "   4. Esegui questo script per verificare"
