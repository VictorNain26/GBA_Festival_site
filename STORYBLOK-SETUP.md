# 🎭 Guide d'installation Storyblok - Festival Art Déco

## ✅ Phase 3 Complétée - Intégration API

L'intégration Storyblok est maintenant **techniquement complète**. Toutes les pages, API routes, et composants sont créés et fonctionnels.

## 🚀 Configuration Required

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Token d'accès Storyblok (requis)
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_storyblok_access_token_here

# Secret pour le mode preview (optionnel)
STORYBLOK_PREVIEW_SECRET=your_secret_key_here
```

### 2. Configuration Storyblok Space

1. **Créer un espace Storyblok** sur [storyblok.com](https://storyblok.com)
2. **Obtenir le token d'accès** dans Settings > Access Tokens
3. **Créer le contenu** en utilisant notre structure JSON

## 📁 Structure d'intégration complétée

### API Routes créées
- ✅ `/api/storyblok/[...slug].ts` - Récupération du contenu
- ✅ `/api/preview.ts` - Mode preview pour l'éditeur visuel
- ✅ `/api/exit-preview.ts` - Sortie du mode preview

### Pages créées
- ✅ `/storyblok-demo` - Démonstration avec contenu statique
- ✅ `/storyblok-full-demo` - Démonstration complète
- ✅ `/storyblok-live` - **Page connectée à l'API Storyblok réelle**

### Composants Storyblok créés
- ✅ `HeroSection` - Section héro avec titre et sous-titre
- ✅ `AboutSection` - Section à propos avec blocs multiples
- ✅ `PartnersSection` - Section partenaires
- ✅ `OnTheWaySection` - Section "En route vers..."
- ✅ `DecoBallSection` - Section bal Art Déco
- ✅ `ContactSection` - Section contact
- ✅ `TextBlock` & `TitleBlock` - Composants de base

### Utilitaires créés
- ✅ `lib/storyblok.ts` - Configuration principale
- ✅ `lib/storyblok-api.ts` - Fonctions utilitaires
- ✅ `hooks/useStoryblokBridge.ts` - Hook pour l'éditeur visuel

## 🧪 Tests disponibles

### Test sans configuration Storyblok
```bash
# Ouvrir la page de démonstration (contenu statique)
http://localhost:3000/storyblok-demo
```

### Test avec configuration Storyblok
```bash
# Une fois le token configuré
http://localhost:3000/storyblok-live
```

## 📋 Contenu Storyblok pré-structuré

Le fichier `storyblok-content/festival-homepage.json` contient **tout le contenu existant** du site formaté pour Storyblok, prêt à être importé.

## 🔧 Utilisation en production

### 1. Remplacer la page index
Une fois Storyblok configuré, vous pouvez remplacer le contenu de `pages/index.tsx` par celui de `pages/storyblok-live.tsx` pour utiliser Storyblok comme source de contenu.

### 2. Optimisations disponibles
- ✅ Cache de 60 secondes en production
- ✅ Mode preview pour l'édition en temps réel
- ✅ Gestion d'erreurs complète
- ✅ Support bilingue intégré

## 🎯 État de l'intégration

| Fonctionnalité | Statut | Notes |
|----------------|--------|-------|
| Composants Storyblok | ✅ Complété | 7 composants créés |
| API Routes | ✅ Complété | 3 routes configurées |
| Types TypeScript | ✅ Complété | Types stricts validés |
| Page de démonstration | ✅ Complété | Contenu statique |
| Page API connectée | ✅ Complété | Prête pour Storyblok |
| Configuration preview | ✅ Complété | Éditeur visuel supporté |
| Extraction contenu | ✅ Complété | JSON structuré créé |
| Build de production | ✅ Complété | Compilation réussie |

## 🚀 Prochaines étapes

1. **Configurer votre espace Storyblok** avec le token
2. **Importer le contenu** depuis `storyblok-content/festival-homepage.json`
3. **Tester l'intégration** sur `/storyblok-live`
4. **Activer le mode preview** pour l'édition visuelle

---

**🎉 L'intégration Storyblok est techniquement complète !**

Tous les composants, API routes, et utilitaires sont créés et fonctionnels. Il ne reste qu'à configurer l'espace Storyblok et ajouter le token pour que tout fonctionne.