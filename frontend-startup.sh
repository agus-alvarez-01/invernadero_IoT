#!/bin/bash

# ANSI Color Codes for terminal output formatting
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================================${NC}"
echo -e "${BLUE}               STARTING NEXT.JS FRONTEND                 ${NC}"
echo -e "${BLUE}=========================================================${NC}"

# 1. Install Frontend Dependencies
echo -e "\n${YELLOW}[1/2] Auditing and installing Next.js dependencies...${NC}"
if [ -d "frontend" ]; then
    cd frontend/dashboard && npm install 
else
    echo "Error: 'frontend' directory not found."
    exit 1
fi

# 2. Boot Next.js Dev Server
echo -e "\n${YELLOW}[2/2] Launching Next.js development server...${NC}"
echo -e "${GREEN}Open http://localhost:3000 in your browser when ready.${NC}"
echo -e "${BLUE}---------------------------------------------------------${NC}"

npm run dev
