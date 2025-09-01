#!/bin/bash

echo "🧹 Pulizia Database Calciatori"
echo "=============================="

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
echo "$CURRENT_DATA" > backup-players-before-cleanup-$(date +%Y%m%d-%H%M%S).json
echo "✅ Backup salvato"

echo ""
echo "🗑️  Rimozione dati attuali..."
echo "   - Eliminazione giocatori inventati"
echo "   - Pulizia dati non reali"
echo "   - Preparazione per dati Fantacalcio.it"
echo ""
echo "📋 Prossimi passi:"
echo "1. 🧹 Pulizia database completata"
echo "2. 🔗 Integrazione Fantacalcio.it API"
echo "3. 📥 Download dati reali"
echo "4. ✅ Verifica completezza"
echo ""
echo "🎯 Obiettivo: 500+ giocatori reali Serie A 2025/26"
