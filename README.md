# FantaAI 🏆

Un'applicazione di fantacalcio per la Serie A con React, TypeScript, Express e PostgreSQL.

## 🚀 Avvio Rapido

### Opzione 1: Docker (Raccomandato per CasaOS) 🐳

#### Installazione su CasaOS
```bash
# Clona il repository
git clone https://github.com/francecesco/FantaAI.git
cd FantaAI

# Importa in CasaOS usando il file ottimizzato
# File: docker-compose-casaos.yml
# Vai su CasaOS → App Store → Import App → Docker Compose
```

#### Installazione Locale con Docker
```bash
# Clona il repository
git clone https://github.com/francecesco/FantaAI.git
cd FantaAI

# Configura l'API Key di Gemini (opzionale)
cp env.example .env
# Modifica .env e aggiungi la tua GEMINI_API_KEY

# Genera certificati SSL
./generate-ssl.sh

# Avvia con Docker
./docker-manager.sh start

# Accedi all'applicazione
# HTTP:  http://localhost
# HTTPS: https://localhost
```

### 🤖 Configurazione AI (Gemini)
Per abilitare i consigli AI avanzati:

1. **Ottieni una API Key da Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Configura la variabile d'ambiente**:
   ```bash
   export GEMINI_API_KEY=your-api-key-here
   ```
3. **Riavvia l'applicazione**

### ⚽ Configurazione Dati Reali
Per utilizzare dati reali della Serie A 2025/26:

1. **Football-Data.org (OBBLIGATORIO)**:
   - Ottieni API Key: https://www.football-data.org/
   - Configura: `FOOTBALL_DATA_API_KEY=your-key-here`

2. **API-Football (OPZIONALE per statistiche dettagliate)**:
   - Ottieni API Key: https://rapidapi.com/api-sports/api/api-football
   - Configura: `API_FOOTBALL_KEY=your-key-here`

### 🚀 Funzionalità Avanzate
- **Cache Persistente**: Dati sempre pronti, refresh automatico ogni notte a mezzanotte
- **Prezzo Personalizzato**: Acquisto giocatori con prezzo custom durante aste
- **Calendario Completo**: 380 partite Serie A 2025/26 con punteggi reali
- **Statistiche Reali**: 641 giocatori con statistiche aggiornate

> **Nota**: Senza API Key, l'applicazione userà algoritmi tradizionali per le raccomandazioni.

### ⚽ Configurazione Dati Calcio

#### Football-Data.org (OBBLIGATORIA)
Per utilizzare dati reali dei giocatori Serie A 2025/26:

1. **Registrati su Football-Data.org**: https://www.football-data.org/
2. **Ottieni la chiave API gratuita** (10 richieste/minuto, 100 richieste/giorno)
3. **Configura la variabile d'ambiente**:
   ```bash
   export FOOTBALL_DATA_API_KEY=your-football-data-api-key-here
   ```

#### API-Football (OPZIONALE - per statistiche dettagliate)
Per statistiche reali (gol, assist, partite giocate):

1. **Registrati su API-Football**: https://www.api-football.com/
2. **Ottieni la chiave API gratuita** (100 richieste/giorno)
3. **Configura la variabile d'ambiente**:
   ```bash
   export API_FOOTBALL_KEY=your-api-football-key-here
   ```

> **⚠️ IMPORTANTE**: Senza FOOTBALL_DATA_API_KEY, l'applicazione non funzionerà. API_FOOTBALL_KEY è opzionale ma migliora significativamente la qualità delle statistiche.

### Opzione 2: Installazione Locale

#### Prerequisiti
- Node.js 18+
- PostgreSQL 15+
- npm

#### Installazione
```bash
# Clona il repository
git clone https://github.com/francecesco/FantaAI.git
cd FantaAI

# Installa le dipendenze
npm install

# Crea il database
createdb fantaseriea

# Inizializza il database
npm run db:push
```

#### Avvio dell'Applicazione

##### Script Automatico (Raccomandato)
```bash
./start.sh
```

##### Manuale
```bash
# Assicurati che PostgreSQL sia in esecuzione
brew services start postgresql@15

# Avvia l'applicazione
npm run dev
```

##### Con Variabili d'Ambiente
```bash
export DATABASE_URL="postgresql://localhost:5432/fantaseriea"
export PORT=3000
export NODE_ENV=development
export SESSION_SECRET="your-super-secret-session-key-change-this-in-production"
npm run dev
```

### Fermare l'Applicazione

#### Docker
```bash
./docker-manager.sh stop
```

#### Locale
```bash
./stop.sh
```

## 🏠 CasaOS Deployment

### Installazione Automatica
1. Apri CasaOS
2. Vai su "App Store"
3. Clicca "Import App"
4. Carica `casaos-config.json`

### Installazione Manuale
```bash
# Copia file in CasaOS
cp -r . /path/to/casaos/apps/fantai/

# Avvia
docker-compose up -d
```

## 🌐 Accesso

### Docker/CasaOS
- **HTTP**: http://localhost
- **HTTPS**: https://localhost
- **API**: https://localhost/api

### Locale
- **Applicazione**: http://localhost:3000 (o porta successiva disponibile)

## 📊 Database Unificato

