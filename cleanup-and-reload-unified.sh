#!/bin/bash

echo "🧹 PULIZIA DATABASE E RICARICAMENTO DATI UNIFICATI"
echo "=================================================="
echo ""

# Controlla se PostgreSQL è in esecuzione
if ! brew services list | grep -q "postgresql@15.*started"; then
    echo "📦 Avvio PostgreSQL..."
    brew services start postgresql@15
    sleep 3
fi

echo "✅ PostgreSQL in esecuzione"
echo ""

# Ferma il server se è in esecuzione
if ps aux | grep -q "tsx server/index.ts" | grep -v grep; then
    echo "🛑 Fermando il server..."
    pkill -f "tsx server/index.ts"
    sleep 2
fi

echo "🗑️  Pulizia database..."
psql -d fantaseriea -c "
SET session_replication_role = replica;
TRUNCATE TABLE user_teams CASCADE;
TRUNCATE TABLE transactions CASCADE;
TRUNCATE TABLE players CASCADE;
TRUNCATE TABLE matches CASCADE;
SET session_replication_role = DEFAULT;
"

if [ $? -eq 0 ]; then
    echo "✅ Database pulito con successo!"
else
    echo "❌ Errore durante la pulizia del database"
    exit 1
fi

echo ""
echo "🔄 Sincronizzazione schema database..."
npm run db:push

if [ $? -eq 0 ]; then
    echo "✅ Schema sincronizzato!"
else
    echo "❌ Errore durante la sincronizzazione dello schema"
    exit 1
fi

echo ""
echo "🚀 Avvio server con dati unificati..."
./start.sh

echo ""
echo "⏳ Attendo che il server si avvii..."
sleep 5

echo ""
echo "🔍 Verifica caricamento dati unificati..."
TOTAL_PLAYERS=$(curl -s http://localhost:3000/api/players | jq '. | length' 2>/dev/null || echo "0")

if [ "$TOTAL_PLAYERS" -gt 0 ]; then
    echo "✅ Dati unificati caricati con successo!"
    echo "🎯 Totale giocatori: $TOTAL_PLAYERS"
else
    echo "❌ Errore nel caricamento dei dati"
    exit 1
fi

echo ""
echo "📊 STATISTICHE FINALI:"
PORTIERI=$(curl -s "http://localhost:3000/api/players?position=P" | jq '. | length' 2>/dev/null || echo "0")
DIFENSORI=$(curl -s "http://localhost:3000/api/players?position=D" | jq '. | length' 2>/dev/null || echo "0")
CENTROCAMPISTI=$(curl -s "http://localhost:3000/api/players?position=C" | jq '. | length' 2>/dev/null || echo "0")
ATTACCANTI=$(curl -s "http://localhost:3000/api/players?position=A" | jq '. | length' 2>/dev/null || echo "0")

echo "🥅 Portieri: $PORTIERI"
echo "🛡️  Difensori: $DIFENSORI"
echo "⚽ Centrocampisti: $CENTROCAMPISTI"
echo "🎯 Attaccanti: $ATTACCANTI"

echo ""
echo "🏆 Squadre incluse:"
curl -s http://localhost:3000/api/players | jq -r '.[].team' | sort | uniq 2>/dev/null || echo "Errore nel recupero delle squadre"

echo ""
echo "🎯 PULIZIA COMPLETATA CON SUCCESSO!"
echo "✅ Database pulito"
echo "✅ Dati unificati caricati"
echo "✅ Server riavviato"
echo "✅ $TOTAL_PLAYERS giocatori disponibili"
echo ""
echo "🌐 Accesso all'applicazione: http://localhost:3000"
echo ""
echo "📝 File eliminati:"
echo "   - complete-serie-a-rosters-2025.ts"
echo "   - remaining-serie-a-teams-2025.ts"
echo "   - final-serie-a-teams-2025.ts"
echo "   - updated-serie-a-2025.ts"
echo "   - remaining-serie-a-data.ts"
echo "   - complete-serie-a-data.ts"
echo "   - final-teams.ts"
echo "   - remaining-teams.ts"
echo "   - unified-serie-a-players-2025.ts"
echo "   - Script obsoleti nella root"
echo ""
echo "📁 File attivi:"
echo "   - all-serie-a-players-2025.ts (database principale)"
echo "   - attaccanti-serie-a-2025.ts (attaccanti + funzioni)"
echo "   - fantacalcio-real-api.ts (servizio API aggiornato)"
echo "   - DATABASE_UNIFICATO_README.md (documentazione)"
echo "   - verify-unified-database.sh (script di verifica)"
