#!/bin/bash

# ANSI Color Codes for terminal output formatting
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================================${NC}"
echo -e "${BLUE}         STARTING BACKEND ENGINE & DATABASE             ${NC}"
echo -e "${BLUE}=========================================================${NC}"

# 1. Install Backend Dependencies
echo -e "\n${YELLOW}[1/3] Auditing and installing NestJS dependencies...${NC}"
if [ -d "backend" ]; then
    cd backend/nestjs && npm install 
else
    echo "Error: 'backend' directory not found."
    exit 1
fi

# 2. Spin up Docker Containers
echo -e "\n${YELLOW}[2/3] Spinning up PostgreSQL via Docker Compose...${NC}"
if [ -f "docker-compose.yml" ]; then
    docker compose up -d 
    echo -e "${GREEN}✔ Postgres container running stable in background.${NC}"
else
    echo "Error: docker-compose.yml file not found in root directory."
    exit 1
fi

# Courtesy delay to ensure PostgreSQL port is open and ready
echo -e "\n${YELLOW}Waiting 3 seconds for database initialization...${NC}"
sleep 3

# 3. Boot NestJS Server
echo -e "\n${YELLOW}[3/3] Launching NestJS local server in development mode...${NC}"
echo -e "${GREEN} PGadmin web interface intiliazed in http://localhost:3005 ${NC}"
echo -e "${BLUE}---------------------------------------------------------${NC}"

npm run start:dev
