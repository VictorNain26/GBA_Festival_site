# 🔐 Référence des Permissions Storyblok

## Tableau Comparatif des Rôles

| Permission | Owner | Admin | Editor | Client Custom |
|------------|-------|-------|--------|---------------|
| **CONTENU** |
| Voir le contenu | ✅ | ✅ | ✅ | ✅ |
| Éditer le contenu | ✅ | ✅ | ✅ | ✅ |
| Publier le contenu | ✅ | ✅ | ✅ | ✅ |
| Supprimer le contenu | ✅ | ✅ | ❌ | ❌ |
| **ASSETS (IMAGES)** |
| Voir les assets | ✅ | ✅ | ✅ | ✅ |
| Uploader des assets | ✅ | ✅ | ✅ | ✅ |
| Supprimer des assets | ✅ | ✅ | ✅ | ❌ |
| Organiser les dossiers | ✅ | ✅ | ❌ | ❌ |
| **COMPOSANTS** |
| Voir les composants | ✅ | ✅ | ✅ | ✅ |
| Créer des composants | ✅ | ✅ | ❌ | ❌ |
| Modifier la structure | ✅ | ✅ | ❌ | ❌ |
| Supprimer des composants | ✅ | ✅ | ❌ | ❌ |
| **UTILISATEURS** |
| Inviter des utilisateurs | ✅ | ✅ | ❌ | ❌ |
| Gérer les rôles | ✅ | ✅ | ❌ | ❌ |
| Supprimer des utilisateurs | ✅ | ✅ | ❌ | ❌ |
| **PARAMÈTRES** |
| Accès aux paramètres | ✅ | ✅ | ❌ | ❌ |
| Voir les tokens API | ✅ | ✅ | ❌ | ❌ |
| Gérer les webhooks | ✅ | ✅ | ❌ | ❌ |
| Configurer les pipelines | ✅ | ✅ | ❌ | ❌ |
| **ESPACE** |
| Supprimer l'espace | ✅ | ❌ | ❌ | ❌ |
| Exporter l'espace | ✅ | ✅ | ❌ | ❌ |
| Gérer la facturation | ✅ | ❌ | ❌ | ❌ |

---

## 🎯 Rôle Personnalisé Recommandé : "Client Editor"

### Configuration Détaillée

```json
{
  "role_name": "Client Editor",
  "permissions": {
    "content_editor": {
      "access_visual_editor": true,
      "edit_content": true,
      "publish_content": true,
      "save_content": true,
      "delete_content": false,
      "access_content_api": false
    },
    "assets": {
      "view_assets": true,
      "upload_assets": true,
      "edit_assets": true,
      "delete_assets": false,
      "manage_folders": false,
      "allowed_folders": ["/images", "/documents"]
    },
    "components": {
      "view_components": true,
      "create_components": false,
      "edit_components": false,
      "delete_components": false
    },
    "languages": {
      "access_all_languages": true,
      "restricted_languages": []
    },
    "pipelines": {
      "access_pipelines": false,
      "manage_pipelines": false
    },
    "settings": {
      "access_settings": false,
      "view_api_tokens": false,
      "manage_webhooks": false,
      "manage_ssl": false
    },
    "users": {
      "invite_users": false,
      "manage_roles": false,
      "delete_users": false
    }
  }
}
```

---

## 🛠️ Comment Créer le Rôle "Client Editor"

### Étape par Étape avec Screenshots

#### 1. Accéder aux Rôles
```
Settings → Roles → Add new role
```

#### 2. Configuration de Base
- **Role Name**: `Client Editor`
- **Description**: `Éditeur de contenu pour clients - Peut modifier et publier le contenu mais ne peut pas changer la structure`

#### 3. Permissions à Activer

##### ✅ Content & Editor
- [x] Access Visual Editor
- [x] Edit Content  
- [x] Publish Content
- [x] Save Content
- [ ] Delete Content
- [ ] Access Toolbar Apps

##### ✅ Assets
- [x] View Assets
- [x] Upload Assets
- [x] Edit Assets
- [ ] Delete Assets
- [ ] Manage Asset Folders

##### ❌ Components (tout décoché)
- [ ] View Component Library
- [ ] Create Components
- [ ] Edit Components
- [ ] Delete Components

