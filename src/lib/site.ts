/** Réglages du site, lus une seule fois et partagés partout. */

export const SITE = {
  nom: "Talaref",
  nomComplet: "Talaref Média",
  baseline: "Une marque. Six univers.",
  description:
    "Jeux vidéo, manga, pop culture, politique, musique et image. Six terrains, un seul média — des articles documentés, et les vidéos qui vont avec.",
  /** Sans slash final. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  langue: "fr-FR",
  /** Obligation légale : un média en ligne nomme son directeur de publication. */
  directeurDePublication: "Toshiro Mpika",
  contact: "contact@talaref.co",
} as const;

export function urlAbsolue(chemin: string): string {
  return `${SITE.url}${chemin.startsWith("/") ? chemin : `/${chemin}`}`;
}

const FORMAT_DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formaterDate(iso: string): string {
  return FORMAT_DATE.format(new Date(iso));
}

/** « 8 min de lecture ». Jamais saisi à la main : 230 mots/minute. */
export function formaterDuree(minutes: number): string {
  return `${minutes} min de lecture`;
}

/** Durée ISO 8601 pour le VideoObject de Schema.org : PT14M2S. */
export function dureeISO(secondes: number): string {
  const m = Math.floor(secondes / 60);
  const s = secondes % 60;
  return `PT${m}M${s}S`;
}
