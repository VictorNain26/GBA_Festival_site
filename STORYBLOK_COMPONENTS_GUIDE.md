# 🎯 GUIDE COMPLET : Composants Storyblok pour Festival Art Déco

Ce guide détaille EXACTEMENT tous les composants à créer dans Storyblok pour reproduire parfaitement ton design original.

## ✅ COMPOSANTS TERMINÉS

### 1. **hero-section**
**Nom technique :** `hero-section`  
**Type :** Nestable (blok)

**Champs :**
```yaml
subtitle_fr:
  type: Text
  display: "Sous-titre (Français)"
  
subtitle_en:
  type: Text
  display: "Sous-titre (English)"
  
date_fr:
  type: Text
  display: "Date (Français)"
  
date_en:
  type: Text
  display: "Date (English)"
  
hotel_name_fr:
  type: Text
  display: "Nom Hôtel (Français)"
  
hotel_name_en:
  type: Text
  display: "Nom Hôtel (English)"
  
location:
  type: Text
  display: "Lieu"
  
cta_text_fr:
  type: Text
  display: "Texte Bouton (Français)"
  
cta_text_en:
  type: Text
  display: "Texte Bouton (English)"
```

**Contenu suggéré :**
```yaml
subtitle_fr: "Festival Art Déco et Neo Art Déco"
subtitle_en: "Art Deco and Neo Art Deco Festival"
date_fr: "28-29-30 Juin 2025"
date_en: "June 28-29-30, 2025"
hotel_name_fr: "Hotel du Collectionneur"
hotel_name_en: "Hotel Collectionneur"
location: "Paris 75008"
cta_text_fr: "Billeterie"
cta_text_en: "Tickets"
```

### 2. **about-section**
**Nom technique :** `about-section`  
**Type :** Nestable (blok)

**Champs :**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  
title_en:
  type: Text
  display: "Titre (English)"
  
intro_paragraphs_fr:
  type: Table
  display: "Paragraphes Introduction (Français)"
  
intro_paragraphs_en:
  type: Table
  display: "Paragraphes Introduction (English)"
  
conclusion_paragraphs_fr:
  type: Table
  display: "Paragraphes Conclusion (Français)"
  
conclusion_paragraphs_en:
  type: Table
  display: "Paragraphes Conclusion (English)"
  
target_title_fr:
  type: Text
  display: "Titre Public Cible (Français)"
  
target_title_en:
  type: Text
  display: "Titre Public Cible (English)"
  
target_text_fr:
  type: Textarea
  display: "Texte Public Cible (Français)"
  
target_text_en:
  type: Textarea
  display: "Texte Public Cible (English)"
  
objective_title_fr:
  type: Text
  display: "Titre Objectif (Français)"
  
objective_title_en:
  type: Text
  display: "Titre Objectif (English)"
  
objective_text_fr:
  type: Textarea
  display: "Texte Objectif (Français)"
  
objective_text_en:
  type: Textarea
  display: "Texte Objectif (English)"
```

### 3. **partners-section**
**Nom technique :** `partners-section`  
**Type :** Nestable (blok)

**Champs :**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  
title_en:
  type: Text
  display: "Titre (English)"
  
intro_paragraphs_fr:
  type: Table
  display: "Paragraphes Introduction (Français)"
  
intro_paragraphs_en:
  type: Table
  display: "Paragraphes Introduction (English)"
  
collaboration_text_fr:
  type: Textarea
  display: "Texte Collaboration (Français)"
  
collaboration_text_en:
  type: Textarea
  display: "Texte Collaboration (English)"
```

### 4. **on-the-way-section**
**Nom technique :** `on-the-way-section`  
**Type :** Nestable (blok)

**Champs :**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  
title_en:
  type: Text
  display: "Titre (English)"
  
first_text_fr:
  type: Textarea
  display: "Premier Texte (Français)"
  
first_text_en:
  type: Textarea
  display: "Premier Texte (English)"
  
second_text_fr:
  type: Textarea
  display: "Deuxième Texte (Français)"
  
second_text_en:
  type: Textarea
  display: "Deuxième Texte (English)"
```

**Contenu suggéré :**
```yaml
title_fr: "ON THE WAY"
title_en: "ON THE WAY"
first_text_fr: '<span class="text-accent">ON THE WAY</span>, flashmob, un élément clé de notre soirée, transporte le public au cœur de l\'effervescence de l\'entre-deux-guerres.<br /><br />Nous sommes en <span class="text-accent">1925</span>. Le Port du Havre et la Gare de Paris. Les départs et les arrivées, les émotions, les sentiments.'
second_text_fr: 'Une esthétique transatlantique… Au bord de fameux paquebot <span class="text-accent">Normandie</span> les spectateurs sont invités à faire un extraordinaire voyage dirigé par le <span class="text-accent">Vieux Loup de Mer</span>, en compagnie célébrités et personnages historiques qui les accompagnent le long toute la soirée.'
```

**Images utilisées :**
- `/images/bateau.png` (première colonne)
- `/images/woman_or.jpg` (deuxième colonne)

### 5. **deco-ball-section**
**Nom technique :** `deco-ball-section`  
**Type :** Nestable (blok)

**Champs :**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  
title_en:
  type: Text
  display: "Titre (English)"
  
intro_text_fr:
  type: Textarea
  display: "Texte Introduction (Français)"
  
intro_text_en:
  type: Textarea
  display: "Texte Introduction (English)"
  
cta_text_fr:
  type: Text
  display: "Texte Bouton CTA (Français)"
  
cta_text_en:
  type: Text
  display: "Texte Bouton CTA (English)"
  
cta_link:
  type: Text
  display: "Lien CTA"
```

**Galerie d'images hardcodée :**
- `gallery_1.png` à `gallery_8.png` (8 images de galerie)

### 6. **contact-section**
**Nom technique :** `contact-section`  
**Type :** Nestable (blok)

**Champs :**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  
title_en:
  type: Text
  display: "Titre (English)"
  
address_title_fr:
  type: Text
  display: "Titre Adresse (Français)"
  
address_title_en:
  type: Text
  display: "Titre Adresse (English)"
  
address_lines:
  type: Table
  display: "Lignes Adresse"
  
contact_title_fr:
  type: Text
  display: "Titre Contact (Français)"
  
contact_title_en:
  type: Text
  display: "Titre Contact (English)"
  
phone:
  type: Text
  display: "Téléphone"
  
email:
  type: Text
  display: "Email"
  
website:
  type: Text
  display: "Site Web"
```

---

## 📋 ÉTAPES DE CRÉATION

1. **Créer les composants** dans Block Library
2. **Ajouter les champs** exactement comme spécifié
3. **Créer une Story** `festival-homepage`
4. **Ajouter un champ `body`** de type Blocks
5. **Ajouter les sections** une par une
6. **Remplir le contenu** avec les valeurs suggérées

## ✨ RÉSULTAT ATTENDU

Avec cette configuration, tu retrouveras **EXACTEMENT** :
- ✅ Toutes les images Art Déco (ange_erte.jpg, danseuse.png, danseuse2.jpg, etc.)
- ✅ Le background progressif avec ornements
- ✅ La navigation responsive
- ✅ Tous les layouts et animations
- ✅ Le design original INTACT

**Le site sera visuellement IDENTIQUE à l'original !** 🎨