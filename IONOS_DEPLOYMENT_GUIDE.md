# 🚀 Guide de Déploiement IONOS

Ce guide détaille comment déployer le site festival sur IONOS de manière optimale.

## 📋 Options de Déploiement IONOS

### Option 1: IONOS Deploy Now (Recommandée - Site Statique)
- ✅ **Avantages**: Gratuit, simple, optimisé pour les sites statiques
- ❌ **Limitations**: Pas de SSR, pas d'API routes côté serveur
- 🎯 **Idéal pour**: Sites vitrine, blogs, portfolios

### Option 2: IONOS Node.js Hosting (Pour sites dynamiques)
- ✅ **Avantages**: Support complet Next.js, SSR, API routes
- ❌ **Inconvénients**: Payant (~5€/mois)
- 🎯 **Idéal pour**: Applications avec contenu dynamique

## 🔧 Configuration Actuelle

Le projet est **pré-configuré** pour les deux options :

### Variables d'Environnement
- `IONOS_STATIC=true` → Active le mode statique
- `IONOS_STATIC=false` ou non défini → Mode dynamique normal

### Scripts de Build
```bash
# Développement local
pnpm dev

# Build standard (avec SSR)
pnpm build

# Build pour IONOS Deploy Now (statique)
pnpm build:ionos

# Serveur local pour tester la version statique
pnpm start:static
```

## 🚀 Déploiement IONOS Deploy Now

### Étape 1: Configuration du Repository
1. Connectez votre repo GitHub à IONOS Deploy Now
2. IONOS détectera automatiquement Next.js

### Étape 2: Configuration Build
Dans l'interface IONOS, configurez :
```yaml
Build Command: pnpm run build:ionos
Output Directory: out
Node.js Version: 18.x
```

### Étape 3: Variables d'Environnement
Dans l'interface IONOS Deploy Now, ajoutez :
```
NODE_ENV=production
IONOS_STATIC=true
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=votre_token_storyblok
STORYBLOK_PREVIEW_SECRET=votre_secret_preview
NEXT_TELEMETRY_DISABLED=1
```

### Étape 4: Déploiement
- Push sur la branche `main`
- IONOS déploie automatiquement
- Site accessible via l'URL fournie

## 🔧 Optimisations Appliquées

### Performance
- ✅ Export statique optimisé
- ✅ Images non-optimisées (requis pour statique)
- ✅ Cache headers configurés
- ✅ Compression assets automatique

### Compatibilité IONOS
- ✅ Trailing slashes activés
- ✅ Configuration `.ionos.yml` incluse
- ✅ Headers de sécurité adaptés
- ✅ Redirections configurées

### Storyblok
- ✅ Compatible mode statique
- ✅ Génération SSG pour toutes les pages
- ✅ Fallback pour contenu dynamique

## 🧪 Tests Locaux

### Tester la Version Statique
```bash
# Build statique
pnpm build:ionos

# Servir localement
pnpm start:static

# Ouvrir http://localhost:3000
```

### Vérifications
- [ ] Navigation fonctionne
- [ ] Images se chargent
- [ ] Contenu Storyblok affiché
- [ ] Responsive design OK
- [ ] Performances optimales

## 🔐 Sécurité

### Headers de Sécurité
- Content Security Policy (CSP)
- X-Content-Type-Options
- X-Frame-Options
- Referrer Policy
- Permissions Policy

### HTTPS
- IONOS fournit SSL gratuit
- Redirection HTTP → HTTPS automatique
- HSTS configuré en production

## 📊 Monitoring & Performance

### Métriques à Surveiller
- Temps de chargement < 3s
- Core Web Vitals optimisés
- Taille des bundles < 500KB
- Score Lighthouse > 90

### Outils Recommandés
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse CI

## 🆘 Dépannage

### Problèmes Courants

**Build Failed**
```bash
# Vérifier les dépendances
pnpm install --frozen-lockfile

# Tester en local
pnpm build:ionos
```

**Images ne se chargent pas**
- Vérifier `images.unoptimized: true`
- Contrôler les chemins absolus `/images/`

**Storyblok ne fonctionne pas**
- Vérifier les variables d'environnement
- Tester les tokens API

**Performance dégradée**
- Analyser le bundle : `pnpm analyze`
- Optimiser les imports
- Lazy loading des composants

## 📞 Support

### IONOS Support
- Dashboard: Ticket support
- Email: deploynow-support@ionos.com
- Documentation: docs.ionos.space

### Debug
```bash
# Logs de build détaillés
NEXT_DEBUG=1 pnpm build:ionos

# Analyse du bundle
pnpm analyze
```