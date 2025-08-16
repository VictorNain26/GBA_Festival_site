# Guide de Configuration Sanity CMS

Ce projet utilise **Sanity CMS** pour la gestion de contenu. Voici comment configurer et utiliser Sanity.

## 📋 Prérequis

1. Compte Sanity.io (gratuit)
2. Node.js 18+
3. Variables d'environnement configurées

## 🚀 Configuration Initiale

### 1. Variables d'Environnement

Copiez `.env.example` vers `.env.local` et configurez :

```bash
cp .env.example .env.local
```

Puis éditez `.env.local` avec vos vraies valeurs :

```env
# Votre projet Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="4pb422m1"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-08-15"
NEXT_PUBLIC_SANITY_STUDIO_URL="http://localhost:3000/studio"

# Tokens (voir section ci-dessous)
SANITY_VIEWER_TOKEN="votre-token-viewer"
SANITY_PREVIEW_SECRET="votre-secret-preview"
```

### 2. Obtenir les Tokens Sanity

1. **Aller dans votre projet Sanity** : https://sanity.io/manage/personal/project/4pb422m1
2. **Créer un token Viewer** :
   - Aller dans "Settings" > "API" > "Tokens"
   - Cliquer "Add API token"
   - Nom : "Festival Site Viewer"
   - Permissions : "Viewer"
   - Copier le token généré dans `SANITY_VIEWER_TOKEN`

3. **Configurer le secret preview** :
   - Générer une chaîne aléatoire sécurisée
   - L'ajouter dans `SANITY_PREVIEW_SECRET`

## 🎛️ Utilisation du Studio Sanity

### Démarrer le Studio

1. **En développement** :
   ```bash
   npm run dev
   ```
   Puis aller sur : http://localhost:3000/studio

2. **Studio séparé** (optionnel) :
   ```bash
   npx sanity dev
   ```
   Studio sur : http://localhost:3333

### Structure du Contenu

Le site utilise ces types de contenu :

#### 1. **Hero Section** (`hero`)
- Titre principal
- Sous-titre
- Date de l'événement  
- Lieu
- Bouton d'action

#### 2. **Sections** (`section`)
- À propos
- Partenaires
- Spectacle (On the Way)
- Bal Art Déco
- Personnages
- Contact

#### 3. **Catégories Partenaires** (`partnerCategory`)
- Collectionneurs & Galeries
- Artistes & Sculpteurs
- Maisons & Créateurs
- Bijoux & Accessoires
- Vin & Parfum

## 📝 Migration du Contenu

Pour migrer le contenu existant vers Sanity :

```bash
npm run migrate-content
```

Ce script :
- Importe tout le contenu depuis `constants/content.tsx`
- Crée les documents Sanity correspondants
- Préserve la structure bilingue (français/anglais)
- Teste automatiquement la connexion Sanity
- Fournit des messages d'erreur détaillés

**✅ Migration déjà effectuée avec succès !** Votre contenu est maintenant disponible dans Sanity Studio.

## 🌐 Mode Preview/Draft

Le site supporte le mode brouillon pour prévisualiser :

1. **Activer** : https://votre-site.com/api/draft?secret=votre-preview-secret
2. **Désactiver** : https://votre-site.com/api/disable-draft

## 🔧 Scripts Utiles

```bash
# Développement avec hot-reload
npm run dev

# Build de production
npm run build

# Linter le code
npm run lint

# Démarrer Sanity Studio seul
npx sanity dev

# Migrer le contenu vers Sanity
npx ts-node scripts/migrate-content.ts

# Gérer les CORS Sanity
npx sanity cors add http://localhost:3000
```

## 📁 Structure des Fichiers Sanity

```
sanity/
├── lib/
│   ├── client.ts          # Configuration client Sanity
│   └── queries.ts         # Requêtes GROQ
├── schemaTypes/
│   ├── index.ts          # Export des schémas
│   ├── blockContentType.ts
│   ├── heroType.ts
│   ├── sectionType.ts
│   └── partnerCategoryType.ts
└── sanity.config.ts       # Configuration principale
```

## 🚨 Résolution de Problèmes

### Erreur de Token
```
Error: Invalid token
```
**Solution** : Vérifiez que `SANITY_VIEWER_TOKEN` est correct et a les bonnes permissions.

### Erreur de CORS
```
CORS error accessing Sanity
```
**Solution** :
```bash
npx sanity cors add http://localhost:3000
npx sanity cors add https://votre-domaine.com
```

### Contenu Vide
**Solution** : Lancez la migration :
```bash
npx ts-node scripts/migrate-content.ts
```

## 🌍 Déploiement Production

1. **Configurer les variables d'environnement** sur votre plateforme (Vercel, Netlify, etc.)
2. **Ajouter votre domaine aux CORS Sanity** :
   ```bash
   npx sanity cors add https://votre-domaine.com
   ```
3. **Mettre à jour `NEXT_PUBLIC_SANITY_STUDIO_URL`** avec votre vraie URL

## 📚 Documentation Sanity

- [Documentation officielle](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js Integration](https://www.sanity.io/docs/nextjs)