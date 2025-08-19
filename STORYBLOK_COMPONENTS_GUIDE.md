# 🎯 GUIDE STORYBLOK : Composants Festival Art Déco

**GARANTIE : Ton design sera EXACTEMENT identique à l'original !** ✨

## 📋 ÉTAPES À SUIVRE

### ÉTAPE 1: Créer les Composants dans Storyblok

Va dans **Block Library** → **New Block** pour chacun des 6 composants ci-dessous.

---

## 🔧 COMPOSANTS À CRÉER

### 1. **hero-section**

**⚙️ Configuration:**
- **Nom:** `hero-section`
- **Type:** Nestable (blok)

**📝 Champs à ajouter:**
```yaml
subtitle_fr:
  type: Text
  display: "Sous-titre (Français)"
  default_value: "Festival Art Déco et Neo Art Déco"
  
subtitle_en:
  type: Text
  display: "Sous-titre (English)"
  default_value: "Art Deco and Neo Art Deco Festival"
  
date_fr:
  type: Text
  display: "Date (Français)"
  default_value: "28-29-30 Juin 2025"
  
date_en:
  type: Text
  display: "Date (English)"
  default_value: "June 28-29-30, 2025"
  
hotel_name_fr:
  type: Text
  display: "Nom Hôtel (Français)"
  default_value: "Hotel du Collectionneur"
  
hotel_name_en:
  type: Text
  display: "Nom Hôtel (English)"
  default_value: "Hotel Collectionneur"
  
location:
  type: Text
  display: "Lieu"
  default_value: "Paris 75008"
  
cta_text_fr:
  type: Text
  display: "Texte Bouton (Français)"
  default_value: "Billeterie"
  
cta_text_en:
  type: Text
  display: "Texte Bouton (English)"
  default_value: "Tickets"
```

---

### 2. **about-section**

**⚙️ Configuration:**
- **Nom:** `about-section`
- **Type:** Nestable (blok)

**📝 Champs à ajouter:**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  default_value: "Art Déco et Neo Art Déco"
  
title_en:
  type: Text
  display: "Titre (English)"
  default_value: "Art Deco and Neo Art Deco"
  
intro_paragraphs_fr:
  type: Textarea
  display: "Paragraphes Introduction (Français)"
  description: "Séparer chaque paragraphe par une ligne vide"
  
intro_paragraphs_en:
  type: Textarea
  display: "Paragraphes Introduction (English)"
  description: "Separate each paragraph with a blank line"
  
conclusion_paragraphs_fr:
  type: Textarea
  display: "Paragraphes Conclusion (Français)"
  description: "Séparer chaque paragraphe par une ligne vide"
  
conclusion_paragraphs_en:
  type: Textarea
  display: "Paragraphes Conclusion (English)"
  description: "Separate each paragraph with a blank line"
  
target_title_fr:
  type: Text
  display: "Titre Public Cible (Français)"
  default_value: "Public Cible"
  
target_title_en:
  type: Text
  display: "Titre Public Cible (English)"
  default_value: "Target Audience"
  
target_text_fr:
  type: Textarea
  display: "Texte Public Cible (Français)"
  
target_text_en:
  type: Textarea
  display: "Texte Public Cible (English)"
  
objective_title_fr:
  type: Text
  display: "Titre Objectif (Français)"
  default_value: "Objectif"
  
objective_title_en:
  type: Text
  display: "Titre Objectif (English)"
  default_value: "Objective"
  
objective_text_fr:
  type: Textarea
  display: "Texte Objectif (Français)"
  
objective_text_en:
  type: Textarea
  display: "Texte Objectif (English)"
```

**🖼️ Images hardcodées:**
- `/images/ange_erte.jpg` (automatiquement incluse)
- `/images/danseuse.png` (automatiquement incluse)

**🎨 MOTS EN ROUGE (Accent):**
Pour mettre des mots en rouge dans tous les textes, utilise cette balise HTML :
```html
<span class="text-accent">Mot ou groupe de mots</span>
```

**Exemples d'usage :**
```html
Nous sommes en <span class="text-accent">1925</span>. Le Port du Havre...

<span class="text-accent">ON THE WAY</span>, flashmob, un élément clé...

