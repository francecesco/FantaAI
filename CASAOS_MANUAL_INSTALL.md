# 🏠 Installazione FantaAI su CasaOS

## 🎯 SOLUZIONE: Clonare il Progetto su CasaOS

**PROBLEMA IDENTIFICATO**: CasaOS ha bisogno del codice sorgente per fare il build!

## 📋 Prerequisiti

1. **CasaOS** installato e funzionante
2. **Accesso SSH** o **Terminal** su CasaOS
3. **API Keys** configurate:
   - `FOOTBALL_DATA_API_KEY` (obbligatoria)
   - `GEMINI_API_KEY` (obbligatoria)
   - `API_FOOTBALL_KEY` (opzionale)

## 🚀 Installazione Corretta

### Passo 1: Clonare il Progetto su CasaOS

```bash
# Vai nella directory AppData di CasaOS
cd /DATA/AppData/

# Clona il repository
git clone https://github.com/francecesco/FantaAI.git

# Entra nella directory
cd FantaAI
```

### Passo 2: Usare Docker Compose con Build

1. **Vai su CasaOS** → **App Store** → **Import App**
2. **Seleziona "Docker Compose"**
3. **Usa il file**: `docker-compose-casaos-clone.yml`
4. **Configura le variabili d'ambiente** (vedi `casaos-env.txt`)

## 📋 Prerequisiti

1. **CasaOS** installato e funzionante
2. **API Keys** configurate:
   - `FOOTBALL_DATA_API_KEY` (obbligatoria)
   - `GEMINI_API_KEY` (obbligatoria)
   - `API_FOOTBALL_KEY` (opzionale)

## 🔧 Installazione Manuale

### Passo 1: Creare Database PostgreSQL

1. **Vai su CasaOS** → **App Store** → **Search** → **PostgreSQL**
2. **Installa PostgreSQL 15**
3. **Configura**:
   - **Port**: `5432`
   - **Database**: `fantaseriea`
   - **Username**: `postgres`
   - **Password**: `postgres`

### Passo 2: Creare Applicazione FantaAI

1. **Vai su CasaOS** → **App Store** → **Custom App**
2. **Clicca "Create"**
3. **Configura**:

```yaml
App Name: FantaAI
Icon: https://raw.githubusercontent.com/francecesco/FantaAI/main/assets/icon.png
Description: Fantacalcio AI - Gestione squadre Serie A 2025/26

Docker Image: fantaai-fantai:latest
# Oppure usa build da source:
# Build Context: [path to FantaAI folder]

Ports:
  - 3002:5001

Environment Variables:
  POSTGRES_HOST: postgres
  POSTGRES_PORT: 5432
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres
  POSTGRES_DB: fantaseriea
  DATABASE_URL: postgresql://postgres:postgres@postgres:5432/fantaseriea
  SESSION_SECRET: your-super-secret-session-key-change-this-in-production
  NODE_ENV: production
  FOOTBALL_DATA_API_KEY: [your-api-key]
  API_FOOTBALL_KEY: [your-api-key]
  GEMINI_API_KEY: [your-api-key]

Volumes:
  - postgres_data:/var/lib/postgresql/data

Restart Policy: unless-stopped
```

### Passo 3: Configurare Dipendenze

1. **Assicurati** che PostgreSQL sia avviato prima di FantaAI
2. **Configura** la dipendenza nel Custom App:
   - **Depends On**: `postgres`

## 🎯 Alternative: Docker Compose Files

Se preferisci provare i Docker Compose, usa questi file in ordine di semplicità:

### 1. Ultra Semplice (Raccomandato)
```bash
File: docker-compose-casaos-ultra-simple.yml
Porta: 3002
```

### 2. Build Diretto
```bash
File: docker-compose-casaos-build.yml
Porta: 3002
```

### 3. Immagine Pre-costruita
```bash
File: docker-compose-casaos-final.yml
Porta: 3002
```

## 🔍 Debug Schermata Bianca

### Controlla i Log
```bash
# Su CasaOS, vai su FantaAI → Logs
# Oppure via terminale:
docker logs fantai-app
```

### Controlla le Porte
```bash
# Verifica che la porta 3002 sia libera
netstat -tulpn | grep 3002
```

### Controlla i Container
```bash
# Verifica che i container siano in esecuzione
docker ps | grep fantai
```

## 🚀 Accesso all'Applicazione

Dopo l'installazione:
- **URL**: `http://[IP-CASAOS]:3002`
- **Esempio**: `http://192.168.1.100:3002`

## 📞 Supporto

Se continui ad avere problemi:
1. **Controlla i log** di CasaOS
2. **Verifica** che le API Keys siano configurate
3. **Prova** l'installazione manuale
4. **Usa** la porta 3002 invece di 3000

## ✅ Vantaggi Installazione Manuale

- ✅ **Controllo completo** della configurazione
- ✅ **Debug più facile** dei problemi
- ✅ **Nessun conflitto** con Docker Compose
- ✅ **Configurazione personalizzata** per CasaOS
