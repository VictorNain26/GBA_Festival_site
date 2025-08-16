# Scripts Package.json - Festival Site

## Scripts disponibles

```bash
# Développement
npm run dev                 # Démarre le serveur de développement (port 3000)

# Construction
npm run build              # Build de production
npm run start              # Démarre le serveur de production

# Qualité du code
npm run lint               # Vérifie le code avec ESLint
npm run lint:strict        # Lint strict avec zéro warning
npm run lint:fix           # Corrige automatiquement les erreurs de lint

# Analyse
npm run analyze            # Analyse du bundle de production
```

## Scripts Sanity supplémentaires

```bash
# Studio Sanity
npx sanity dev             # Démarre le studio Sanity sur port 3333
npx sanity deploy          # Déploie le studio sur Sanity Cloud

# Gestion du contenu
npx ts-node scripts/migrate-content.ts    # Migre le contenu vers Sanity

# Configuration CORS
npx sanity cors add http://localhost:3000
npx sanity cors add https://votre-domaine.com
```

## Workflow de développement recommandé

1. **Premier démarrage** :
   ```bash
   cp .env.example .env.local
   # Configurer les variables d'environnement
   npm run dev
   ```

2. **Accès au studio** : http://localhost:3000/studio

3. **Migration du contenu** :
   ```bash
   npx ts-node scripts/migrate-content.ts
   ```

4. **Avant commit** :
   ```bash
   npm run lint
   npm run build
   ```