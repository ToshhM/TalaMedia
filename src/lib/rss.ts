import type { Article } from "./types";
import { SITE, urlAbsolue } from "./site";

function echapper(texte: string): string {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Un flux RSS par univers, plus un global. Peu coûteux, très utile pour
 * les lecteurs fidèles et les agrégateurs.
 */
export function construireFluxRss({
  articles,
  titre,
  description,
  chemin,
}: {
  articles: Article[];
  titre: string;
  description: string;
  chemin: string;
}): string {
  const items = articles
    .map((a) => {
      const lien = urlAbsolue(`/${a.univers}/${a.slug}`);
      return `    <item>
      <title>${echapper(a.titre)}</title>
      <link>${lien}</link>
      <guid isPermaLink="true">${lien}</guid>
      <description>${echapper(a.chapo)}</description>
      <pubDate>${new Date(a.publieLe).toUTCString()}</pubDate>
      ${a.auteurs.map((p) => `<author>${echapper(p.nom)}</author>`).join("")}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${echapper(titre)}</title>
    <link>${SITE.url}</link>
    <description>${echapper(description)}</description>
    <language>fr-FR</language>
    <atom:link href="${urlAbsolue(chemin)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export const ENTETES_RSS = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
};
