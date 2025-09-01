# 🐳 FantaAI Docker

Containerizzazione completa di FantaAI per CasaOS e sistemi Docker.

## 🚀 Quick Start

```bash
# 1. Clona il repository
git clone https://github.com/francecesco/FantaAI.git
cd FantaAI

# 2. Genera certificati SSL
./generate-ssl.sh

# 3. Avvia l'applicazione
./docker-manager.sh start

# 4. Accedi all'applicazione
# HTTP:  http://localhost
# HTTPS: https://localhost
```

## 📋 File Docker

- `Dockerfile` - Immagine dell'applicazione
- `docker-compose.yml` - Orchestrazione servizi
- `docker-entrypoint.sh` - Script di avvio
- `docker-manager.sh` - Gestione completa
- `nginx.conf` - Reverse proxy con SSL
- `generate-ssl.sh` - Generazione certificati
- `casaos-config.json` - Configurazione CasaOS

## 🏗️ Architettura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx (SSL)   │───▶│   FantaAI App   │───▶│   PostgreSQL    │
│   Porta 80/443  │    │   Porta 3000    │    │   Porta 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Comandi Utili

```bash
# Gestione base
./docker-manager.sh start      # Avvia
./docker-manager.sh stop       # Ferma
./docker-manager.sh restart    # Riavvia

# Monitoraggio
./docker-manager.sh status     # Stato container
./docker-manager.sh logs       # Log in tempo reale

# Manutenzione
./docker-manager.sh backup     # Backup database
./docker-manager.sh update     # Aggiorna applicazione
./docker-manager.sh clean      # Pulizia completa
```

## 🏠 CasaOS

### Installazione automatica
1. Apri CasaOS
2. Vai su "App Store"
3. Clicca "Import App"
4. Carica `casaos-config.json`

### Configurazione manuale
```bash
# Copia file in CasaOS
cp -r . /path/to/casaos/apps/fantai/

# Avvia
docker-compose up -d
```

## 📊 Statistiche

- **278 giocatori** Serie A 2025/26
- **12 squadre** complete
- **Database unificato** senza duplicati
- **SSL/TLS** con certificati
- **Rate limiting** per sicurezza
- **Health checks** automatici

## 🔐 Sicurezza

- Certificati SSL self-signed
- Rate limiting API
- Security headers
- HSTS abilitato
- Backup automatici

## 📈 Performance

- **CPU**: 1 core minimo
- **RAM**: 512MB minimo
- **Storage**: 1GB minimo
- **Porte**: 80, 443, 3000

## 🐛 Troubleshooting

```bash
# Porte occupate
netstat -tulpn | grep :80

# Database non raggiungibile
./docker-manager.sh logs postgres

# Certificati SSL
./docker-manager.sh ssl

# Permessi file
chmod +x *.sh
```

## 📝 Note

- Ottimizzato per CasaOS
- Funziona su qualsiasi sistema Docker
- Database inizializzato automaticamente
- Backup nella directory corrente
- Log persistenti

## 🔗 Link

- [Guida Completa](DOCKER_GUIDE.md)
- [Repository](https://github.com/francecesco/FantaAI)
- [CasaOS](https://casaos.io/)
