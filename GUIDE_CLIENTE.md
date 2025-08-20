# 🎨 Guide d'Utilisation - Édition Storyblok

**Site Festival Art Déco - Interface d'édition pour votre cliente**

---

## 🚀 Configuration Terminée

✅ **Intégration complète Storyblok en place**
- Page principale (`/`) maintenant éditable visuellement
- Design exactement identique préservé
- Tous les composants Storyblok créés et fonctionnels

---

## 📋 Ce qui a été mis en place

### **1. Page Principale Storyblok**
- **URL**: `/` (page d'accueil)
- **Édition**: Cliquer directement sur les éléments depuis Storyblok Studio
- **Sections éditables**:
  - ✅ Hero (titre, sous-titre, date, lieu, bouton)
  - ✅ About (tout le contenu et images)
  - ✅ Partners (textes et collaborations)
  - ✅ On The Way (toutes les sections)
  - ✅ Deco Ball (programme et informations)
  - ✅ Contact (informations de contact)

### **2. Composants Storyblok Créés**
- `hero-section` - Section d'accueil
- `about-section` - Section À propos
- `partners-section` - Section Partenaires
- `ontheway-section` - Section On The Way
- `decoball-section` - Section Bal Art Déco
- `contact-section` - Section Contact

### **3. Configuration Technique**
- ✅ Visual Editor Bridge configuré
- ✅ API Routes Storyblok fonctionnelles
- ✅ Variables d'environnement configurées
- ✅ Build de production testé et réussi

---

## 🎯 Pour Votre Cliente

### **Comment Modifier le Contenu**

1. **Aller dans Storyblok Studio**
   - URL: https://app.storyblok.com/
   - Se connecter avec ses identifiants

2. **Éditer la Page d'Accueil**
   - Chercher la story "home" (ou le nom donné)
   - Cliquer sur "Edit" 
   - Le Visual Editor s'ouvre

3. **Édition Directe**
   - Cliquer sur n'importe quel élément de la page
   - Modifier le texte directement
   - Changer les dates, titres, descriptions
   - **Le design reste exactement identique**

4. **Sauvegarder**
   - Cliquer sur "Save"
   - Publier avec "Publish"

### **Types de Modifications Possibles**
- **Textes** : Tous les paragraphes, titres, sous-titres
- **Dates** : Date du festival, horaires  
- **Lieu** : Nom de l'hôtel, adresse
- **Contact** : Informations de contact
- **Boutons** : Texte des boutons d'action
- **Description** : Contenu des sections About, Partners, etc.

### **Avantages**
- ✅ **Aucun développeur nécessaire** pour les modifications de contenu
- ✅ **Design préservé** - impossible de "casser" le design
- ✅ **Édition en temps réel** - voir les changements immédiatement
- ✅ **Bilingue** - Modifier facilement français ET anglais
- ✅ **Responsive** - fonctionne sur tous les appareils

---

## ⚙️ Configuration Storyblok Requise

### **Variables d'Environnement**
```bash
# À ajouter dans .env.local
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=votre_token_ici
```

### **Structure dans Storyblok**
Votre space doit contenir :
- **Story**: "home" (page principale)
- **Content Type**: "page" avec champ "body" (Blocks)
- **Tous les bloks** listés dans `STORYBLOK_SETUP.md`

---

## 🔧 Pages de Test Disponibles

### **Page de Démonstration Hero**
- **URL**: `/storyblok-editor`
- **Usage**: Tester l'édition de la section Hero uniquement
- **Idéal pour** : Montrer le concept à votre cliente

### **Pages de Backup** 
- `/index-static-backup` : Version originale statique
- `/index-storyblok-backup` : Ancienne version mixte
- Ces pages restent intactes comme sauvegardes

---

## 📞 Support Technique

### **Si Problème d'Affichage**
1. Vérifier que le token Storyblok est correct
2. Vérifier que la story "home" existe et est publiée
3. Vérifier que tous les bloks sont créés dans Storyblok

### **Si Édition ne Fonctionne Pas**
1. S'assurer d'être connecté à Storyblok
2. Utiliser l'URL de preview depuis Storyblok Studio
3. Vérifier que les bloks ont bien les bons noms de champs

### **Messages d'Erreur**
- **"Mode Fallback"** : Données Storyblok non disponibles, vérifier la configuration
- **Sections vides** : Story non configurée ou bloks manquants

---

## ✨ Résultat Final

Votre cliente peut maintenant :
- ✅ Modifier tout le contenu du site
- ✅ Conserver le design exact
- ✅ Travailler en autonomie
- ✅ Publier instantanément
- ✅ Gérer le contenu bilingue

**Le site est prêt pour l'édition visuelle complète !** 🎉