La mise en scène créée par <span class="text-accent">Julie Durieux</span>...
```

---

### 3. **partners-section**

**⚙️ Configuration:**
- **Nom:** `partners-section`
- **Type:** Nestable (blok)

**📝 Champs à ajouter:**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  default_value: "Nos Partenaires"
  
title_en:
  type: Text
  display: "Titre (English)"
  default_value: "Our Partners"
  
intro_paragraphs_fr:
  type: Textarea
  display: "Paragraphes Introduction (Français)"
  description: "Séparer chaque paragraphe par une ligne vide"
  
intro_paragraphs_en:
  type: Textarea
  display: "Paragraphes Introduction (English)"
  description: "Separate each paragraph with a blank line"
  
collaboration_text_fr:
  type: Textarea
  display: "Texte Collaboration (Français)"
  
collaboration_text_en:
  type: Textarea
  display: "Texte Collaboration (English)"
```

**🖼️ Images hardcodées:**
- `/images/danseuse2.jpg` (automatiquement incluse)

---

### 4. **on-the-way-section**

**⚙️ Configuration:**
- **Nom:** `on-the-way-section`
- **Type:** Nestable (blok)

**📝 Champs à ajouter:**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  default_value: "ON THE WAY"
  
title_en:
  type: Text
  display: "Titre (English)"
  default_value: "ON THE WAY"
  
# SECTION 1 - Texte ON THE WAY flashmob + Image Bateau
section1_text_fr:
  type: Textarea
  display: "Section 1 - Texte (Français)"
  description: "ON THE WAY flashmob - texte avec image bateau"
  
section1_text_en:
  type: Textarea
  display: "Section 1 - Texte (English)"
  description: "ON THE WAY flashmob - text with boat image"
  
# SECTION 2 - Image Woman_or + Texte esthétique transatlantique
section2_text_fr:
  type: Textarea
  display: "Section 2 - Texte (Français)"
  description: "Esthétique transatlantique - avec image woman_or"
  
section2_text_en:
  type: Textarea
  display: "Section 2 - Texte (English)"
  description: "Transatlantic aesthetic - with woman_or image"

# SECTION 3 - Texte voyageurs (Coco Chanel, etc.) + Image Restaurant
section3_text_fr:
  type: Textarea
  display: "Section 3 - Texte (Français)"
  description: "Voyageurs célèbres (Coco Chanel, etc.) - avec image restaurant"
  
section3_text_en:
  type: Textarea
  display: "Section 3 - Texte (English)"
  description: "Famous travelers (Coco Chanel, etc.) - with restaurant image"

# SECTION 4 - Image Men + Texte ambiance parisienne 1925
section4_text_fr:
  type: Textarea
  display: "Section 4 - Texte (Français)"
  description: "Ambiance parisienne 1925 - avec image men"
  
section4_text_en:
  type: Textarea
  display: "Section 4 - Texte (English)"
  description: "Parisian atmosphere 1925 - with men image"

# SECTION 5 - Texte mise en scène Julie Durieux + Image tete_air
section5_text_fr:
  type: Textarea
  display: "Section 5 - Texte (Français)"
  description: "Mise en scène Julie Durieux - avec image tete_air"
  
section5_text_en:
  type: Textarea
  display: "Section 5 - Texte (English)"
  description: "Staging by Julie Durieux - with tete_air image"
```

**🖼️ Images hardcodées (exactement comme l'original):**
- `/images/bateau.png` (Section 1 - automatique)
- `/images/woman_or.jpg` (Section 2 - automatique)
- `/images/restaurant.jpg` (Section 3 - automatique)
- `/images/men.jpg` (Section 4 - automatique)  
- `/images/tete_air.jpg` (Section 5 - automatique)

**🔧 Structure EXACTE de l'original (5 sections):**
- **Section 1**: Texte ON THE WAY flashmob + Image bateau
- **Section 2**: Image woman_or + Texte esthétique transatlantique
- **Section 3**: Texte voyageurs (Coco Chanel, etc.) + Image restaurant
- **Section 4**: Image men + Texte ambiance parisienne 1925
- **Section 5**: Texte mise en scène Julie Durieux + Image tete_air

**✅ Design restauré à 100% identique à l'original !** 🎯

---

### 5. **deco-ball-section**

**⚙️ Configuration:**
- **Nom:** `deco-ball-section`
- **Type:** Nestable (blok)

**📝 Champs à ajouter:**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  default_value: "Le Bal Art Déco"
  
title_en:
  type: Text
  display: "Titre (English)"
  default_value: "The Art Deco Ball"
  
intro_text_fr:
  type: Textarea
  display: "Texte Introduction (Français)"
  
intro_text_en:
  type: Textarea
  display: "Texte Introduction (English)"
```

