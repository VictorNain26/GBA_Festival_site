# 🔓 Solutions pour Partager l'Accès Storyblok (Plan Gratuit)

## ⚠️ Le Problème

**Plan Gratuit Storyblok** :
- ❌ **1 seul utilisateur** autorisé
- ❌ **Partage de compte interdit** (détection automatique)
- ❌ **Pas d'invitations** sur le plan gratuit

**Politique Storyblok** : 
> "Les comptes partagés pour plusieurs personnes ou équipes entières ne sont pas autorisés"
> "Les comptes utilisés de manière partagée peuvent être automatiquement détectés et suspendus"

---

## ✅ Solutions Possibles

### Solution 1 : **Créer un Compte Dédié au Client** (Recommandé)
La solution la plus propre et légale.

#### Étapes :
1. **Créez un nouveau compte Storyblok** avec l'email du client
2. **Transférez le projet** (voir méthodes ci-dessous)
3. **Donnez les identifiants** au client
4. **Gardez vos tokens API** pour le développement

#### Avantages :
- ✅ 100% légal et conforme
- ✅ Client autonome
- ✅ Pas de risque de suspension
- ✅ Séparation claire des responsabilités

#### Inconvénients :
- ⚠️ Transfert de projet nécessaire
- ⚠️ Nouveau setup à faire

---

### Solution 2 : **Upgrade vers Plan Entry** (15€/mois)
Si vous avez plusieurs clients.

#### Ce que vous obtenez :
- ✅ **2 utilisateurs** inclus
- ✅ Invitations légitimes
- ✅ Support Storyblok
- ✅ Plus de fonctionnalités

#### Calcul ROI :
- Si vous facturez la maintenance 20€/mois au client
- Le plan à 15€ reste rentable

---

### Solution 3 : **Utiliser les Sessions de Partage** (Temporaire)
Pour les modifications ponctuelles.

#### Comment faire :
1. **Planifiez une session** avec le client
2. **Partagez votre écran** (Zoom, Teams, etc.)
3. **Le client vous guide**, vous éditez
4. **Publiez ensemble**

#### Avantages :
- ✅ Légal
- ✅ Formation en direct
- ✅ Contrôle total

#### Inconvénients :
- ⚠️ Pas pratique à long terme
- ⚠️ Demande votre temps

---

## 🔄 Comment Transférer un Projet

### Méthode 1 : Utiliser Storyblok CLI (Partiel)

```bash
# 1. Installer Storyblok CLI
npm install -g storyblok

# 2. Login sur l'ancien compte
storyblok login

# 3. Exporter les composants
storyblok pull-components --space [OLD_SPACE_ID]

# 4. Login sur le nouveau compte
storyblok logout
storyblok login

# 5. Créer un nouveau space
storyblok quickstart

# 6. Importer les composants
storyblok push-components --space [NEW_SPACE_ID]
```

⚠️ **Limitations** :
- Les assets ne sont PAS transférés
- L'internationalisation non plus
- Les stories doivent être recréées

### Méthode 2 : Utiliser un Outil Tiers

```bash
# Installer le cloner
npm install -g @kworq/storyblok-space-cloner

# Cloner le space
storyblok-space-cloner \
  --source-token [SOURCE_TOKEN] \
  --source-space [SOURCE_SPACE_ID] \
  --target-token [TARGET_TOKEN] \
  --target-space [TARGET_SPACE_ID]
```

✅ **Avantages** :
- Copie les composants
- Copie les stories
- Copie les assets

### Méthode 3 : Export/Import Manuel

1. **Exporter le contenu** :
```javascript
// Script d'export
const axios = require('axios');

async function exportContent() {
  const response = await axios.get(
    `https://api.storyblok.com/v1/spaces/${SPACE_ID}/stories`,
    {
      headers: {
        'Authorization': YOUR_TOKEN
      }
    }
  );
  
  // Sauvegarder dans un fichier
  fs.writeFileSync('export.json', JSON.stringify(response.data));
}
```

2. **Recréer manuellement** dans le nouveau compte
3. **Importer via l'API**

### Méthode 4 : Transfert de Propriété (Si même organisation)

1. **Contactez le support Storyblok**
2. **Demandez un transfert de propriété**
3. **Fournissez** :
   - ID du space
   - Email du nouveau propriétaire
   - Raison du transfert

---

## 💡 Stratégie Recommandée

### Pour UN Client Unique

```
1. Créez un compte Storyblok au nom du client
2. Développez le site sur CE compte
3. Donnez les accès au client
4. Gardez l'accès API pour maintenance
```

### Pour PLUSIEURS Clients

```
Option A : Un compte gratuit PAR client
- Chaque client a son compte
- Vous gardez les tokens API

