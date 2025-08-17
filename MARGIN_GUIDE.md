# Guide des marges - Festival Site

## 📏 Nouvelles marges appliquées

### Système de marges responsive pour éviter le débordement sur le menu

| Breakpoint | Marges gauche/droite | Pixels approximatifs |
|------------|----------------------|---------------------|
| **Mobile** (< 480px) | `mx-8` | 32px chaque côté |
| **Mobile large** (480px+) | `mx-12` | 48px chaque côté |
| **Tablette** (640px+) | `mx-16` | 64px chaque côté |
| **Desktop** (1024px+) | `mr-48 ml-12` | 192px droite, 48px gauche |
| **Desktop XL** (1280px+) | `mr-56 ml-16` | 224px droite, 64px gauche |
| **Desktop 2XL** (1440px+) | `mr-64 ml-20` | 256px droite, 80px gauche |

## 🎯 Zones concernées

### SectionTitle (Titres avec cadre)
- Utilise `TitleFrame` avec marges asymétriques
- Plus d'espace à droite pour éviter le menu de navigation

### SectionGroup (Contenu des sections)
- Marges cohérentes avec les titres
- Contenu aligné dans le même espace

### Section Contact
- Marges symétriques car pas de menu dans cette section
- Padding horizontal augmenté pour cohérence

## ✅ Avantages

1. **Évite le débordement** sur le menu de navigation fixe
2. **Cohérence visuelle** entre tous les contenus
3. **Responsive optimal** sur tous les écrans
4. **Lisibilité améliorée** avec plus d'espace de respiration

## 🔧 Classes utilisées

```css
/* Composants SectionTitle et SectionGroup */
mx-8 xs:mx-12 sm:mx-16 lg:mr-48 lg:ml-12 xl:mr-56 xl:ml-16 2xl:mr-64 2xl:ml-20

/* Section Contact (centrée) */
px-8 xs:px-12 sm:px-16 lg:px-20 xl:px-24 2xl:px-32
```