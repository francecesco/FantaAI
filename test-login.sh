#!/bin/bash

echo "🧪 Test del sistema di login Google..."

# Test 1: Verifica che la pagina di login sia accessibile
echo "📄 Test 1: Verifica pagina di login..."
if curl -s http://localhost:3000/login > /dev/null; then
    echo "✅ Pagina di login accessibile"
else
    echo "❌ Errore: pagina di login non accessibile"
    exit 1
fi

# Test 2: Verifica che la landing page sia accessibile
echo "🏠 Test 2: Verifica landing page..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Landing page accessibile"
else
    echo "❌ Errore: landing page non accessibile"
    exit 1
fi

# Test 3: Verifica che l'API di login risponda
echo "🔐 Test 3: Verifica API di login..."
if curl -s -X POST http://localhost:3000/api/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@gmail.com"}' > /dev/null; then
    echo "✅ API di login risponde"
else
    echo "❌ Errore: API di login non risponde"
    exit 1
fi

# Test 4: Verifica che la dashboard sia accessibile (dopo login)
echo "📊 Test 4: Verifica dashboard..."
if curl -s http://localhost:3000/dashboard > /dev/null; then
    echo "✅ Dashboard accessibile"
else
    echo "❌ Errore: dashboard non accessibile"
    exit 1
fi

echo ""
echo "🎉 Tutti i test sono passati!"
echo "🌐 Ora puoi testare manualmente:"
echo "   - Homepage: http://localhost:3000"
echo "   - Login: http://localhost:3000/login"
echo "   - Dashboard: http://localhost:3000/dashboard"
echo ""
echo "💡 Prova a inserire una email Google (es: tuo@gmail.com) nella pagina di login"