### Statistiche
- **278 giocatori** Serie A 2025/26
- **12 squadre** complete
- **Database unificato** senza duplicati
- **Organizzazione per ruolo**: P (33), D (89), C (67), A (89)

### Squadre incluse
- Atalanta, Bologna, Cagliari, Como, Cremonese, Fiorentina
- Genoa, Inter, Juventus, Lazio, Lecce, Milan
- Napoli, Parma, Pisa, Roma, Sassuolo, Torino, Udinese, Verona

## 📁 Struttura del Progetto
```
FantaAI/
├── client/              # Frontend React + TypeScript
├── server/              # Backend Express + TypeScript
├── shared/              # Schema database condiviso
├── Dockerfile           # Immagine Docker
├── docker-compose.yml   # Orchestrazione servizi
├── docker-manager.sh    # Gestione Docker
├── casaos-config.json   # Configurazione CasaOS
├── start.sh             # Script di avvio locale
├── stop.sh              # Script di stop locale
└── .env                 # Variabili d'ambiente
```

## 🛠️ Comandi Utili

### Docker
```bash
./docker-manager.sh start      # Avvia
./docker-manager.sh stop       # Ferma
./docker-manager.sh restart    # Riavvia
./docker-manager.sh status     # Stato
./docker-manager.sh logs       # Log
./docker-manager.sh backup     # Backup database
./docker-manager.sh restore    # Ripristina database
./docker-manager.sh update     # Aggiorna
./docker-manager.sh clean      # Pulizia completa
```

### Locale
```bash
npm run dev          # Avvia in modalità sviluppo
npm run build        # Build per produzione
npm run start        # Avvia in produzione
npm run db:push      # Sincronizza schema database
npm run check        # Controllo TypeScript
```

## 🏗️ Architettura

### Docker (CasaOS)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx (SSL)   │───▶│   FantaAI App   │───▶│   PostgreSQL    │
│   Porta 80/443  │    │   Porta 3000    │    │   Porta 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Locale
```
┌─────────────────┐    ┌─────────────────┐
│   FantaAI App   │───▶│   PostgreSQL    │
│   Porta 3000    │    │   Porta 5432    │
└─────────────────┘    └─────────────────┘
```

## 🔐 Sicurezza

### Docker
- **SSL/TLS** con certificati self-signed
- **Rate limiting** (10 req/s API, 5 req/min login)
- **Security headers** configurati
- **HSTS** abilitato
- **Health checks** automatici

### Locale
- **Autenticazione** tramite email Google
- **Session management** sicuro
- **CORS** configurato

## 📈 Performance

### Risorse consigliate
- **CPU**: 1 core minimo, 2 core consigliato
- **RAM**: 512MB minimo, 1GB consigliato
- **Storage**: 1GB minimo per database

### Ottimizzazioni
- **Gzip** compressione
- **Proxy cache** configurato
- **Connection pooling** database
- **Health checks** automatici

## 🏠 Installazione su CasaOS

### Metodo Rapido
1. **Clona il repository** su CasaOS
2. **Apri CasaOS** → **App Store** → **Import App**
3. **Seleziona "Docker Compose"** e carica `docker-compose-casaos.yml`
4. **Configura le variabili** d'ambiente (già preimpostate)
5. **Avvia l'installazione**

### File di Configurazione
- **`docker-compose-casaos.yml`**: Versione ottimizzata per CasaOS
- **`CASAOS_INSTALLATION.md`**: Guida dettagliata per CasaOS
- **`casaos-app-config.json`**: Configurazione JSON per CasaOS

### Accesso dopo Installazione
- **URL**: `http://[IP_CASAOS]:3000`
- **API Health**: `http://[IP_CASAOS]:3000/api/health`

## 🔧 Risoluzione Problemi

### CasaOS
```bash
# Controlla stato container
docker ps

# Log applicazione
docker logs fantai-app -f

# Log database
docker logs fantai-postgres -f

# Reset completo
docker-compose -f docker-compose-casaos.yml down -v
docker-compose -f docker-compose-casaos.yml up -d
```

### Docker
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

### Locale
```bash
# Porta già in uso
# Lo script start.sh trova automaticamente una porta disponibile

# Database non trovato
createdb fantaseriea
npm run db:push

# PostgreSQL non in esecuzione
brew services start postgresql@15
```

## 📝 Note

### Database
- **278 giocatori** caricati automaticamente dalla Serie A 2025/26
- **Database unificato** senza duplicati
- **Organizzazione per ruolo** (Portieri, Difensori, Centrocampisti, Attaccanti)
- **Dati aggiornati** al mercato estivo 2025

### Autenticazione
- **Email Google** (Gmail, Google Mail, etc.)
- **Session persistenti** (non scadono)
- **Redirect automatico** al dashboard dopo login

### Deployment
- **Ottimizzato per CasaOS** ma funziona ovunque
- **Docker Hub** ready (immagine pubblica disponibile)
- **Backup automatici** del database
- **Log persistenti** per debugging

## 🔗 Link Utili

- [Guida Docker Completa](DOCKER_GUIDE.md)
- [README Docker](README_DOCKER.md)
- [Documentazione Database](server/DATABASE_UNIFICATO_README.md)
- [Repository GitHub](https://github.com/francecesco/FantaAI)
- [CasaOS](https://casaos.io/)
