# Script per generare certificati SSL self-signed
#!/bin/bash

echo "🔐 Generazione certificati SSL per FantaAI..."

# Crea directory SSL se non esiste
mkdir -p ssl

# Genera certificato self-signed
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/key.pem \
    -out ssl/cert.pem \
    -subj "/C=IT/ST=Italy/L=Rome/O=FantaAI/OU=Development/CN=localhost"

echo "✅ Certificati SSL generati:"
echo "   - ssl/cert.pem (certificato)"
echo "   - ssl/key.pem (chiave privata)"

# Imposta permessi corretti
chmod 600 ssl/key.pem
chmod 644 ssl/cert.pem

echo ""
echo "📝 Note:"
echo "   - I certificati sono self-signed per sviluppo"
echo "   - Per produzione, usa certificati Let's Encrypt"
echo "   - Il browser mostrerà un avviso di sicurezza"
echo "   - Clicca 'Avanzate' -> 'Procedi su localhost'"
