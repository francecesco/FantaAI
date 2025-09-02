# 🏠 Installazione FantaAI su CasaOS

## 📋 **PREREQUISITI**

- CasaOS installato e funzionante
- Docker e Docker Compose disponibili
- Accesso SSH o interfaccia web CasaOS

## 🚀 **INSTALLAZIONE RAPIDA**

### **Metodo 1: Importazione Docker Compose (Raccomandato)**

1. **Scarica i file necessari:**
   ```bash
   # Clona il repository
   git clone https://github.com/francecesco/FantaAI.git
   cd FantaAI
   ```

2. **Apri CasaOS** nel browser (solitamente `http://[IP_CASAOS]:80`)

3. **Vai su "App Store"** → **"Import App"**

4. **Seleziona "Docker Compose"** e carica il file `docker-compose-casaos.yml`

5. **Configura le variabili d'ambiente:**
   ```
   POSTGRES_HOST=postgres
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=fantaseriea
   DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fantaseriea
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production
   NODE_ENV=production
   ```

6. **Configura le porte:**
   - **3000** → Accesso all'applicazione

7. **Avvia l'installazione** e attendi il completamento

### **Metodo 2: Installazione Manuale**

1. **Copia i file nella directory CasaOS:**
   ```bash
   # Su CasaOS, copia questi file:
   - docker-compose-casaos.yml
   - Dockerfile
   - docker-entrypoint.sh
   - .dockerignore
   ```

2. **Avvia con Docker Compose:**
   ```bash
   docker-compose -f docker-compose-casaos.yml up -d
   ```

## 🌐 **ACCESSO ALL'APPLICAZIONE**

Dopo l'installazione, accedi a:
- **URL**: `http://[IP_CASAOS]:3000`
- **API Health**: `http://[IP_CASAOS]:3000/api/health`

## 📊 **VERIFICA INSTALLAZIONE**

### **Controlla lo stato dei container:**
```bash
docker ps
```

### **Testa l'API:**
```bash
curl http://[IP_CASAOS]:3000/api/health
```

### **Verifica i giocatori:**
```bash
curl http://[IP_CASAOS]:3000/api/players | jq '. | length'
```

## 🔧 **GESTIONE**

### **Comandi utili:**
```bash
# Avvia l'applicazione
docker-compose -f docker-compose-casaos.yml up -d

# Ferma l'applicazione
docker-compose -f docker-compose-casaos.yml down

# Riavvia l'applicazione
docker-compose -f docker-compose-casaos.yml restart

# Visualizza i log
docker-compose -f docker-compose-casaos.yml logs -f

# Aggiorna l'applicazione
docker-compose -f docker-compose-casaos.yml pull
docker-compose -f docker-compose-casaos.yml up -d
```

### **Backup del database:**
```bash
# Crea backup
docker exec fantai-postgres pg_dump -U postgres fantaseriea > backup_$(date +%Y%m%d_%H%M%S).sql

# Ripristina backup
docker exec -i fantai-postgres psql -U postgres fantaseriea < backup_file.sql
```

## 🛠️ **CONFIGURAZIONE AVANZATA**

### **Variabili d'ambiente personalizzate:**
Modifica il file `docker-compose-casaos.yml` per personalizzare:
- Password database
- Secret session
- Porte di accesso
- Risorse (CPU/RAM)

### **Volumi persistenti:**
I dati del database sono salvati nel volume `postgres_data` e persistono tra i riavvii.

## 🆘 **TROUBLESHOOTING**

### **Problemi comuni:**

1. **Container non si avvia:**
   ```bash
   docker-compose -f docker-compose-casaos.yml logs fantai
   ```

2. **Database non raggiungibile:**
   ```bash
   docker-compose -f docker-compose-casaos.yml logs postgres
   ```

3. **Porta 3000 occupata:**
   ```bash
   # Cambia la porta nel docker-compose-casaos.yml
   ports:
     - "3001:5000"  # Usa porta 3001 invece di 3000
   ```

4. **Permessi file:**
   ```bash
   chmod +x docker-entrypoint.sh
   ```

### **Reset completo:**
```bash
# Ferma e rimuovi tutto
docker-compose -f docker-compose-casaos.yml down -v

# Rimuovi le immagini
docker rmi fantai_fantai

# Riavvia
docker-compose -f docker-compose-casaos.yml up -d
```

## 📈 **MONITORAGGIO**

### **Risorse utilizzate:**
- **CPU**: ~0.1-0.5 core
- **RAM**: ~200-500MB
- **Storage**: ~100MB + dati database

### **Log da monitorare:**
```bash
# Log applicazione
docker logs fantai-app -f

# Log database
docker logs fantai-postgres -f
```

## 🔐 **SICUREZZA**

- **Database**: Password predefinita (cambiala in produzione)
- **Session Secret**: Chiave predefinita (cambiala in produzione)
- **Accesso**: Solo dalla rete locale CasaOS

## 📝 **NOTE IMPORTANTI**

1. **Primo avvio**: Può richiedere 2-3 minuti per l'inizializzazione
2. **Database**: Viene popolato automaticamente con 278 giocatori Serie A 2025/26
3. **Backup**: Esegui backup regolari del database
4. **Aggiornamenti**: Usa `docker-compose pull` per aggiornare l'applicazione

## 🎯 **PROSSIMI PASSI**

1. **Configura backup automatici**
2. **Imposta monitoraggio risorse**
3. **Personalizza le variabili d'ambiente**
4. **Configura accesso esterno (se necessario)**

---

**🎉 FantaAI è ora installato e funzionante su CasaOS!**

Per supporto o domande, consulta la documentazione completa nel repository GitHub.
