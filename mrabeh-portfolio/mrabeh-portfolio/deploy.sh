#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Script de despliegue inicial para mrabehfathi.com
# Uso: bash deploy.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

REPO_URL="https://github.com/Marbi8891/mrabeh-portfolio.git"
APP_DIR="/opt/mrabeh-portfolio"
DOMAIN="mrabehfathi.com"

echo "════════════════════════════════════════════"
echo "  NEXARO DEPLOY — mrabehfathi.com"
echo "════════════════════════════════════════════"

# 1. Verificar Docker
if ! command -v docker &> /dev/null; then
  echo "ERROR: Docker no está instalado. Instálalo primero."
  exit 1
fi

# 2. Clonar o actualizar repositorio
if [ -d "$APP_DIR" ]; then
  echo "[1/5] Actualizando repositorio..."
  cd "$APP_DIR"
  git pull origin main
else
  echo "[1/5] Clonando repositorio..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# 3. Construir imagen Docker
echo "[2/5] Construyendo imagen Docker..."
docker compose build --no-cache

# 4. Detener contenedor anterior si existe
echo "[3/5] Deteniendo contenedores anteriores..."
docker compose down 2>/dev/null || true

# 5. Levantar contenedor
echo "[4/5] Levantando contenedor..."
docker compose up -d

# 6. Verificar salud
echo "[5/5] Verificando estado..."
sleep 5
if docker compose ps | grep -q "Up"; then
  echo "✓ Contenedor corriendo correctamente"
else
  echo "✗ Error: el contenedor no está activo"
  docker compose logs
  exit 1
fi

echo ""
echo "════════════════════════════════════════════"
echo "  DEPLOY COMPLETADO"
echo "  Web disponible en: http://$DOMAIN"
echo "  Siguiente paso: configurar SSL con Certbot"
echo "════════════════════════════════════════════"
