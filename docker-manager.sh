# Script per gestire FantaAI con Docker
#!/bin/bash

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funzione per mostrare l'help
show_help() {
    echo -e "${BLUE}🚀 FantaAI Docker Manager${NC}"
    echo ""
    echo "Uso: $0 [COMANDO]"
    echo ""
    echo "Comandi disponibili:"
    echo "  ${GREEN}start${NC}     - Avvia FantaAI con Docker Compose"
    echo "  ${GREEN}stop${NC}      - Ferma tutti i container"
    echo "  ${GREEN}restart${NC}   - Riavvia tutti i container"
    echo "  ${GREEN}build${NC}     - Ricostruisce l'immagine dell'applicazione"
    echo "  ${GREEN}logs${NC}      - Mostra i log dei container"
    echo "  ${GREEN}status${NC}    - Mostra lo stato dei container"
    echo "  ${GREEN}clean${NC}     - Rimuove container, volumi e immagini"
    echo "  ${GREEN}ssl${NC}       - Genera certificati SSL self-signed"
    echo "  ${GREEN}backup${NC}    - Crea backup del database"
    echo "  ${GREEN}restore${NC}   - Ripristina backup del database"
    echo "  ${GREEN}update${NC}    - Aggiorna l'applicazione"
    echo "  ${GREEN}help${NC}      - Mostra questo help"
    echo ""
    echo "Esempi:"
    echo "  $0 start"
    echo "  $0 logs fantai"
    echo "  $0 backup"
    echo ""
}

# Funzione per avviare l'applicazione
start_app() {
    echo -e "${BLUE}🚀 Avvio FantaAI...${NC}"
    
    # Genera certificati SSL se non esistono
    if [ ! -f "ssl/cert.pem" ]; then
        echo -e "${YELLOW}🔐 Generazione certificati SSL...${NC}"
        ./generate-ssl.sh
    fi
    
    # Avvia con Docker Compose
    docker-compose up -d
    
    echo -e "${GREEN}✅ FantaAI avviato!${NC}"
    echo ""
    echo "🌐 Accesso:"
    echo "   - HTTP:  http://localhost"
    echo "   - HTTPS: https://localhost"
    echo "   - API:   https://localhost/api"
    echo ""
    echo "📊 Monitoraggio:"
    echo "   $0 status"
    echo "   $0 logs"
}

# Funzione per fermare l'applicazione
stop_app() {
    echo -e "${YELLOW}🛑 Fermando FantaAI...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ FantaAI fermato!${NC}"
}

# Funzione per riavviare l'applicazione
restart_app() {
    echo -e "${BLUE}🔄 Riavvio FantaAI...${NC}"
    docker-compose restart
    echo -e "${GREEN}✅ FantaAI riavviato!${NC}"
}

# Funzione per ricostruire l'immagine
build_app() {
    echo -e "${BLUE}🔨 Ricostruzione immagine FantaAI...${NC}"
    docker-compose build --no-cache
    echo -e "${GREEN}✅ Immagine ricostruita!${NC}"
}

# Funzione per mostrare i log
show_logs() {
    if [ -z "$1" ]; then
        docker-compose logs -f
    else
        docker-compose logs -f "$1"
    fi
}

# Funzione per mostrare lo stato
show_status() {
    echo -e "${BLUE}📊 Stato container FantaAI:${NC}"
    docker-compose ps
    
    echo ""
    echo -e "${BLUE}📈 Statistiche sistema:${NC}"
    docker system df
    
    echo ""
    echo -e "${BLUE}🌐 Test connessione:${NC}"
    if curl -s -k https://localhost/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Applicazione raggiungibile${NC}"
    else
        echo -e "${RED}❌ Applicazione non raggiungibile${NC}"
    fi
}

# Funzione per pulire tutto
clean_all() {
    echo -e "${RED}⚠️  ATTENZIONE: Questa operazione rimuoverà TUTTO!${NC}"
    read -p "Sei sicuro? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🧹 Pulizia completa...${NC}"
        docker-compose down -v --rmi all
        docker system prune -f
        echo -e "${GREEN}✅ Pulizia completata!${NC}"
    else
        echo -e "${YELLOW}❌ Pulizia annullata${NC}"
    fi
}

# Funzione per generare SSL
generate_ssl() {
    echo -e "${BLUE}🔐 Generazione certificati SSL...${NC}"
    ./generate-ssl.sh
}

# Funzione per backup del database
backup_db() {
    echo -e "${BLUE}💾 Backup database...${NC}"
    BACKUP_FILE="backup-fantai-$(date +%Y%m%d-%H%M%S).sql"
    
    docker-compose exec -T postgres pg_dump -U postgres fantaseriea > "$BACKUP_FILE"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backup creato: $BACKUP_FILE${NC}"
    else
        echo -e "${RED}❌ Errore durante il backup${NC}"
    fi
}

# Funzione per ripristino del database
restore_db() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Specifica il file di backup${NC}"
        echo "Uso: $0 restore <file_backup.sql>"
        exit 1
    fi
    
    echo -e "${BLUE}📥 Ripristino database da $1...${NC}"
    
    docker-compose exec -T postgres psql -U postgres -d fantaseriea < "$1"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database ripristinato!${NC}"
    else
        echo -e "${RED}❌ Errore durante il ripristino${NC}"
    fi
}

# Funzione per aggiornare l'applicazione
update_app() {
    echo -e "${BLUE}🔄 Aggiornamento FantaAI...${NC}"
    
    # Pull delle immagini più recenti
    docker-compose pull
    
    # Ricostruzione dell'applicazione
    docker-compose build --no-cache
    
    # Riavvio dei servizi
    docker-compose up -d
    
    echo -e "${GREEN}✅ Aggiornamento completato!${NC}"
}

# Controllo del comando
case "$1" in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    build)
        build_app
        ;;
    logs)
        show_logs "$2"
        ;;
    status)
        show_status
        ;;
    clean)
        clean_all
        ;;
    ssl)
        generate_ssl
        ;;
    backup)
        backup_db
        ;;
    restore)
        restore_db "$2"
        ;;
    update)
        update_app
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando non riconosciuto: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
