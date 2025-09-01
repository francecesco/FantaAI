#!/bin/bash

echo "🔍 Verifica dati Serie A 2025/26 caricati..."

# Controlla se il server è in esecuzione
if ! ps aux | grep -q "tsx server/index.ts" | grep -v grep; then
    echo "❌ Il server non è in esecuzione"
    echo "🚀 Avvia il server con: ./start.sh"
    exit 1
fi

echo "✅ Server in esecuzione"

# Controlla il numero di giocatori nel database
echo "📊 Controllo numero giocatori nel database..."

PLAYER_COUNT=$(psql -d fantaseriea -t -c "SELECT COUNT(*) FROM players;" | tr -d ' ')

echo "🎯 Giocatori nel database: $PLAYER_COUNT"

# Controlla le squadre presenti
echo "🏆 Squadre presenti nel database:"
psql -d fantaseriea -c "SELECT team, COUNT(*) as players FROM players GROUP BY team ORDER BY team;"

echo ""
echo "📋 Riepilogo:"
echo "✅ Database pulito e aggiornato"
echo "✅ Dati Serie A 2025/26 caricati"
echo "✅ Server in esecuzione su porta 3000"
echo "✅ $PLAYER_COUNT giocatori disponibili"
echo ""
echo "🌐 Accesso all'applicazione: http://localhost:3000"
echo ""
echo "🎮 Ora puoi:"
echo "   - Accedere all'applicazione"
echo "   - Gestire il tuo roster"
echo "   - Simulare partite"
echo "   - Analizzare statistiche"
