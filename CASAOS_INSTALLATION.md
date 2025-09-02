# 🏠 Installazione FantaAI su CasaOS

## 📋 Prerequisiti

1. **CasaOS** installato e funzionante
2. **Accesso SSH** o **Terminal** su CasaOS
3. **API Keys** (opzionali ma raccomandate):
   - `FOOTBALL_DATA_API_KEY` (per dati reali Serie A)
   - `GEMINI_API_KEY` (per consigli AI)
   - `API_FOOTBALL_KEY` (per statistiche dettagliate)

## 🚀 Installazione

### Passo 1: Clonare il progetto su CasaOS

```bash
# Vai nella directory AppData di CasaOS
cd /DATA/AppData/

# Clona il repository
git clone https://github.com/francecesco/FantaAI.git

# Verifica che il progetto sia stato clonato
ls -la FantaAI/
```

### Passo 2: Installare FantaAI su CasaOS

1. **Vai su CasaOS** → **App Store** → **Import App**
2. **Seleziona "Docker Compose"**
3. **Usa il file**: `docker-compose-casaos.yml`
4. **Configura le variabili d'ambiente** (vedi `casaos-env-example.txt`)

### Passo 3: Configurare le variabili d'ambiente

Durante l'installazione, configura:

```bash
# OBBLIGATORIE per dati reali
FOOTBALL_DATA_API_KEY=your-football-data-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here

# OPZIONALI per statistiche dettagliate
API_FOOTBALL_KEY=your-api-football-key-here
```

### Passo 4: Verificare l'installazione

1. **Accedi a FantaAI**:
   - **URL**: `http://[IP-CASAOS]:3000`
   - **Esempio**: `http://192.168.1.100:3000`

2. **Verifica le funzionalità**:
   - ✅ **Login/Registrazione**
   - ✅ **Dashboard**
   - ✅ **Mercato giocatori** (641 giocatori reali)
   - ✅ **Calendario partite** (380 partite Serie A 2025/26)
   - ✅ **Consigli AI** (se configurato Gemini)

## 🔧 Configurazione API Keys

### Football-Data.org (OBBLIGATORIA)
- **URL**: https://www.football-data.org/
- **Costo**: Gratuita per uso personale
- **Limite**: 10 richieste al minuto

### Google Gemini AI (OBBLIGATORIA)
- **URL**: https://aistudio.google.com/
- **Costo**: Gratuita con limiti generosi
- **Limite**: 15 richieste al minuto

### API-Football (OPZIONALE)
- **URL**: https://rapidapi.com/api-sports/api/api-football
- **Costo**: A pagamento (trial gratuito)
- **Limite**: 100 richieste al giorno (trial)

## 🎯 Funzionalità

- ✅ **641 giocatori reali** Serie A 2025/26
- ✅ **380 partite** con punteggi reali
- ✅ **Consigli AI** personalizzati
- ✅ **Statistiche aggiornate** (se configurato API-Football)
- ✅ **Cache persistente** per performance ottimali
- ✅ **Refresh automatico** ogni notte a mezzanotte

## 🚨 Risoluzione Problemi

### Schermata Bianca
- Verifica che la porta 3000 sia libera
- Controlla i log dell'applicazione
- Riavvia l'applicazione

### Container in Restart Loop
- Verifica che il progetto sia clonato in `/DATA/AppData/FantaAI/`
- Controlla i log per errori di build
- Verifica le variabili d'ambiente

### Dati Mock
- Configura `FOOTBALL_DATA_API_KEY` per dati reali
- Configura `GEMINI_API_KEY` per consigli AI
- Riavvia l'applicazione dopo la configurazione

## 📞 Supporto

Se continui ad avere problemi:
1. **Controlla i log** di FantaAI su CasaOS
2. **Verifica** che le API Keys siano configurate
3. **Prova** a riavviare l'applicazione
4. **Controlla** che la porta 3000 sia libera