# 🎯 MISE À JOUR RICH TEXT - TOUS LES COMPOSANTS

## CHANGEMENTS REQUIS DANS STORYBLOK

### **IMPORTANT : Change TOUS les types de champs**

Dans Storyblok, tu dois changer **TOUS** les champs de type `Textarea` en `Richtext` :

### 1. **about-section**
```yaml
title_fr: Richtext (au lieu de Text)
title_en: Richtext (au lieu de Text)
intro_paragraphs_fr: Richtext (au lieu de Textarea)
intro_paragraphs_en: Richtext (au lieu de Textarea)
conclusion_paragraphs_fr: Richtext (au lieu de Textarea)
conclusion_paragraphs_en: Richtext (au lieu de Textarea)
target_title_fr: Richtext (au lieu de Text)
target_title_en: Richtext (au lieu de Text)
target_text_fr: Richtext (au lieu de Textarea)
target_text_en: Richtext (au lieu de Textarea)
objective_title_fr: Richtext (au lieu de Text)
objective_title_en: Richtext (au lieu de Text)
objective_text_fr: Richtext (au lieu de Textarea)
objective_text_en: Richtext (au lieu de Textarea)
```

### 2. **partners-section**
```yaml
title_fr: Richtext
title_en: Richtext
intro_paragraphs_fr: Richtext
intro_paragraphs_en: Richtext
collaboration_text_fr: Richtext
collaboration_text_en: Richtext
```

### 3. **on-the-way-section**
```yaml
title_fr: Richtext
title_en: Richtext
section1_text_fr: Richtext
section1_text_en: Richtext
section2_text_fr: Richtext
section2_text_en: Richtext
section3_text_fr: Richtext
section3_text_en: Richtext
section4_text_fr: Richtext
section4_text_en: Richtext
section5_text_fr: Richtext
section5_text_en: Richtext
```

### 4. **deco-ball-section**
```yaml
title_fr: Richtext
title_en: Richtext
intro_text_fr: Richtext
intro_text_en: Richtext
```

### 5. **contact-section**
```yaml
title_fr: Richtext
title_en: Richtext
heading_fr: Richtext
heading_en: Richtext
intro_fr: Richtext
intro_en: Richtext
phone: Text (reste en Text - c'est juste un numéro)
email: Text (reste en Text - c'est juste un email)
website: Text (reste en Text - c'est juste une URL)
cta_text_fr: Richtext
cta_text_en: Richtext
back_to_top_fr: Richtext
back_to_top_en: Richtext
```

### 6. **hero-section**
```yaml
subtitle_fr: Richtext
subtitle_en: Richtext
date_fr: Richtext
date_en: Richtext
hotel_name_fr: Richtext
hotel_name_en: Richtext
location: Richtext
cta_text_fr: Richtext
cta_text_en: Richtext
```

## 🎨 COMMENT UTILISER L'ÉDITEUR RICH TEXT

### **Pour mettre du texte en rouge :**

1. **Tape ton texte** normalement
2. **Sélectionne le mot** que tu veux en rouge
3. **Dans la barre d'outils** :
   - Clique sur l'icône **A** avec la couleur
   - Choisis **Rouge** ou tape **#E55B45**
4. **C'est fait !**

### **Autres formatages disponibles :**
- **Gras** : Sélectionne + **B**
- **Italique** : Sélectionne + **I**
- **Titre** : Sélectionne + **H**
- **Liste** : Bouton liste
- **Lien** : Sélectionne + icône chaîne

### **Exemple de texte avec formatage :**
```
L'Art Déco naît dans les [rouge]années 1920[/rouge] à Paris.

Cette esthétique [rouge]révolutionnaire[/rouge] influence...

[rouge]ON THE WAY[/rouge], flashmob, transporte le public...
```

## ✅ AVANTAGES POUR LA CLIENTE

- **Interface visuelle** comme Word
- **Pas de code** à toucher
- **Aperçu immédiat** des couleurs
- **Copier-coller** depuis Word fonctionne
- **Annuler** avec Ctrl+Z

## 🚀 LE CODE EST DÉJÀ PRÊT

Les composants sont déjà configurés pour accepter le Rich Text. Une fois que tu changes les types de champs dans Storyblok, tout fonctionnera automatiquement !