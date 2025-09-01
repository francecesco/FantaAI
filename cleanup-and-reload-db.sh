#!/bin/bash

echo "🧹 Pulizia completa del database FantaAI..."
echo "📊 Riscaricamento dati reali Serie A 2025/26 da Fantacalcio.it..."

# Avvia PostgreSQL se non è in esecuzione
if ! brew services list | grep -q "postgresql@15.*started"; then
    echo "📦 Avvio PostgreSQL..."
    brew services start postgresql@15
    sleep 3
fi

# Connetti al database e pulisci tutte le tabelle
echo "🗑️  Eliminazione di tutti i dati esistenti..."

psql -d fantaseriea -c "
-- Disabilita i foreign key constraints temporaneamente
SET session_replication_role = replica;

-- Elimina tutti i dati dalle tabelle
TRUNCATE TABLE user_teams CASCADE;
TRUNCATE TABLE transactions CASCADE;
TRUNCATE TABLE players CASCADE;
TRUNCATE TABLE matches CASCADE;
TRUNCATE TABLE sessions CASCADE;
-- NON eliminiamo gli utenti per mantenere gli account

-- Riabilita i foreign key constraints
SET session_replication_role = DEFAULT;
"

if [ $? -eq 0 ]; then
    echo "✅ Database pulito con successo!"
else
    echo "❌ Errore durante la pulizia del database"
    exit 1
fi

# Sincronizza lo schema del database
echo "🔄 Sincronizzazione schema database..."
npm run db:push

if [ $? -eq 0 ]; then
    echo "✅ Schema sincronizzato!"
else
    echo "❌ Errore durante la sincronizzazione dello schema"
    exit 1
fi

echo ""
echo "🎯 Prossimi passi:"
echo "1. Il database è stato completamente pulito"
echo "2. Ora devi aggiornare i file di dati per includere tutte le 20 squadre di Serie A"
echo "3. I file da aggiornare sono:"
echo "   - server/fantacalcio-real-api.ts"
echo "   - server/remaining-teams.ts" 
echo "   - server/final-teams.ts"
echo ""
echo "📋 Squadre Serie A 2025/26 da includere:"
echo "1. Inter"
echo "2. Napoli" 
echo "3. Juventus"
echo "4. Milan"
echo "5. Atalanta"
echo "6. Bologna"
echo "7. Fiorentina"
echo "8. Lazio"
echo "9. Roma"
echo "10. Torino"
echo "11. Genoa"
echo "12. Lecce"
echo "13. Sassuolo"
echo "14. Cagliari"
echo "15. Como"
echo "16. Cremonese"
echo "17. Parma"
echo "18. Pisa"
echo "19. Udinese"
echo "20. Verona"
echo ""
echo "🚀 Dopo aver aggiornato i file, riavvia l'applicazione con: ./start.sh"
