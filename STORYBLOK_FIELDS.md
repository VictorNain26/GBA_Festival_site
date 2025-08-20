# Storyblok Fields Documentation

## Structure des champs Storyblok nécessaires

Ce document liste tous les champs Storyblok utilisés par le site. La nouvelle structure organise les champs par sections avec des blocs dédiés.

## Structure recommandée dans Storyblok

Créez une story nommée "festival-homepage" avec les blocs suivants :

### Section Hero (champs directs au niveau racine)

- `hero_title_fr` (Text/HTML) - Titre principal en français (peut contenir du HTML pour les sauts de ligne)
- `hero_title_en` (Text/HTML) - Titre principal en anglais
- `hero_subtitle_fr` (Text) - Sous-titre du festival en français
- `hero_subtitle_en` (Text) - Sous-titre du festival en anglais
- `hero_date_fr` (Text) - Date de l'événement en français
- `hero_date_en` (Text) - Date de l'événement en anglais
- `hero_cta_fr` (Text) - Texte du bouton CTA en français
- `hero_cta_en` (Text) - Texte du bouton CTA en anglais
- `hero_location_name` (Text) - Nom du lieu (Hotel du Collectionneur)
- `hero_location_address` (Text) - Adresse (Paris 75008)

### Bloc `about_section` (Block)

**Champs du bloc About :**
- `title_fr` (Text) - Titre de la section "Art Deco et Neo Art Deco" en français
- `title_en` (Text) - Titre de la section About en anglais
- `content_fr` (Rich Text) - Contenu principal de la section About en français
- `content_en` (Rich Text) - Contenu principal de la section About en anglais
- `target_audience_title_fr` (Text) - Titre "PUBLIC CIBLE"
- `target_audience_title_en` (Text) - Titre "TARGET AUDIENCE"
- `target_audience_fr` (Rich Text) - Description du public cible en français
- `target_audience_en` (Rich Text) - Description du public cible en anglais
- `objective_title_fr` (Text) - Titre "NOTRE OBJECTIF"
- `objective_title_en` (Text) - Titre "OUR OBJECTIVE"
- `objective_fr` (Rich Text) - Description des objectifs en français
- `objective_en` (Rich Text) - Description des objectifs en anglais

### Bloc `partners_section` (Block)

**Champs du bloc Partners :**
- `title_fr` (Text) - Titre de la section "Nos Partenaires" en français
- `title_en` (Text) - Titre de la section Partners en anglais
- `intro_fr` (Rich Text) - Introduction de la section partenaires en français
- `intro_en` (Rich Text) - Introduction de la section partenaires en anglais
- `collaboration_fr` (Rich Text) - Texte de collaboration en français
- `collaboration_en` (Rich Text) - Texte de collaboration en anglais

### Bloc `ontheway_section` (Block)

**Champs du bloc On the Way :**
- `title_fr` (Text) - Titre de la section "On the Way" en français
- `title_en` (Text) - Titre de la section "On the Way" en anglais
- `subtitle_fr` (Text) - Sous-titre "SPECTACLE IMMERSIF"
- `subtitle_en` (Text) - Sous-titre en anglais
- `content_1_fr` (Rich Text) - Premier bloc de contenu en français
- `content_1_en` (Rich Text) - Premier bloc de contenu en anglais
- `content_2_fr` (Rich Text) - Deuxième bloc de contenu en français
- `content_2_en` (Rich Text) - Deuxième bloc de contenu en anglais
- `content_3_fr` (Rich Text) - Troisième bloc de contenu en français
- `content_3_en` (Rich Text) - Troisième bloc de contenu en anglais
- `content_4_fr` (Rich Text) - Quatrième bloc de contenu en français
- `content_4_en` (Rich Text) - Quatrième bloc de contenu en anglais
- `content_5_fr` (Rich Text) - Cinquième bloc de contenu en français
- `content_5_en` (Rich Text) - Cinquième bloc de contenu en anglais

### Bloc `decoball_section` (Block)

**Champs du bloc Deco Ball :**
- `title_fr` (Text) - Titre de la section "Le Bal Art Deco" en français
- `title_en` (Text) - Titre de la section "The Art Deco Ball" en anglais
- `intro_fr` (Rich Text) - Introduction du bal en français
- `intro_en` (Rich Text) - Introduction du bal en anglais

### Bloc `contact_section` (Block)

**Champs du bloc Contact :**
- `title_fr` (Text) - Titre de la section "Contact" en français
- `title_en` (Text) - Titre de la section "Contact" en anglais
- `heading_fr` (Text) - Titre "Grand Battement d'Ailes"
- `heading_en` (Text) - Titre en anglais
- `intro_fr` (Text) - Introduction de contact en français
- `intro_en` (Text) - Introduction de contact en anglais
- `phone` (Text) - Numéro de téléphone
- `email` (Text) - Adresse email
- `website` (Text) - Site web
- `whatsapp_fr` (Text) - Texte du bouton WhatsApp en français
- `whatsapp_en` (Text) - Texte du bouton WhatsApp en anglais
- `back_to_top_fr` (Text) - Texte "Retour en haut"
- `back_to_top_en` (Text) - Texte "Back to top"

## Avantages de la nouvelle structure

✅ **Organisation logique** : Chaque section a ses propres champs
✅ **Interface intuitive** : Plus facile à naviguer dans l'éditeur Storyblok
✅ **Maintenabilité** : Structure plus claire pour les modifications futures
✅ **Flexibilité** : Possible d'ajouter ou supprimer des sections facilement

## Notes importantes

1. **Structure de blocs** : Utilisez des blocs (Blocks) dans Storyblok pour organiser les sections
2. **Champs Hero** : Restent au niveau racine car ils sont utilisés dans plusieurs endroits
3. **Rich Text Fields** : Utilisez le type "Rich Text" pour les champs qui peuvent contenir des paragraphes et du formatage
4. **Text Fields** : Utilisez le type "Text" pour les champs simples (titres, dates, boutons)
5. **Fallback** : Si un champ n'est pas rempli, le système affichera "[à compléter dans Storyblok]" en gris italique

## Configuration dans Storyblok

1. Créez une story "festival-homepage"
2. Créez les blocs suivants dans votre Schema :
   - `about_section` (Block)
   - `partners_section` (Block) 
   - `ontheway_section` (Block)
   - `decoball_section` (Block)
   - `contact_section` (Block)
3. Ajoutez les champs listés ci-dessus à chaque bloc
4. Ajoutez les champs Hero directement au niveau racine de la story

## Images

Les images sont stockées localement dans `/public/images/` et ne sont pas gérées par Storyblok pour maintenir le design et les performances.