#!/bin/bash
# Script d'installation pour IONOS qui force l'installation de TOUTES les dépendances

echo "📦 Installation de pnpm..."
npm install -g pnpm@9.0.0

echo "📦 Installation de toutes les dépendances (prod + dev)..."
# Force NODE_ENV=development pour installer les devDependencies
export NODE_ENV=development
pnpm install --frozen-lockfile

echo "✅ Installation complète!"