# Storyblok Fields Documentation

## Structure des champs Storyblok nécessaires

Ce document liste tous les champs Storyblok utilisés par le site. Créez ces champs dans votre Story "festival-homepage" dans Storyblok.

### Titres des sections
- `section_title_about_fr` (Text) - Titre de la section "Art Deco et Neo Art Deco" en français
- `section_title_about_en` (Text) - Titre de la section About en anglais
- `section_title_partners_fr` (Text) - Titre de la section "Nos Partenaires" en français
- `section_title_partners_en` (Text) - Titre de la section Partners en anglais
- `section_title_ontheway_fr` (Text) - Titre de la section "On the Way" en français
- `section_title_ontheway_en` (Text) - Titre de la section "On the Way" en anglais
- `section_title_decoball_fr` (Text) - Titre de la section "Le Bal Art Deco" en français
- `section_title_decoball_en` (Text) - Titre de la section "The Art Deco Ball" en anglais
- `section_title_contact_fr` (Text) - Titre de la section "Contact" en français
- `section_title_contact_en` (Text) - Titre de la section "Contact" en anglais

### Section Hero
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

### Section About (Art Deco et Neo Art Deco)
- `about_content_fr` (Rich Text) - Contenu principal de la section About en français
- `about_content_en` (Rich Text) - Contenu principal de la section About en anglais
- `target_audience_title_fr` (Text) - Titre "PUBLIC CIBLE"
- `target_audience_title_en` (Text) - Titre "TARGET AUDIENCE"
- `target_audience_fr` (Rich Text) - Description du public cible en français
- `target_audience_en` (Rich Text) - Description du public cible en anglais
- `objective_title_fr` (Text) - Titre "NOTRE OBJECTIF"
- `objective_title_en` (Text) - Titre "OUR OBJECTIVE"
- `objective_fr` (Rich Text) - Description des objectifs en français
- `objective_en` (Rich Text) - Description des objectifs en anglais

### Section Partners (Nos Partenaires)
- `partners_intro_fr` (Rich Text) - Introduction de la section partenaires en français
- `partners_intro_en` (Rich Text) - Introduction de la section partenaires en anglais
- `partners_collaboration_fr` (Rich Text) - Texte de collaboration en français
- `partners_collaboration_en` (Rich Text) - Texte de collaboration en anglais

### Section On the Way
- `ontheway_subtitle_fr` (Text) - Sous-titre "SPECTACLE IMMERSIF"
- `ontheway_subtitle_en` (Text) - Sous-titre en anglais
- `ontheway_content_1_fr` (Rich Text) - Premier bloc de contenu en français
- `ontheway_content_1_en` (Rich Text) - Premier bloc de contenu en anglais
- `ontheway_content_2_fr` (Rich Text) - Deuxième bloc de contenu en français
- `ontheway_content_2_en` (Rich Text) - Deuxième bloc de contenu en anglais
- `ontheway_content_3_fr` (Rich Text) - Troisième bloc de contenu en français
- `ontheway_content_3_en` (Rich Text) - Troisième bloc de contenu en anglais
- `ontheway_content_4_fr` (Rich Text) - Quatrième bloc de contenu en français
- `ontheway_content_4_en` (Rich Text) - Quatrième bloc de contenu en anglais
- `ontheway_content_5_fr` (Rich Text) - Cinquième bloc de contenu en français
- `ontheway_content_5_en` (Rich Text) - Cinquième bloc de contenu en anglais

### Section Deco Ball (Le Bal Art Deco)
- `decoball_intro_fr` (Rich Text) - Introduction du bal en français
- `decoball_intro_en` (Rich Text) - Introduction du bal en anglais

### Section Contact
- `contact_heading_fr` (Text) - Titre "Grand Battement d'Ailes"
- `contact_heading_en` (Text) - Titre en anglais
- `contact_intro_fr` (Text) - Introduction de contact en français
- `contact_intro_en` (Text) - Introduction de contact en anglais
- `contact_phone` (Text) - Numéro de téléphone
- `contact_email` (Text) - Adresse email
- `contact_website` (Text) - Site web
- `contact_whatsapp_fr` (Text) - Texte du bouton WhatsApp en français
- `contact_whatsapp_en` (Text) - Texte du bouton WhatsApp en anglais
- `back_to_top_fr` (Text) - Texte "Retour en haut"
- `back_to_top_en` (Text) - Texte "Back to top"

## Notes importantes

1. **Rich Text Fields**: Utilisez le type "Rich Text" dans Storyblok pour les champs qui peuvent contenir des paragraphes, des mises en forme et des spans colorés.

2. **Text Fields**: Utilisez le type "Text" pour les champs simples (titres, dates, boutons).

3. **HTML Fields**: Pour `hero_title_fr` et `hero_title_en`, vous pouvez utiliser du HTML pour structurer le titre avec des sauts de ligne :
   ```html
   Florilège<br /><span class="block">de l'Art Déco</span>
   ```

4. **Fallback**: Si un champ n'est pas rempli dans Storyblok, le système affichera "[à compléter dans Storyblok]" en gris italique.

5. **Images**: Les images sont stockées localement dans `/public/images/` et ne sont pas gérées par Storyblok pour garder le design intact.

## Configuration minimale

Pour que le site fonctionne, créez au minimum :
- Une story nommée "festival-homepage" dans Storyblok
- Les champs listés ci-dessus selon vos besoins
- Le contenu sera automatiquement récupéré et affiché