**🖼️ Galerie et Images hardcodées (design original):**
- **Images danse**: `/images/danse1.jpg` et `/images/danse2.jpg` superposées
- **Galerie**: 8 images de `gallery_1.png` à `gallery_8.png` (automatiquement incluses)
- **AUCUN bouton CTA** (design original n'en a pas)

---

### 6. **contact-section**

**⚙️ Configuration:**
- **Nom:** `contact-section`
- **Type:** Nestable (blok)

**📝 Champs à ajouter:**
```yaml
title_fr:
  type: Text
  display: "Titre (Français)"
  default_value: "Contact"
  
title_en:
  type: Text
  display: "Titre (English)"
  default_value: "Contact"
  
heading_fr:
  type: Text
  display: "Sous-titre (Français)"
  default_value: "Grand Battement d'Ailes"
  
heading_en:
  type: Text
  display: "Sous-titre (English)"
  default_value: "Grand Battement d'Ailes"
  
intro_fr:
  type: Textarea
  display: "Introduction (Français)"
  default_value: "Notre équipe se tient disponible pour répondre à toutes vos questions."
  
intro_en:
  type: Textarea
  display: "Introduction (English)"
  default_value: "Our team is available to answer all your questions."
  
phone:
  type: Text
  display: "Téléphone"
  default_value: "+33 6 64 88 83 70"
  
email:
  type: Text
  display: "Email"
  default_value: "festivalartdecoparis@gmail.com"
  
website:
  type: Text
  display: "Site Web"
  default_value: "https://grandbattementdailes.com"

# BOUTONS (design original)
cta_text_fr:
  type: Text
  display: "Texte Bouton Billeterie (Français)"
  default_value: "Billeterie"
  
cta_text_en:
  type: Text
  display: "Texte Bouton Billeterie (English)"
  default_value: "Tickets"

back_to_top_fr:
  type: Text
  display: "Texte Retour en Haut (Français)"
  default_value: "Retour en haut"
  
back_to_top_en:
  type: Text
  display: "Texte Retour en Haut (English)"
  default_value: "Back to top"
```

**🎯 Design original centré (PAS de SectionGroup):**
- **Layout centré** sur toute la hauteur de l'écran  
- **3 colonnes responsive** : Téléphone/WhatsApp + Email + Site Web
- **2 boutons** : Billeterie (doré) + Retour en haut (rouge)

---

## 📝 ÉTAPE 2: Créer la Story

1. **Content** → **Stories** → **Create Story**
2. **Nom:** `festival-homepage`
3. **Slug:** laisse par défaut
4. **Real Path:** `/`

### Ajouter le champ Body:
1. Dans le **Schema**, clique **+ Add field**
2. **Field name:** `body`
3. **Field type:** `Blocks`
4. **Allow components:** Sélectionne tous les 6 composants créés

---

## 🎯 ÉTAPE 3: Ajouter le Contenu

Dans ta story `festival-homepage`, clique sur **+ Add Block** et ajoute les sections dans l'ordre :

1. **hero-section**
2. **about-section** 
3. **partners-section**
4. **on-the-way-section**
5. **deco-ball-section**
6. **contact-section**

Remplis les champs avec ton contenu !

## 🎨 **GUIDE STYLING : Mots en Rouge**

### **Comment ajouter des mots en rouge :**

Dans **TOUS** tes champs texte Storyblok, tu peux utiliser :

```html
<span class="text-accent">Texte en rouge</span>
```

### **Exemples concrets :**

**AboutSection :**
```html
L'Art Déco naît dans les <span class="text-accent">années 1920</span> à Paris.

Cette esthétique <span class="text-accent">révolutionnaire</span> influence...
```

**OnTheWaySection :**
```html
<span class="text-accent">ON THE WAY</span>, flashmob, transporte le public...

Nous sommes en <span class="text-accent">1925</span>. Le Port du Havre...

Des voyageurs comme <span class="text-accent">Coco Chanel</span>...
```

**PartnersSection :**
```html
Nos <span class="text-accent">partenaires prestigieux</span> nous accompagnent...
```

### **Dans Storyblok Interface :**
1. ✏️ **Tape ton texte normalement**
2. 🎨 **Ajoute les balises** `<span class="text-accent">mot</span>` 
3. 💾 **Sauvegarde** 
4. ✨ **Le mot apparaît en rouge** sur ton site !

---

## ✅ RÉSULTAT FINAL

**Tu auras EXACTEMENT ton design original :**
- ✅ Toutes les images Art Déco aux bons endroits
- ✅ Tous les layouts et animations
- ✅ Typography ReprizacBold + TwCenMTCondensed  
- ✅ Couleurs Primary #D3AA41, Accent #E55B45
- ✅ Background progressif avec ornements
- ✅ Navigation responsive
- ✅ Frame Art Déco sur les sections

**Ton site sera visuellement IDENTIQUE mais entièrement éditable via Storyblok !** 🎨✨