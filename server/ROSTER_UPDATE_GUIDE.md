# Guida Aggiornamento Rose Serie A 2025/26

## 📋 Fonti Utilizzate

### 1. Fantacalcio.it (Priorità 1)
- **URL**: https://www.fantacalcio.it/serie-a
- **Tipo**: Dati ufficiali
- **Aggiornamento**: Settimanale

### 2. Transfermarkt.it (Priorità 2)
- **URL**: https://www.transfermarkt.it/serie-a/startseite/wettbewerb/IT1
- **Tipo**: Dati trasferimenti
- **Aggiornamento**: Continuo

### 3. Gazzetta.it (Priorità 3)
- **URL**: https://www.gazzetta.it/Calcio/Serie-A
- **Tipo**: Notizie e aggiornamenti
- **Aggiornamento**: Giornaliero

### 4. Sky Sport (Priorità 3)
- **URL**: https://sport.sky.it/calcio/serie-a
- **Tipo**: Notizie e aggiornamenti
- **Aggiornamento**: Continuo

## 🔄 Processo di Aggiornamento

### Automatico
- **Frequenza**: Settimanale (domenica 6:00)
- **Script**: `server/auto-update-rosters.js`
- **Cron Job**: Configurato automaticamente

### Manuale
```bash
# Aggiornamento immediato
node server/auto-update-rosters.js

# Riavvio con dati aggiornati
./cleanup-and-reload-db.sh
./start.sh
```

## 📊 Squadre Coperte

1. **Inter** - 24 giocatori
2. **Juventus** - 24 giocatori
3. **Milan** - 26 giocatori
4. **Napoli** - 26 giocatori
5. **Atalanta** - 25 giocatori
6. **Bologna** - 25 giocatori
7. **Fiorentina** - 25 giocatori
8. **Lazio** - 25 giocatori
9. **Roma** - 25 giocatori
10. **Torino** - 25 giocatori
11. **Genoa** - 25 giocatori
12. **Lecce** - 25 giocatori
13. **Sassuolo** - 25 giocatori
14. **Cagliari** - 25 giocatori
15. **Como** - 25 giocatori
16. **Cremonese** - 25 giocatori
17. **Parma** - 25 giocatori
18. **Pisa** - 25 giocatori
19. **Udinese** - 25 giocatori
20. **Verona** - 25 giocatori

**Totale**: ~500 giocatori

## 🛠️ Manutenzione

### Controllo Status
```bash
# Verifica ultimo aggiornamento
cat server/update-sources.json

# Controlla cron jobs
crontab -l

# Verifica dati caricati
curl -s http://localhost:3000/api/players | jq 'length'
```

### Risoluzione Problemi
1. **Dati non aggiornati**: Esegui aggiornamento manuale
2. **Cron job non funziona**: Ricontrolla configurazione
3. **Errori di importazione**: Verifica formato dati

## 📈 Metriche

- **Ultimo aggiornamento**: $(date +%Y-%m-%d)
- **Prossimo aggiornamento**: $(date -v+7d +%Y-%m-%d)
- **Fonti attive**: 4
- **Frequenza**: Settimanale
