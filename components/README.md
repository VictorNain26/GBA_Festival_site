# Components Architecture

Cette documentation décrit l'architecture des composants pour les sections du site festival.

## Vue d'ensemble

Le site utilise une architecture basée sur des composants réutilisables pour garantir la cohérence et la maintenabilité.

## Composants principaux

### SectionGroup (Recommandé)
**Fichier**: `SectionGroup.tsx`
**Utilisation**: Groupe titre + contenu avec espacement optimisé

```tsx
<SectionGroup id="about" title={NAV_LABELS[lang].about}>
  <div>Contenu de la section...</div>
</SectionGroup>
```

**Caractéristiques**:
- Combine titre et contenu en une seule structure
- Espacement optimisé entre titre et contenu
- Navigation anchor sur le titre
- Réduit l'espace vertical excessif
- Code simplifié et maintenable

### SectionTitle
**Fichier**: `SectionTitle.tsx`
**Utilisation**: Titres de sections avec cadre décoratif

```tsx
<SectionTitle>
  {NAV_LABELS[lang].about}
</SectionTitle>
```

**Caractéristiques**:
- Utilise `TitleFrame` avec l'image `partners_frame.png`
- Animation Framer Motion intégrée
- Responsive design automatique
- Marges adaptées au menu latéral


### TitleFrame
**Fichier**: `TitleFrame.tsx`
**Utilisation**: Composant bas niveau pour les cadres avec décoration

**Caractéristiques**:
- Image `partners_frame.png` en arrière-plan
- Dimensions responsive avec `min-h` adaptatif
- Padding optimisé pour tous les écrans
- Z-index management pour superposition correcte

### Frame
**Fichier**: `Frame.tsx`
**Utilisation**: Composant bas niveau pour les contenus sans décoration

**Caractéristiques**:
- Padding responsive uniquement
- Pas d'image de fond
- Structure simple et légère

## Structure responsive

### Breakpoints
- `xs`: 475px
- `sm`: 640px
- `lg`: 1024px
- `xl`: 1280px

### Dimensions adaptatives

#### TitleFrame
```css
min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] xl:min-h-[200px]
```

#### Padding horizontal
```css
px-8 xs:px-12 sm:px-16 lg:px-20 xl:px-24
```

#### Marges pour le menu latéral
```css
mx-8 xs:mx-12 sm:mx-16 lg:mr-48 lg:ml-12 xl:mr-56 xl:ml-16 2xl:mr-64 2xl:ml-20
```

## Pattern d'utilisation

### Section complète avec SectionGroup (Recommandé)
```tsx
<SectionGroup id="sectionid" title={NAV_LABELS[lang].sectionname}>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.2 }}
  >
    {/* Contenu... */}
  </motion.div>
</SectionGroup>
```

### Section complète typique (ancienne méthode)
```tsx
{/* Section Titre */}
<section id="sectionid" className="relative flex flex-col justify-center py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28">
  <SectionTitle>
    {NAV_LABELS[lang].sectionname}
  </SectionTitle>
</section>

{/* Section Contenu - Ancienne méthode avec SectionContent supprimé */}
```

## Avantages de cette architecture

1. **Maintenabilité**: Modifications centralisées dans les composants de base
2. **Cohérence**: Apparence et comportement uniformes
3. **Réutilisabilité**: Composants facilement réutilisables
4. **Performance**: Optimisations centralisées (images, animations)
5. **Accessibilité**: Standards appliqués de manière cohérente
6. **Responsive**: Comportement adaptatif intégré

## Modifications futures

Pour modifier l'apparence globale :
- **Espacement**: Modifier `SectionTitle.tsx` et `SectionContent.tsx`
- **Animations**: Ajuster les paramètres dans `SectionTitle.tsx`
- **Cadres**: Modifier `TitleFrame.tsx` pour changer l'image ou les dimensions
- **Marges menu**: Ajuster les classes dans les composants de niveau supérieur