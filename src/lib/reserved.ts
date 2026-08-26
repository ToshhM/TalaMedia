/**
 * Mots réservés — piège à éviter, architecture V1 §06.
 *
 * Les URL d'article vivent à /<univers>/<slug>. Sans cette liste,
 * /arcade/tests désignerait aussi bien la rubrique « Test » qu'un article
 * dont le slug serait « tests ». Le back-office doit refuser un slug
 * d'article qui emploie l'un de ces mots.
 */
export const SLUGS_RESERVES = [
  "r", // /arcade/r/tests — le segment qui introduit une rubrique
  "tag",
  "videos",
  "auteurs",
  "recherche",
  "preview",
  "studio",
  "rss.xml",
  "sitemap.xml",
  "robots.txt",
] as const;

export function estSlugReserve(slug: string): boolean {
  return (SLUGS_RESERVES as readonly string[]).includes(slug);
}

/**
 * Slugifie un titre : sans accent, sans ponctuation, tirets simples.
 * Le back-office génère le slug depuis le titre avec cette règle, puis
 * le verrouille — un slug ne change plus après publication.
 */
export function slugifier(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
