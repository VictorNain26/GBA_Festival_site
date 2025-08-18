# Guide de Configuration Storyblok - Phase 2

Ce guide vous aide à configurer votre espace Storyblok avec le contenu structuré du festival Art Déco.

## 🏗️ Étape 1: Création de l'Espace Storyblok

1. **Créer un compte Storyblok**
   - Aller sur [storyblok.com](https://storyblok.com)
   - Créer un nouveau space "Festival Art Deco"
   - Région recommandée: **Europe (EU)**

2. **Configuration initiale**
   - Choisir "Headless CMS" mode
   - Sélectionner "React/Next.js" comme framework
   - Activer la Preview API

## 📋 Étape 2: Configuration des Composants

Utiliser le fichier `component-schemas.json` pour créer les composants dans Storyblok :

### Composants de Base (à créer en premier)

1. **text-block** - Bloc de texte bilingue
2. **title-block** - Titre avec niveaux et styles

### Composants de Section (à créer ensuite)

3. **hero-section** - Section d'accueil
4. **about-section** - Section à propos  
5. **partners-section** - Section partenaires
6. **on-the-way-section** - Section On the Way
7. **on-the-way-story** - Histoire individuelle
8. **deco-ball-section** - Section bal
9. **contact-section** - Section contact

### Composant Page (à créer en dernier)

10. **festival-page** - Page festival (composant racine)

## 🔧 Étape 3: Création des Composants dans Storyblok

Pour chaque composant dans `component-schemas.json` :

1. Aller dans **Settings > Component Library**
2. Cliquer sur **+ New Component**
3. Entrer le nom du composant (ex: `text-block`)
4. Ajouter les champs selon le schéma :

### Exemple: Composant text-block

```
Nom: text-block
Type: Nestable Component

Champs:
- content_fr (Textarea) - Contenu français
- content_en (Textarea) - English content  
- highlighted_phrases_fr (Text) - Phrases en surbrillance (FR)
- highlighted_phrases_en (Text) - Highlighted phrases (EN)
```

### Exemple: Composant festival-page

```
Nom: festival-page
Type: Content type (Root component)

Champs:
- body (Blocks) - Contenu de la page
  Restriction: hero-section, about-section, partners-section, 
               on-the-way-section, deco-ball-section, contact-section
```

## 📄 Étape 4: Import du Contenu

1. **Créer une nouvelle Story**
   - Aller dans **Content**
   - Cliquer sur **+ Create new**
   - Nom: `festival-homepage`
   - Choisir le composant `festival-page`

2. **Import du contenu structuré**
   - Utiliser le fichier `festival-homepage.json`
   - Copier le contenu section par section
   - Ou utiliser l'import JSON de Storyblok

## 🔑 Étape 5: Configuration des Variables d'Environnement

Récupérer les tokens depuis **Settings > Access Tokens** :

```env
# .env.local
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_preview_token_here
STORYBLOK_PREVIEW_SECRET=your_preview_secret_here
```

## 🎯 Étape 6: Test de l'Intégration

1. **Page de test disponible**
   - `/storyblok-full-demo` - Démo complète avec contenu local
   - `/storyblok-demo` - Démo simple

2. **Vérification**
   - Les composants s'affichent correctement
   - Le changement de langue fonctionne
   - Les animations sont préservées
   - Le design Art Déco est maintenu

## 🚀 Étape 7: Migration vers l'API Storyblok

Une fois l'espace configuré, modifier `storyblok-full-demo.tsx` :

```typescript
// Remplacer getStaticProps par :
export const getStaticProps: GetStaticProps = async () => {
  const { storyblokApi } = getStoryblokApi();
  
  const { data } = await storyblokApi.get('cdn/stories/festival-homepage', {
    version: 'draft',
  });

  return {
    props: {
      storyData: data.story,
    },
    revalidate: 3600,
  };
};
```

## 📚 Ressources

- **Documentation Storyblok**: [storyblok.com/docs](https://storyblok.com/docs)
- **Next.js Integration**: [storyblok.com/tp/nextjs](https://storyblok.com/tp/nextjs)
- **Component Library**: [storyblok.com/docs/guide/essentials/content-structures](https://storyblok.com/docs/guide/essentials/content-structures)

## 🔍 Structure des Fichiers Créés

```
storyblok-content/
├── festival-homepage.json      # Contenu structuré complet
├── component-schemas.json      # Schémas des composants
├── STORYBLOK_SETUP_GUIDE.md   # Ce guide
└── [futures migrations]

pages/
└── storyblok-full-demo.tsx    # Page de démonstration
```

## ✅ Validation Phase 2

Phase 2 complète quand :
- [ ] Espace Storyblok créé
- [ ] Tous les composants configurés
- [ ] Contenu importé et structuré
- [ ] Variables d'environnement configurées
- [ ] Demo page fonctionne avec contenu Storyblok
- [ ] Éditeur visuel Storyblok opérationnel

---

**Note**: Cette phase prépare le passage à la **Phase 3: Migration complète** où l'on remplacera le contenu statique du site principal par l'intégration Storyblok complète.