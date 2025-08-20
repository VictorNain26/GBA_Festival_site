#!/bin/bash
# Script de build complet pour IONOS

echo "🚀 Build IONOS - Début"

# 1. Installation de pnpm globalement
echo "📦 Installation de pnpm..."
npm install -g pnpm@9.0.0

# 2. Installation de TOUTES les dépendances avec npm d'abord (backup)
echo "📦 Installation des dépendances avec npm (backup)..."
npm install

# 3. Ou avec pnpm si disponible
echo "📦 Vérification avec pnpm..."
if command -v pnpm &> /dev/null; then
    NODE_ENV=development pnpm install --frozen-lockfile
fi

# 4. Build statique pour IONOS
echo "🔨 Build statique en cours..."
export IONOS_STATIC=true
export NODE_ENV=production
pnpm run build:ionos || npm run build:ionos

echo "✅ Build IONOS terminé!"