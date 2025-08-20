/**
 * Utilitaire pour formater automatiquement les titres avec sauts de ligne
 * DRY : Logique centralisée pour les règles de formatage
 */

/**
 * Formate automatiquement certains titres avec des sauts de ligne appropriés
 */
export function formatTitleWithLineBreaks(title: string): string {
  if (!title) return title;
  
  // Règles de formatage spécifiques
  const formatRules = [
    // "FLORILÈGE DE L'ART DÉCO" sur deux lignes
    {
      pattern: /FLORILÈGE DE L'ART DÉCO/gi,
      replacement: "FLORILÈGE\nDE L'ART DÉCO"
    },
    // Autres règles peuvent être ajoutées ici
    {
      pattern: /FESTIVAL ART DECO/gi,
      replacement: "FESTIVAL\nART DECO"
    }
  ];
  
  let formattedTitle = title;
  
  // Appliquer les règles de formatage
  for (const rule of formatRules) {
    formattedTitle = formattedTitle.replace(rule.pattern, rule.replacement);
  }
  
  return formattedTitle;
}