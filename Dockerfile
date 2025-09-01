# Dockerfile per FantaAI
FROM node:18-alpine

# Installa le dipendenze di sistema necessarie
RUN apk add --no-cache \
    postgresql-client \
    curl \
    jq \
    bash

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione
COPY package*.json ./
COPY tsconfig.json ./
COPY drizzle.config.ts ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./

# Installa le dipendenze
RUN npm ci --only=production

# Copia il codice sorgente
COPY . .

# Crea la directory per i log
RUN mkdir -p /app/logs

# Espone la porta 3000
EXPOSE 3000

# Script di avvio
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Comando di default
ENTRYPOINT ["docker-entrypoint.sh"]
