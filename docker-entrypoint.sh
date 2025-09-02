#!/bin/bash

# Script di avvio per Docker
set -e

echo "🚀 Avvio FantaAI in modalità Docker..."

# Funzione per attendere che PostgreSQL sia disponibile
wait_for_postgres() {
    echo "⏳ Attendo che PostgreSQL sia disponibile..."
    until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER; do
        echo "PostgreSQL non è ancora disponibile, attendo..."
        sleep 2
    done
    echo "✅ PostgreSQL è disponibile!"
}

# Funzione per inizializzare il database
init_database() {
    echo "🗄️  Inizializzazione database..."
    
    # Crea il database se non esiste
    createdb -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER $POSTGRES_DB 2>/dev/null || echo "Database già esistente"
    
    # Sincronizza lo schema
    echo "🔄 Sincronizzazione schema database..."
    timeout 30s npm run db:push || echo "⚠️  Timeout durante db:push, continuo..."
    
    # Verifica se ci sono giocatori nel database
    PLAYER_COUNT=$(psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB -t -c "SELECT COUNT(*) FROM players;" 2>/dev/null | tr -d ' ')
    
    if [ "$PLAYER_COUNT" = "0" ] || [ -z "$PLAYER_COUNT" ]; then
        echo "📊 Caricamento dati giocatori..."
        # Avvia il server temporaneamente per caricare i dati
        timeout 30s npm run dev > /dev/null 2>&1 || true
        echo "✅ Dati giocatori caricati!"
    else
        echo "✅ Database già popolato con $PLAYER_COUNT giocatori"
    fi
}

# Funzione per avviare il server
start_server() {
    echo "🌐 Avvio server FantaAI..."
    
    # Avvia il server in background
    npm run dev &
    SERVER_PID=$!
    
    # Attendi che il server sia pronto
    echo "⏳ Attendo che il server sia pronto..."
    until curl -s http://localhost:5001/api/health > /dev/null 2>&1; do
        echo "Server non è ancora pronto, attendo..."
        sleep 2
    done
    
    echo "✅ Server FantaAI avviato su http://localhost:3000"
    echo "📊 Statistiche database:"
    
    # Mostra statistiche del database
    TOTAL_PLAYERS=$(curl -s http://localhost:5001/api/players | jq '. | length' 2>/dev/null || echo "0")
    PORTIERI=$(curl -s "http://localhost:5001/api/players?position=P" | jq '. | length' 2>/dev/null || echo "0")
    DIFENSORI=$(curl -s "http://localhost:5001/api/players?position=D" | jq '. | length' 2>/dev/null || echo "0")
    CENTROCAMPISTI=$(curl -s "http://localhost:5001/api/players?position=C" | jq '. | length' 2>/dev/null || echo "0")
    ATTACCANTI=$(curl -s "http://localhost:5001/api/players?position=A" | jq '. | length' 2>/dev/null || echo "0")
    
    echo "🎯 Totale giocatori: $TOTAL_PLAYERS"
    echo "🥅 Portieri: $PORTIERI"
    echo "🛡️  Difensori: $DIFENSORI"
    echo "⚽ Centrocampisti: $CENTROCAMPISTI"
    echo "🎯 Attaccanti: $ATTACCANTI"
    
    # Mantieni il server in esecuzione
    wait $SERVER_PID
}

# Gestione dei segnali per shutdown pulito
trap 'echo "🛑 Arresto server..."; kill $SERVER_PID 2>/dev/null; exit 0' SIGTERM SIGINT

# Controlla le variabili d'ambiente
if [ -z "$POSTGRES_HOST" ]; then
    export POSTGRES_HOST="postgres"
fi

if [ -z "$POSTGRES_PORT" ]; then
    export POSTGRES_PORT="5432"
fi

if [ -z "$POSTGRES_USER" ]; then
    export POSTGRES_USER="postgres"
fi

if [ -z "$POSTGRES_DB" ]; then
    export POSTGRES_DB="fantaseriea"
fi

if [ -z "$POSTGRES_PASSWORD" ]; then
    export POSTGRES_PASSWORD="postgres"
fi

# Imposta le variabili d'ambiente per il database
export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"

echo "🔧 Configurazione:"
echo "   Host: $POSTGRES_HOST"
echo "   Porta: $POSTGRES_PORT"
echo "   Database: $POSTGRES_DB"
echo "   Utente: $POSTGRES_USER"
echo "   DATABASE_URL: $DATABASE_URL"

# Attendi PostgreSQL
wait_for_postgres

# Avvia il server direttamente (l'inizializzazione avverrà automaticamente)
start_server
