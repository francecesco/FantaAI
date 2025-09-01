# FantaAI Docker - Guida Completa

## 🐳 Containerizzazione FantaAI per CasaOS

Questa guida spiega come containerizzare FantaAI per l'esecuzione su CasaOS o qualsiasi sistema Docker.

## 📋 Prerequisiti

- Docker e Docker Compose installati
- Git per clonare il repository
- Porte 80, 443 e 3000 disponibili

## 🚀 Installazione Rapida

### 1. Clona il repository
```bash
git clone https://github.com/francecesco/FantaAI.git
cd FantaAI
```

### 2. Genera certificati SSL
```bash
chmod +x generate-ssl.sh
./generate-ssl.sh
```

### 3. Avvia l'applicazione
```bash
chmod +x docker-manager.sh
./docker-manager.sh start
```

### 4. Accesso all'applicazione
- **HTTP**: http://localhost
- **HTTPS**: https://localhost
- **API**: https://localhost/api

## 🔧 Gestione Avanzata

### Comandi disponibili
```bash
# Avvio/Stop
./docker-manager.sh start
./docker-manager.sh stop
./docker-manager.sh restart

# Monitoraggio
./docker-manager.sh status
./docker-manager.sh logs

# Manutenzione
./docker-manager.sh backup
./docker-manager.sh restore <file_backup.sql>
./docker-manager.sh update

# Pulizia
./docker-manager.sh clean
```

### Configurazione personalizzata

#### Variabili d'ambiente
```bash
# Database
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=fantaseriea

# Applicazione
NODE_ENV=production
```

#### Volumi persistenti
- `postgres_data`: Database PostgreSQL
- `logs`: Log dell'applicazione
- `uploads`: File caricati

## 🏗️ Architettura

### Servizi Docker
1. **postgres**: Database PostgreSQL 15
2. **fantai**: Applicazione Node.js
3. **nginx**: Reverse proxy con SSL

### Rete
- **fantai-network**: Rete bridge per i container

### Porte
- **80**: HTTP (redirect a HTTPS)
- **443**: HTTPS con SSL
- **3000**: Applicazione diretta (solo locale)

## 🔐 Sicurezza

### SSL/TLS
- Certificati self-signed per sviluppo
- Rate limiting su API
- Security headers configurati
- HSTS abilitato

### Rate Limiting
- **API generale**: 10 richieste/secondo
- **Login**: 5 richieste/minuto

### Backup
```bash
# Backup automatico
./docker-manager.sh backup

# Ripristino
./docker-manager.sh restore backup-fantai-20250101-120000.sql
```

## 📊 Monitoraggio

### Health Checks
- **PostgreSQL**: Controllo connessione
- **FantaAI**: Controllo endpoint /api/health
- **Nginx**: Controllo proxy

### Log
```bash
# Tutti i log
./docker-manager.sh logs

# Log specifico servizio
./docker-manager.sh logs fantai
./docker-manager.sh logs postgres
./docker-manager.sh logs nginx
```

## 🏠 Installazione su CasaOS

### Metodo 1: Importazione diretta
1. Apri CasaOS
2. Vai su "App Store"
3. Clicca "Import App"
4. Carica `casaos-config.json`

### Metodo 2: Installazione manuale
1. Copia i file nella directory CasaOS
2. Esegui `docker-compose up -d`
3. Configura le porte in CasaOS

### Metodo 3: Docker Hub
```bash
# Pull immagine pubblica (quando disponibile)
docker pull francecesco/fantai:latest
```

## 🔄 Aggiornamenti

### Aggiornamento automatico
```bash
./docker-manager.sh update
```

### Aggiornamento manuale
```bash
# Pull nuove immagini
docker-compose pull

# Ricostruzione
docker-compose build --no-cache

# Riavvio
docker-compose up -d
```

## 🐛 Troubleshooting

### Problemi comuni

#### 1. Porte occupate
```bash
# Verifica porte in uso
netstat -tulpn | grep :80
netstat -tulpn | grep :443

# Cambia porte in docker-compose.yml
ports:
  - "8080:80"
  - "8443:443"
```

#### 2. Database non raggiungibile
```bash
# Verifica container
docker-compose ps

# Log database
./docker-manager.sh logs postgres

# Riavvio database
docker-compose restart postgres
```

#### 3. Certificati SSL
```bash
# Rigenera certificati
./docker-manager.sh ssl

# Riavvio nginx
docker-compose restart nginx
```

#### 4. Permessi file
```bash
# Imposta permessi corretti
chmod +x *.sh
chmod 600 ssl/key.pem
chmod 644 ssl/cert.pem
```

## 📈 Performance

### Ottimizzazioni
- **Gzip**: Compressione abilitata
- **Caching**: Proxy cache configurato
- **Connection pooling**: Database ottimizzato
- **Health checks**: Monitoraggio automatico

### Risorse consigliate
- **CPU**: 1 core minimo, 2 core consigliato
- **RAM**: 512MB minimo, 1GB consigliato
- **Storage**: 1GB minimo per database

## 🔗 Link utili

- **Repository**: https://github.com/francecesco/FantaAI
- **Documentazione**: https://github.com/francecesco/FantaAI/wiki
- **Issues**: https://github.com/francecesco/FantaAI/issues

## 📝 Note

- I certificati SSL sono self-signed per sviluppo
- Per produzione, usa certificati Let's Encrypt
- Il database viene inizializzato automaticamente
- I backup sono salvati nella directory corrente
- L'applicazione è ottimizzata per CasaOS ma funziona ovunque
