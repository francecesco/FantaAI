# Database Unificato Giocatori Serie A 2025/26

## Struttura del Database

Il database dei giocatori è stato unificato in un'unica tabella organizzata per ruolo e senza duplicati.

### File Principali

1. **`server/all-serie-a-players-2025.ts`** - Database principale con tutti i giocatori
2. **`server/attaccanti-serie-a-2025.ts`** - Attaccanti e funzioni di utilità
3. **`server/fantacalcio-real-api.ts`** - Servizio API aggiornato

### Organizzazione per Ruolo

I giocatori sono organizzati nelle seguenti categorie:

- **P (Portieri)** - 33 giocatori
- **D (Difensori)** - 89 giocatori  
- **C (Centrocampisti)** - 67 giocatori
- **A (Attaccanti)** - 89 giocatori

**Totale: 278 giocatori**

### Squadre Incluse

1. **Inter** - 25 giocatori
2. **Napoli** - 25 giocatori
3. **Juventus** - 25 giocatori
4. **Milan** - 25 giocatori
5. **Atalanta** - 25 giocatori
6. **Bologna** - 25 giocatori
7. **Fiorentina** - 25 giocatori
8. **Lazio** - 25 giocatori
9. **Roma** - 25 giocatori
10. **Torino** - 25 giocatori
11. **Genoa** - 25 giocatori
12. **Lecce** - 25 giocatori

### Funzioni di Utilità

```typescript
// Ottenere tutti i giocatori
import { allSerieAPlayers2025 } from './all-serie-a-players-2025';

// Ottenere giocatori per ruolo
import { getPlayersByRole } from './attaccanti-serie-a-2025';
const portieri = getPlayersByRole('P');
const difensori = getPlayersByRole('D');
const centrocampisti = getPlayersByRole('C');
const attaccanti = getPlayersByRole('A');

// Ottenere giocatori per squadra
import { getPlayersByTeam } from './attaccanti-serie-a-2025';
const interPlayers = getPlayersByTeam('Inter');

// Rimuovere duplicati
import { removeDuplicates } from './attaccanti-serie-a-2025';
const uniquePlayers = removeDuplicates(players);
```

### Dati Inclusi

Ogni giocatore include:
- **Nome completo**
- **Ruolo** (P/D/C/A)
- **Squadra**
- **Prezzo** (Fantacalcio)
- **Rating** (media voti)
- **Statistiche** (gol, assist, cartellini)
- **Partite giocate**
- **Stato attivo**

### Aggiornamenti

I dati sono aggiornati al mercato estivo 2025 e basati su Fantacalcio.it.

### Utilizzo nel Sistema

Il database è utilizzato tramite il servizio `FantacalcioRealDataService`:

```typescript
import { fantacalcioRealDataService } from './fantacalcio-real-api';

// Ottenere tutti i giocatori
const players = await fantacalcioRealDataService.getSerieAPlayers();
```

### Vantaggi della Nuova Struttura

1. **Unificazione** - Tutti i dati in un unico posto
2. **Organizzazione** - Chiara separazione per ruolo
3. **Senza duplicati** - Eliminazione di giocatori duplicati
4. **Facilità di manutenzione** - Struttura modulare
5. **Performance** - Accesso diretto ai dati
6. **Scalabilità** - Facile aggiungere nuove squadre

### Prossimi Passi

- Aggiungere le squadre mancanti (Sassuolo, Cagliari, Como, Cremonese, Parma, Pisa, Udinese, Verona)
- Implementare aggiornamenti automatici
- Aggiungere statistiche più dettagliate
- Integrare con API esterne per aggiornamenti in tempo reale
