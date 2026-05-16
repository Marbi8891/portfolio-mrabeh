#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# update.sh — Script de actualización (zero-downtime mínimo)
# Uso: bash update.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

APP_DIR="/opt/mrabeh-portfolio"

echo "[1/4] Pulling cambios de Git..."
cd "$APP_DIR"
git pull origin main

echo "[2/4] Reconstruyendo imagen..."
docker compose build --no-cache

echo "[3/4] Reiniciando contenedor..."
docker compose up -d --force-recreate

echo "[4/4] Limpiando imágenes antiguas..."
docker image prune -f

echo "✓ Actualización completada"
