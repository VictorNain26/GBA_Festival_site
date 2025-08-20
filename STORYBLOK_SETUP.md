# Configuration Storyblok - Festival Site

## 📋 Bloks à créer dans votre Space Storyblok

### 1. **hero-section**
```
Nom: hero-section
Type: Nestable
Champs:
- subtitle_fr (Text)
- subtitle_en (Text)
- date_fr (Text)
- date_en (Text)
- hotel_name_fr (Text)
- hotel_name_en (Text)
- location (Text)
- cta_text_fr (Text)
- cta_text_en (Text)
```

### 2. **about-section**
```
Nom: about-section
Type: Nestable
Champs:
- title_fr (Richtext)
- title_en (Richtext)
- intro_paragraphs_fr (Richtext)
- intro_paragraphs_en (Richtext)
- conclusion_paragraphs_fr (Richtext)
- conclusion_paragraphs_en (Richtext)
- target_title_fr (Richtext)
- target_title_en (Richtext)
- target_text_fr (Richtext)
- target_text_en (Richtext)
- objective_title_fr (Richtext)
- objective_title_en (Richtext)
- objective_text_fr (Richtext)
- objective_text_en (Richtext)
```

### 3. **partners-section**
```
Nom: partners-section
Type: Nestable
Champs:
- title_fr (Text)
- title_en (Text)
- intro_paragraphs_fr (Richtext)
- intro_paragraphs_en (Richtext)
- collaboration_text_fr (Richtext)
- collaboration_text_en (Richtext)
```

### 4. **ontheway-section**
```
Nom: ontheway-section
Type: Nestable
Champs:
- title_fr (Text)
- title_en (Text)
- content_fr (Richtext)
- content_en (Richtext)
```

### 5. **decoball-section**
```
Nom: decoball-section
Type: Nestable
Champs:
- title_fr (Text)
- title_en (Text)
- intro_text_fr (Richtext)
- intro_text_en (Richtext)
- timeline_description_fr (Richtext)
- timeline_description_en (Richtext)
```

### 6. **contact-section**
```
Nom: contact-section
Type: Nestable
Champs:
- title_fr (Text)
- title_en (Text)
- content_fr (Richtext)
- content_en (Richtext)
```

### 7. **page** (Content Type)
```
Nom: page
Type: Content Type
Champs:
- body (Blocks) // Permet d'ajouter tous les sections ci-dessus
```

## 🚀 Étapes de configuration

1. **Créer les bloks** dans Storyblok Studio avec les champs ci-dessus
2. **Créer une story** de type "page" nommée "home"
3. **Ajouter les sections** dans le champ "body" dans l'ordre :
   - hero-section
   - about-section
   - partners-section
   - ontheway-section
   - decoball-section
   - contact-section

## 📝 Contenu à remplir

Utilisez le contenu existant du site comme base pour remplir les champs dans Storyblok. Vous pouvez copier-coller depuis la version actuelle.

## 🔧 Variables d'environnement

Ajoutez dans votre `.env.local` :
```
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_preview_token_here
```