Option B : Upgrade vers Entry/Team
- 15-85€/mois
- 2-10 utilisateurs
- Gestion centralisée
```

---

## 🔑 Configuration Double Compte

### Si vous créez un nouveau compte pour le client :

#### 1. Sur le Nouveau Compte Client
```env
# .env.production (chez le client)
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=token_client_public
STORYBLOK_PREVIEW_SECRET=secret_client
```

#### 2. Sur Votre Compte Dev
```env
# .env.local (chez vous)
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=token_dev_public
STORYBLOK_PREVIEW_SECRET=secret_dev
```

#### 3. Workflow
```
Développement → Votre compte
Production → Compte client
Maintenance → API du compte client
```

---

## 📊 Comparaison des Options

| Option | Coût | Légalité | Praticité | Autonomie Client |
|--------|------|----------|-----------|------------------|
| **Nouveau compte client** | 0€ | ✅ 100% | ⭐⭐⭐ | ✅ Totale |
| **Plan Entry** | 15€/mois | ✅ 100% | ⭐⭐⭐⭐⭐ | ✅ Totale |
| **Sessions partagées** | 0€ | ✅ 100% | ⭐ | ❌ Aucune |
| **~~Partage identifiants~~** | 0€ | ❌ Interdit | ~~⭐⭐⭐⭐~~ | ~~✅~~ |

---

## 🚨 Risques du Partage de Compte

Si vous partagez quand même vos identifiants :

1. **Détection automatique** par Storyblok
2. **Suspension du compte** sans préavis
3. **Perte du site** et du contenu
4. **Pas de recours** possible
5. **Mauvaise réputation** professionnelle

**Indices de détection** :
- IPs différentes
- Heures de connexion inhabituelles
- Patterns d'utilisation différents
- Localisation géographique

---

## ✅ Checklist Décision

### Créer un nouveau compte si :
- [ ] C'est votre seul client
- [ ] Le client veut être autonome
- [ ] Vous ne voulez pas payer
- [ ] C'est un projet one-shot

### Upgrader votre plan si :
- [ ] Vous avez 2+ clients
- [ ] Vous voulez centraliser
- [ ] 15€/mois est acceptable
- [ ] Vous faites de la maintenance régulière

### Garder votre compte unique si :
- [ ] Le client ne veut PAS éditer
- [ ] Vous gérez tout le contenu
- [ ] C'est temporaire
- [ ] Sessions de partage suffisent

---

## 📝 Script de Migration Complet

```javascript
// migrate-storyblok.js
const axios = require('axios');
const fs = require('fs');

const SOURCE_TOKEN = 'your_source_token';
const SOURCE_SPACE = 'source_space_id';
const TARGET_TOKEN = 'target_token';
const TARGET_SPACE = 'target_space_id';

async function migrateSpace() {
  // 1. Export components
  const components = await exportComponents();
  
  // 2. Export stories
  const stories = await exportStories();
  
  // 3. Export assets (références seulement)
  const assets = await exportAssets();
  
  // 4. Import to new space
  await importComponents(components);
  await importStories(stories);
  
  console.log('✅ Migration complète!');
}

// Fonctions helper...
```

---

## 🎯 Recommandation Finale

**Pour votre cas spécifique** (1 cliente, site festival) :

### 🏆 Meilleure Option : **Créer un Compte au Nom de la Cliente**

1. **Créez** : festival-artdeco@gmail.com (ou son email)
2. **Transférez** : Le projet avec les outils ci-dessus
3. **Configurez** : Les tokens dans IONOS
4. **Donnez** : Les accès à la cliente
5. **Gardez** : Les tokens API pour maintenance

**Résultat** : 
- ✅ Cliente autonome
- ✅ Vous gardez l'accès technique
- ✅ 100% légal
- ✅ Gratuit
- ✅ Professionnel