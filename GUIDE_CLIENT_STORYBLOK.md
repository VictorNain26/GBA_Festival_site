# 📝 Guide d'Accès Client Storyblok
## Configuration de l'Éditeur pour votre Cliente

Ce guide vous explique comment donner accès à votre cliente pour qu'elle puisse modifier le contenu du site festival en toute sécurité.

---

## 🚀 Étapes Rapides pour Donner l'Accès

### 1️⃣ **Inviter votre Cliente**
1. Connectez-vous à votre espace Storyblok
2. Allez dans **Settings** (Paramètres) → **Users** (Utilisateurs)
3. Cliquez sur **"Add User"** ou **"Invite User"**
4. Entrez l'email de votre cliente
5. Choisissez le rôle **"Editor"** (ou un rôle personnalisé)
6. Cliquez sur **"Send Invite"**

### 2️⃣ **Rôle Recommandé : Editor**
Le rôle Editor permet à votre cliente de :
- ✅ Modifier tous les contenus du site
- ✅ Télécharger des images
- ✅ Prévisualiser les changements
- ❌ Ne peut pas supprimer le site
- ❌ Ne peut pas modifier les paramètres techniques
- ❌ Ne peut pas inviter d'autres utilisateurs

---

## 🛡️ Configuration Sécurisée pour un Client

### Option 1 : Utiliser le Rôle "Editor" par Défaut
**Idéal pour** : Clients qui doivent modifier tout le contenu

**Permissions incluses** :
- Édition de toutes les pages
- Upload d'images et médias
- Prévisualisation en temps réel
- Publication des changements

### Option 2 : Créer un Rôle Personnalisé "Client"
**Idéal pour** : Contrôle précis des permissions

#### Comment créer un rôle personnalisé :
1. **Settings** → **Roles** → **"Add new role"**
2. Nommez le rôle : **"Client - [Nom du Festival]"**
3. Configurez les permissions suivantes :

```
✅ Content & Editor
   ✅ Access Visual Editor
   ✅ Edit Content
   ✅ Publish Content
   ✅ Save Content
   
✅ Assets
   ✅ Upload Assets
   ✅ Edit Assets in folder: /images
   
❌ Settings (tout décoché)
❌ Components (tout décoché)
❌ Datasources (tout décoché)
```

---

## 📖 Guide Simple pour votre Cliente

### Ce qu'elle pourra faire :
1. **Se connecter** avec l'email invité sur app.storyblok.com
2. **Cliquer sur "Content"** dans le menu
3. **Sélectionner "Festival Homepage"**
4. **Modifier les textes** directement dans l'éditeur visuel
5. **Ajouter/changer des images** via le gestionnaire d'assets
6. **Prévisualiser** les changements en temps réel
7. **Publier** quand elle est satisfaite

### Ce qu'elle NE pourra PAS faire :
- Supprimer le site ou l'espace Storyblok
- Modifier la structure technique du site
- Changer les paramètres de déploiement
- Accéder aux tokens API
- Inviter d'autres utilisateurs

---

## 🎨 Structure du Contenu Éditable

### Page "Festival Homepage"
Votre cliente pourra modifier :

#### **Hero Section**
- Titre principal
- Sous-titre
- Image de fond

#### **About Section**
- Titre
- Paragraphes de texte
- Images décoratives

#### **Program Section**
- Titre de section
- Liste des événements
- Dates et horaires
- Descriptions

#### **Gallery Section**
- Titre
- Images de la galerie (8-9 images)
- Légendes optionnelles

#### **Partners Section**
- Titre
- Logos des partenaires
- Liens vers sites partenaires

#### **Contact Section**
- Informations de contact
- Adresse
- Email
- Téléphone

---

## 📧 Email Type à Envoyer à votre Cliente

```
Bonjour [Nom],

Votre accès éditeur pour le site du Festival Art Déco est maintenant configuré !

📧 Vous allez recevoir un email d'invitation de Storyblok.
👉 Cliquez sur le lien pour créer votre mot de passe.

Une fois connectée sur app.storyblok.com :
1. Cliquez sur "Content" dans le menu
2. Sélectionnez "Festival Homepage"
3. Modifiez le contenu directement dans l'éditeur visuel
4. Cliquez sur "Publish" pour publier vos changements

Les modifications seront visibles sur le site dans les 5 minutes.

⚠️ Important : Ne modifiez que les zones de texte et images.
Les éléments techniques sont protégés.

Besoin d'aide ? Je reste disponible pour toute question.

Cordialement,
[Votre nom]
```

---

## 🔧 Configuration Technique (pour vous)

### Tokens à NE PAS partager :
- `NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN` : Token public (OK dans le code)
- `STORYBLOK_PREVIEW_SECRET` : Token privé (JAMAIS au client)

### Workflow de Publication :
1. Cliente modifie dans Storyblok
2. Clique sur "Publish"
3. Le site statique sur IONOS se met à jour automatiquement
4. Cache invalidé après 1-5 minutes

### Sécurité :
- Le rôle Editor empêche les actions destructives
- Les tokens API restent privés
- Le déploiement IONOS est séparé de Storyblok
- Backup automatique du contenu dans Storyblok

---

## 🆘 Problèmes Courants

### "Je ne vois pas mes changements"
**Solution** : Attendre 5 minutes ou vider le cache du navigateur

### "Je ne peux pas uploader d'images"
**Solution** : Vérifier la taille (<5MB) et le format (JPG, PNG, WebP)

### "L'éditeur visuel ne charge pas"
**Solution** : Utiliser Chrome ou Firefox, désactiver les bloqueurs de pub

### "J'ai supprimé du contenu par erreur"
**Solution** : Storyblok garde un historique, vous pouvez restaurer

---

## 📱 Support Storyblok

- **Documentation** : https://www.storyblok.com/docs
- **Support** : support@storyblok.com
- **Vidéos tutoriels** : https://www.storyblok.com/tutorials

---

## ✅ Checklist Finale

- [ ] Espace Storyblok créé
- [ ] Contenu initial importé
- [ ] Cliente invitée avec rôle Editor
- [ ] Email d'instructions envoyé
- [ ] Test de connexion effectué
- [ ] Formation rapide donnée (15 min)
- [ ] Documentation remise