##### ❌ Settings (tout décoché)
- [ ] Access Settings
- [ ] View API Tokens
- [ ] Manage Webhooks
- [ ] Configure Pipelines

##### ❌ Users (tout décoché)
- [ ] Invite Users
- [ ] Manage Roles
- [ ] Remove Users

---

## 🌍 Permissions Linguistiques

Si votre site est multilingue (FR/EN), configurez :

### Pour un Éditeur Français Uniquement
```
Languages:
  [x] French (fr)
  [ ] English (en)
```

### Pour un Éditeur Anglais Uniquement
```
Languages:
  [ ] French (fr)
  [x] English (en)
```

### Pour un Éditeur Bilingue
```
Languages:
  [x] French (fr)
  [x] English (en)
```

---

## 📁 Permissions sur les Dossiers

### Configuration des Accès aux Assets

#### Dossier Public (Images du Site)
```
/images
  - Read: ✅
  - Upload: ✅
  - Delete: ❌
  - Subfolders: ✅
```

#### Dossier Privé (Assets Techniques)
```
/system
  - Read: ❌
  - Upload: ❌
  - Delete: ❌
  - Subfolders: ❌
```

---

## 🔄 Workflow de Validation

### Option 1 : Publication Directe
Le client peut publier directement ses modifications.

```
Editor → Edit → Publish → Live
```

### Option 2 : Validation Requise
Le client sauvegarde, vous validez et publiez.

```
Editor → Edit → Save as Draft
Admin → Review → Publish → Live
```

Pour activer la validation :
1. Créez un rôle "Client Draft"
2. Décochez "Publish Content"
3. Vous gardez le rôle Admin pour publier

---

## 🚨 Permissions Critiques à NE JAMAIS Donner

### ❌ Ne JAMAIS activer pour un client :
- **Delete Space** : Supprimerait tout le site
- **Access API Tokens** : Compromettrait la sécurité
- **Manage Webhooks** : Pourrait casser les déploiements
- **Delete Components** : Détruirait la structure
- **Manage Users** : Pourrait s'auto-promouvoir Admin

---

## 📊 Matrice de Décision

### Quel rôle choisir ?

| Situation | Rôle Recommandé | Raison |
|-----------|-----------------|---------|
| Client fait des mises à jour régulières | Editor | Simplicité, permissions équilibrées |
| Client non-technique | Client Custom | Permissions minimales, interface simplifiée |
| Équipe marketing | Editor + Restrictions | Accès aux assets marketing uniquement |
| Traducteur externe | Custom Language Role | Accès à une seule langue |
| Stagiaire/Temporaire | Client Draft | Pas de publication directe |
| Agence partenaire | Admin | Gestion complète sauf facturation |

---

## 🔗 Intégration avec le Déploiement

### Workflow Automatique
1. **Client** modifie dans Storyblok
2. **Webhook** déclenche le build IONOS
3. **Site** mis à jour en 2-5 minutes

### Configuration du Webhook
```
Settings → Webhooks → Add Webhook
URL: https://your-ionos-deploy-url
Triggers: Story published, Story unpublished
```

---

## 📝 Template de Documentation Client

### À remettre au client :

```markdown
# Votre Accès Éditeur Storyblok

## Connexion
- URL : app.storyblok.com
- Email : [email_client]
- Mot de passe : [À créer lors de la première connexion]

## Ce que vous pouvez faire
✅ Modifier tous les textes
✅ Changer les images
✅ Publier les modifications
✅ Prévisualiser en temps réel

## Ce que vous ne pouvez pas faire
❌ Supprimer des pages
❌ Modifier la structure du site
❌ Inviter d'autres utilisateurs
❌ Accéder aux paramètres techniques

## Support
- Contact développeur : [votre_email]
- Documentation : [lien_vers_ce_guide]
```

---

## ✅ Checklist de Sécurité

Avant de donner l'accès :
- [ ] Backup complet du contenu existant
- [ ] Rôle approprié configuré
- [ ] Permissions testées sur compte test
- [ ] Webhook de déploiement configuré
- [ ] Documentation remise au client
- [ ] Formation de base effectuée
- [ ] Contact de support communiqué