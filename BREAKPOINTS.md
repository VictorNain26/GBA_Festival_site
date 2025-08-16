# 📱 Breakpoints Tailwind - Festival Site

Guide de référence des breakpoints standardisés pour une cohérence parfaite.

## 🎯 **Système Unifié**

| Breakpoint | Taille | Usage | Devices Typiques |
|------------|--------|-------|-------------------|
| **Default** | `0px` | Mobile portrait | iPhone SE, petits Android |
| **xs** | `480px` | Mobile large | iPhone 12/13/14, grands Android |
| **sm** | `640px` | Tablette portrait | iPad mini, petites tablettes |
| **md** | `768px` | Tablette paysage | iPad standard, Samsung Tab |
| **lg** | `1024px` | Laptop small | MacBook Air, laptops 13" |
| **xl** | `1280px` | Desktop standard | Écrans de bureau 15-24" |
| **2xl** | `1440px` | Desktop large | iMac, écrans 27" |
| **3xl** | `1920px` | Ultra-wide | Écrans 32"+, multi-moniteurs |

## 🚫 **Breakpoints Interdits**

N'utilisez JAMAIS ces valeurs hardcodées :
- ❌ `360px` → Utilisez default ou `xs:`
- ❌ `480px` → Utilisez `xs:`  
- ❌ `767px` → Utilisez `sm:` ou `md:`
- ❌ `1023px` → Utilisez `md:` ou `lg:`

## ✅ **Bonnes Pratiques**

### **CSS → Tailwind Migration**
```css
/* ❌ AVANT - CSS media queries */
@media (max-width: 360px) {
  .element { padding: 8px; }
}

/* ✅ APRÈS - Classes Tailwind */
<div className="px-2 xs:px-3">
```

### **JavaScript Breakpoints**
```typescript
// ✅ Aligné avec Tailwind
if (windowWidth < 480) { /* xs breakpoint */ }
if (windowWidth < 640) { /* sm breakpoint */ }
if (windowWidth < 768) { /* md breakpoint */ }
if (windowWidth < 1024) { /* lg breakpoint */ }
```

### **Responsive Padding**
```tsx
// ✅ Pattern standardisé
className="px-2 xs:px-3 sm:px-4 md:px-8 lg:px-12"
//         ↓    ↓      ↓      ↓       ↓
//       8px  12px   16px   32px    48px
```

## 🎨 **Exemples Pratiques**

### **Text Sizing**
```tsx
className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl"
```

### **Spacing**
```tsx
className="gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8"
```

### **Grid Layouts**
```tsx
className="grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
```

## 🔧 **Configuration Tailwind**

```js
// tailwind.config.js
screens: {
  'xs': '480px',    // Mobile large
  'sm': '640px',    // Tablette portrait  
  'md': '768px',    // Tablette paysage
  'lg': '1024px',   // Laptop
  'xl': '1280px',   // Desktop standard
  '2xl': '1440px',  // Desktop large
  '3xl': '1920px',  // Ultra-wide
}
```

## ⚡ **Performance**

- **Mobile-first** : Commencez toujours sans préfixe, ajoutez les breakpoints plus grands
- **Lazy breakpoints** : N'ajoutez que les breakpoints nécessaires  
- **Cohérence** : Utilisez les mêmes patterns partout

---

**Règle d'or** : Si vous hésitez, référez-vous toujours aux breakpoints Tailwind officiels du projet.