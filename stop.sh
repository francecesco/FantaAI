#!/bin/bash

# Script per fermare FantaSerieA

echo "🛑 Fermo FantaSerieA..."

# Trova e termina il processo tsx
PIDS=$(ps aux | grep "tsx server/index.ts" | grep -v grep | awk '{print $2}')

if [ -z "$PIDS" ]; then
    echo "ℹ️  Nessun processo FantaSerieA trovato in esecuzione"
else
    echo "🔍 Trovati processi: $PIDS"
    for PID in $PIDS; do
        echo "💀 Termino processo $PID..."
        kill $PID
    done
    echo "✅ Processi terminati"
fi

# Opzionale: ferma anche PostgreSQL se non serve più
read -p "Vuoi fermare anche PostgreSQL? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Fermo PostgreSQL..."
    brew services stop postgresql@15
    echo "✅ PostgreSQL fermato"
fi

echo "🎉 FantaSerieA fermato completamente"
