# 🏗️ Architecture Storyblok Robuste - Festival Site

## 🎯 Principe : SIMPLICITÉ = FIABILITÉ

**Choix technique :** Champs **Text** au lieu de **Rich Text** 
- ✅ **Fonctionnent avec React 19/Next.js 15**
- ✅ **Plus simples pour votre cliente**
- ✅ **Pas d'erreurs de rendu**
- ✅ **Performance optimale**

---

## 📝 Bloks à Créer dans Storyblok (VERSION ROBUSTE)

### **1. hero-section**
```yaml
Champs:
- subtitle_fr: Text
- subtitle_en: Text  
- date_fr: Text
- date_en: Text
- hotel_name_fr: Text
- hotel_name_en: Text
- location: Text
- cta_text_fr: Text
- cta_text_en: Text
```

### **2. about-section**
```yaml
Champs:
- title_fr: Text
- title_en: Text
- paragraph_1_fr: Textarea
- paragraph_1_en: Textarea
- paragraph_2_fr: Textarea  
- paragraph_2_en: Textarea
- paragraph_3_fr: Textarea
- paragraph_3_en: Textarea
- paragraph_4_fr: Textarea
- paragraph_4_en: Textarea
- target_title_fr: Text
- target_title_en: Text
- target_text_fr: Textarea
- target_text_en: Textarea
- objective_title_fr: Text
- objective_title_en: Text
- objective_text_fr: Textarea
- objective_text_en: Textarea
```

### **3. partners-section**  
```yaml
Champs:
- title_fr: Text
- title_en: Text
- intro_fr: Textarea
- intro_en: Textarea
- collaboration_fr: Textarea
- collaboration_en: Textarea
```

### **4. ontheway-section**
```yaml
Champs:
- title_fr: Text
- title_en: Text
- section_1_fr: Textarea
- section_1_en: Textarea
- section_2_fr: Textarea
- section_2_en: Textarea
- section_3_fr: Textarea
- section_3_en: Textarea
- section_4_fr: Textarea
- section_4_en: Textarea
- section_5_fr: Textarea
- section_5_en: Textarea
```

### **5. decoball-section**
```yaml
Champs:
- title_fr: Text
- title_en: Text
- intro_text_fr: Textarea
- intro_text_en: Textarea
```

### **6. contact-section**
```yaml
Champs:
- title_fr: Text
- title_en: Text
- heading_fr: Text
- heading_en: Text
- intro_fr: Textarea
- intro_en: Textarea
- phone: Text
- email: Text
- website: Text
- whatsapp_fr: Text
- whatsapp_en: Text
```

---

## 🎨 Avantages de cette Approche

### **Pour Votre Cliente**
- ✅ **Édition super simple** : juste taper du texte
- ✅ **Pas de formatage complexe** à gérer
- ✅ **Impossible de casser le design**
- ✅ **Interface Storyblok épurée**

### **Pour Vous (Développeur)**
- ✅ **Zéro erreur de rendu** 
- ✅ **Code propre et maintenable**
- ✅ **Performance optimale**
- ✅ **Compatible React 19/Next.js 15**

### **Pour le Projet**
- ✅ **Fiabilité totale**
- ✅ **Build qui fonctionne toujours**
- ✅ **Visual Editor opérationnel**
- ✅ **Design exactement préservé**

---

## 🔧 Comment Modifier la Configuration

1. **Supprimez tous les champs Rich Text** de vos bloks Storyblok
2. **Remplacez par des champs Text/Textarea** selon le schéma ci-dessus  
3. **Re-remplissez le contenu** (copier-coller le texte existant)
4. **L'édition visuelle fonctionnera parfaitement**

---

## 💡 Gestion du Formatage

### **Texte avec Accent (Rouge)**
Votre cliente peut utiliser des **marqueurs simples** :
- `[accent]texte en rouge[/accent]` → devient rouge automatiquement
- `[bold]texte en gras[/bold]` → devient gras automatiquement

### **Exemple**
```
Texte: "Depuis plus de cent ans [accent]l'Art déco[/accent] séduit le monde"
Rendu: "Depuis plus de cent ans l'Art déco séduit le monde" (avec "l'Art déco" en rouge)
```

Cette approche est **infiniment plus fiable** que Rich Text !

---

## ✨ Résultat Final

- ✅ **Site qui fonctionne à 100%**  
- ✅ **Édition visuelle parfaite**
- ✅ **Design exactement identique**
- ✅ **Votre cliente autonome**
- ✅ **Code professionnel et robuste**