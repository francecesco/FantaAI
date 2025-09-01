#!/bin/bash

# Script per avviare FantaSerieA automaticamente

echo "🚀 Avvio FantaSerieA..."

# Controlla se PostgreSQL è in esecuzione
if ! brew services list | grep -q "postgresql@15.*started"; then
    echo "📦 Avvio PostgreSQL..."
    brew services start postgresql@15
    sleep 3
fi

# Trova una porta disponibile
PORT=3000
while lsof -i :$PORT > /dev/null 2>&1; do
    echo "⚠️  Porta $PORT già in uso, provo la successiva..."
    PORT=$((PORT + 1))
done

echo "✅ Usando porta $PORT"

# Esporta le variabili d'ambiente
export DATABASE_URL="postgresql://localhost:5432/fantaseriea"
export PORT=$PORT
export NODE_ENV=development
export SESSION_SECRET="your-super-secret-session-key-change-this-in-production"

echo "⚙️  Variabili d'ambiente configurate"
echo "🌐 L'applicazione sarà disponibile su: http://localhost:$PORT"
echo ""

# Avvia l'applicazione
npm run dev
