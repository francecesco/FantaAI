#!/bin/bash

echo "🔍 Analisi completa dei calciatori Serie A 2025/26"
echo "=================================================="

# Test 1: Verifica che l'API restituisca tutti i giocatori
echo "📊 Test 1: Verifica API giocatori..."
RESPONSE=$(curl -s http://localhost:3000/api/players)
PLAYER_COUNT=$(echo "$RESPONSE" | jq 'length' 2>/dev/null || echo "0")

if [ "$PLAYER_COUNT" -gt 0 ]; then
    echo "✅ API giocatori funzionante - Trovati $PLAYER_COUNT giocatori"
else
    echo "❌ Errore: API giocatori non funzionante"
    exit 1
fi

# Test 2: Analisi per squadra
echo ""
echo "🏟️  Test 2: Analisi per squadra..."
TEAMS=$(echo "$RESPONSE" | jq -r '.[].team' | sort | uniq -c | sort -nr)

echo "📈 Distribuzione giocatori per squadra:"
echo "$TEAMS"

# Test 3: Analisi per ruolo
echo ""
echo "⚽ Test 3: Analisi per ruolo..."
POSITIONS=$(echo "$RESPONSE" | jq -r '.[].position' | sort | uniq -c)

echo "📊 Distribuzione giocatori per ruolo:"
echo "$POSITIONS"

# Test 4: Verifica giocatori top
echo ""
echo "⭐ Test 4: Top 10 giocatori per prezzo..."
TOP_PLAYERS=$(echo "$RESPONSE" | jq -r '.[] | "\(.name) (\(.team)) - \(.price)M"' | sort -k3 -nr | head -10)

echo "💰 Top 10 giocatori più costosi:"
echo "$TOP_PLAYERS"

# Test 5: Verifica giocatori con gol
echo ""
echo "⚽ Test 5: Giocatori con gol segnati..."
GOAL_SCORERS=$(echo "$RESPONSE" | jq -r '.[] | select(.goals > 0) | "\(.name) (\(.team)) - \(.goals) gol"' | sort -k3 -nr)

echo "🎯 Giocatori con gol:"
echo "$GOAL_SCORERS"

# Test 6: Verifica giocatori con assist
echo ""
echo "🎯 Test 6: Giocatori con assist..."
ASSIST_LEADERS=$(echo "$RESPONSE" | jq -r '.[] | select(.assists > 0) | "\(.name) (\(.team)) - \(.assists) assist"' | sort -k3 -nr)

echo "🎯 Giocatori con assist:"
echo "$ASSIST_LEADERS"

# Test 7: Verifica completezza squadre
echo ""
echo "🔍 Test 7: Verifica completezza squadre..."
EXPECTED_TEAMS=("Inter" "Napoli" "Juventus" "Milan" "Atalanta" "Bologna" "Fiorentina" "Lazio" "Roma" "Sassuolo" "Como" "Cremonese" "Cagliari" "Udinese" "Parma" "Lecce" "Torino" "Verona" "Genoa" "Pisa")

echo "📋 Squadre attese vs trovate:"
for team in "${EXPECTED_TEAMS[@]}"; do
    COUNT=$(echo "$RESPONSE" | jq -r ".[] | select(.team == \"$team\") | .name" | wc -l)
    echo "  $team: $COUNT giocatori"
done

# Test 8: Verifica aggiornamento dati
echo ""
echo "📅 Test 8: Verifica aggiornamento dati..."
LATEST_MATCHES=$(echo "$RESPONSE" | jq -r '.[] | select(.matchesPlayed > 0) | "\(.name) (\(.team)) - \(.matchesPlayed) partite"' | sort -k3 -nr | head -10)

echo "🆕 Giocatori con partite giocate:"
echo "$LATEST_MATCHES"

echo ""
echo "🎉 Analisi completata!"
echo "📊 Riepilogo:"
echo "   - Totale giocatori: $PLAYER_COUNT"
echo "   - Squadre presenti: $(echo "$RESPONSE" | jq -r '.[].team' | sort | uniq | wc -l)"
echo "   - Giocatori con gol: $(echo "$RESPONSE" | jq -r '.[] | select(.goals > 0) | .name' | wc -l)"
echo "   - Giocatori con assist: $(echo "$RESPONSE" | jq -r '.[] | select(.assists > 0) | .name' | wc -l)"
echo ""
echo "💡 Per verificare manualmente:"
echo "   - Vai su: http://localhost:3000/market"
echo "   - Controlla i giocatori disponibili"
echo "   - Verifica le quotazioni e statistiche"
