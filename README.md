# FantaSerieA 🏆

Un'applicazione di fantacalcio per la Serie A con React, TypeScript, Express e PostgreSQL.

## 🚀 Avvio Rapido

### Prerequisiti
- Node.js 18+
- PostgreSQL 15+
- npm

### Installazione
```bash
# Clona il repository
git clone <repository-url>
cd FantaSerieA

# Installa le dipendenze
npm install

# Crea il database
createdb fantaseriea

# Inizializza il database
npm run db:push
```

### Avvio dell'Applicazione

#### Opzione 1: Script Automatico (Raccomandato)
```bash
./start.sh
```

#### Opzione 2: Manuale
```bash
# Assicurati che PostgreSQL sia in esecuzione
brew services start postgresql@15

# Avvia l'applicazione
npm run dev
```

#### Opzione 3: Con Variabili d'Ambiente
```bash
export DATABASE_URL="postgresql://localhost:5432/fantaseriea"
export PORT=3000
export NODE_ENV=development
export SESSION_SECRET="your-super-secret-session-key-change-this-in-production"
npm run dev
```

### Fermare l'Applicazione
```bash
./stop.sh
```

## 🌐 Accesso
L'applicazione sarà disponibile su: **http://localhost:3000** (o la porta successiva disponibile)

## 📁 Struttura del Progetto
```
FantaSerieA/
├── client/          # Frontend React + TypeScript
├── server/          # Backend Express + TypeScript
├── shared/          # Schema database condiviso
├── start.sh         # Script di avvio automatico
├── stop.sh          # Script di stop
└── .env             # Variabili d'ambiente
```

## 🛠️ Comandi Utili
```bash
npm run dev          # Avvia in modalità sviluppo
npm run build        # Build per produzione
npm run start        # Avvia in produzione
npm run db:push      # Sincronizza schema database
npm run check        # Controllo TypeScript
```

## 🔧 Risoluzione Problemi

### Porta già in uso
Lo script `start.sh` trova automaticamente una porta disponibile.

### Database non trovato
```bash
createdb fantaseriea
npm run db:push
```

### PostgreSQL non in esecuzione
```bash
brew services start postgresql@15
```

## 📝 Note
- L'applicazione carica automaticamente 155 giocatori e 60 partite dalla Serie A 2025/26
- Le variabili d'ambiente sono configurate nel file `.env`
- L'autenticazione è gestita tramite email Google (Gmail, Google Mail, etc.)
