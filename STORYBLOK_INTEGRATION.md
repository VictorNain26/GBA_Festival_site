# 🎭 Storyblok Integration - Festival Art Déco

## 📋 Architecture d'Intégration Moderne (2025)

### ✅ **Stratégie Recommandée: Pages Router + React 18**
- **Next.js 15.4.6** avec **Pages Router** (compatible)
- **React 18** (recommandé par Storyblok en 2025)
- **@storyblok/react 5.4.4** (dernière version stable)

### 🎯 **Analyse du Contenu Actuel**
Le site contient **11 types de contenu** organisés de manière bilingue (FR/EN):

1. **Navigation** (`NAV_LABELS`)
2. **Titres de sections** (`SECTION_TITLES`)
3. **Contenu héro** (`HERO_CONTENT`)
4. **À propos** (`ABOUT_CONTENT`) - 5 paragraphes
5. **Contact** (`CONTACT_CONTENT`)
6. **Partenaires intro** (`PARTNERS_INTRO`)
7. **Partenaires collaboration** (`PARTNERS_COLLABORATION`)
8. **On the Way** (`ON_THE_WAY_CONTENT`) - 5 sections
9. **Bal Art Déco intro** (`DECO_BALL_INTRO`)
10. **Bal Art Déco** (`DECO_BALL_CONTENT`)
11. **Objectifs festival** (`FESTIVAL_OBJECTIVE`)

## 🏗️ **Structure Storyblok Proposée**

### **1. Content Types (Schémas)**

#### **Festival Page**
```
festival-page:
  - hero (Hero Section)
  - about (About Section) 
  - partners (Partners Section)
  - on_the_way (On The Way Section)
  - deco_ball (Deco Ball Section)
  - contact (Contact Section)
  - navigation (Navigation Labels)
```

#### **Sections Réutilisables**
```
hero-section:
  - title (Title Block[])
  - subtitle_fr (Text)
  - subtitle_en (Text) 
  - date_fr (Text)
  - date_en (Text)
  - location_fr (Text)
  - location_en (Text)
  - cta_fr (Text)
  - cta_en (Text)

text-block:
  - content_fr (Richtext)
  - content_en (Richtext)
  - highlighted_phrases_fr (Text)
  - highlighted_phrases_en (Text)

title-block:
  - title_fr (Text)
  - title_en (Text)
  - subtitle_fr (Text, optional)
  - subtitle_en (Text, optional)
  - level (Option: h1, h2, h3, h4)
  - style (Option: hero, section, subsection)
```

## 🚀 **Installation & Configuration**

### **1. Installation**
```bash
pnpm add @storyblok/react
```

### **2. Variables d'Environnement**
Créer `.env.local`:
```bash
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_preview_token
STORYBLOK_PREVIEW_SECRET=your_preview_secret
```

### **3. Configuration Storyblok** (`lib/storyblok.ts`)
```typescript
import { storyblokInit, apiPlugin } from '@storyblok/react';

const { storyblokApi } = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    'hero-section': HeroSection,
    'text-block': TextBlock,
    'title-block': TitleBlock,
    // ... autres composants
  },
  apiOptions: {
    region: 'eu',
    cache: { clear: 'auto', type: 'memory' }
  }
});
```

## 📦 **Composants Créés**

### ✅ **Composants Disponibles**
- `StoryblokProvider` - Provider pour l'éditeur visuel
- `TextBlock` - Gestion des textes bilingues avec mise en valeur
- `TitleBlock` - Titres avec styles Art Déco (hero/section/subsection)
- `HeroSection` - Section héro complète avec animations

### 🚧 **À Développer**
- `AboutSection` - Section à propos avec blocs texte multiples
- `PartnersSection` - Section partenaires
- `OnTheWaySection` - Section narrative en 5 parties
- `DecoBallSection` - Section bal art déco
- `ContactSection` - Section contact avec données structurées

## 🎨 **Fonctionnalités Clés**

### **1. Contenu Bilingue Automatique**
```typescript
// Les composants detectent automatiquement la langue
<TextBlock blok={textBlok} lang={currentLang} />
```

### **2. Mise en Valeur des Phrases**
```typescript
// Dans Storyblok: "Art déco,Années Folles,1925"
// Résultat: Texte avec <span className="text-accent">phrase</span>
```

### **3. Styles Art Déco Intégrés**
- **Hero**: Très grands titres avec tracking-wider
- **Section**: Titres moyens avec espacement harmonieux  
- **Subsection**: Petits titres pour contenu détaillé

### **4. Animations Framer Motion**
- Préservation des animations existantes
- Transitions fluides lors des changements de contenu
- Compatible avec l'éditeur visuel

## 📋 **Plan de Migration**

### **Phase 1: Configuration ✅**
- [x] Installation SDK Storyblok
- [x] Configuration de base
- [x] Composants fondamentaux
- [x] Page de prévisualisation

### **Phase 2: Développement des Composants**
- [ ] Finaliser `HeroSection` avec animations
- [ ] Créer `AboutSection` avec blocs multiples
- [ ] Développer `PartnersSection`
- [ ] Implémenter `OnTheWaySection` 
- [ ] Construire `DecoBallSection`
- [ ] Finaliser `ContactSection`

### **Phase 3: Configuration Storyblok Space**
- [ ] Créer l'espace Storyblok
- [ ] Définir les schémas de contenu
- [ ] Configurer les champs bilingues
- [ ] Paramétrer l'éditeur visuel

### **Phase 4: Migration du Contenu**
- [ ] Importer le contenu existant
- [ ] Tester l'éditeur visuel
- [ ] Valider les traductions
- [ ] Optimiser les performances

### **Phase 5: Production**
- [ ] Tests complets
- [ ] Configuration des webhooks
- [ ] Mise en production
- [ ] Formation utilisateur

## 🔗 **URLs de Test**

### **Prévisualisation**
- Local: `http://localhost:3006/storyblok-preview`
- Production: `https://your-domain.com/storyblok-preview`

### **Éditeur Visuel Storyblok**
Une fois configuré, l'éditeur visuel permettra de:
- ✏️ Modifier le contenu en temps réel
- 🌍 Switcher entre FR/EN directement
- 🎨 Prévisualiser les changements instantanément
- 📱 Tester sur tous les breakpoints

## 🎯 **Avantages de cette Architecture**

### **Pour les Développeurs**
- **Type Safety** complète avec TypeScript
- **Performance optimale** avec Next.js SSG/ISR
- **Maintenance facile** avec composants modulaires
- **Animations préservées** via Framer Motion

### **Pour les Éditeurs**
- **Interface intuitive** avec l'éditeur visuel Storyblok
- **Contenu bilingue unifié** dans un seul interface
- **Prévisualisation en temps réel** sur le vrai site
- **Pas de risque de casser le design** grâce aux composants contraints

### **Pour les Performances**
- **Génération statique** avec `getStaticProps`
- **Cache intelligent** avec revalidation ISR
- **Bundle optimisé** sans overhead CMS
- **SEO parfait** avec contenu pré-rendu

## ⚡ **Commandes Utiles**

```bash
# Développement
pnpm dev

# Build avec Storyblok
pnpm build

# Types Storyblok (optionnel)
npx storyblok pull-components --space=YOUR_SPACE_ID

# Test de l'intégration
curl "http://localhost:3006/storyblok-preview"
```

---

**🎭 Ready to transform your Art Déco festival into a modern, editable experience!**