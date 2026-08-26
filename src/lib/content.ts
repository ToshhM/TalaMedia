import "server-only";

import type { Article, Personne } from "./types";
import { ARTICLES_DEMO, PERSONNES_DEMO } from "./sample-data";

/**
 * Couche d'accès au contenu.
 *
 * Tout le site passe par ces fonctions et par elles seules. Aucune page
 * n'interroge le CMS directement : le jour où la source change, il n'y a
 * qu'un fichier à reprendre.
 *
 * Tant que NEXT_PUBLIC_SANITY_PROJECT_ID est vide, on sert les données de
 * démonstration — le site tourne dès le premier `npm run dev`, sans
 * compte Sanity.
 */

const SANITY_ACTIF = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

function trierParDate(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) => Date.parse(b.publieLe) - Date.parse(a.publieLe),
  );
}

async function tousLesArticles(): Promise<Article[]> {
  if (SANITY_ACTIF) {
    // TODO — brancher la requête GROQ ici (voir sanity/schemas).
    // Le jeton de lecture reste côté serveur : ce fichier est marqué
    // "server-only", il ne peut pas partir dans le navigateur.
    throw new Error(
      "Sanity est configuré mais la requête GROQ n'est pas encore écrite. " +
        "Vider NEXT_PUBLIC_SANITY_PROJECT_ID pour revenir aux données de démonstration.",
    );
  }
  return trierParDate(ARTICLES_DEMO);
}

export async function getArticles(options?: {
  univers?: string;
  rubrique?: string;
  tag?: string;
  auteur?: string;
  avecVideo?: boolean;
  limite?: number;
  exclure?: string;
}): Promise<Article[]> {
  let articles = await tousLesArticles();

  if (options?.univers) {
    articles = articles.filter((a) => a.univers === options.univers);
  }
  if (options?.rubrique) {
    articles = articles.filter((a) => a.rubrique === options.rubrique);
  }
  if (options?.tag) {
    articles = articles.filter((a) =>
      a.tags.some((t) => t.slug === options.tag),
    );
  }
  if (options?.auteur) {
    articles = articles.filter((a) =>
      a.auteurs.some((p) => p.slug === options.auteur),
    );
  }
  if (options?.avecVideo) {
    articles = articles.filter((a) => Boolean(a.video));
  }
  if (options?.exclure) {
    articles = articles.filter((a) => a.slug !== options.exclure);
  }
  if (options?.limite) {
    articles = articles.slice(0, options.limite);
  }

  return articles;
}

export async function getArticle(
  univers: string,
  slug: string,
): Promise<Article | null> {
  const articles = await tousLesArticles();
  return (
    articles.find((a) => a.univers === univers && a.slug === slug) ?? null
  );
}

/** Deux articles de rebond, générés automatiquement, non éditables. */
export async function getALireAussi(article: Article): Promise<Article[]> {
  const memeRubrique = await getArticles({
    univers: article.univers,
    rubrique: article.rubrique,
    exclure: article.slug,
    limite: 2,
  });
  if (memeRubrique.length === 2) return memeRubrique;

  const memeUnivers = await getArticles({
    univers: article.univers,
    exclure: article.slug,
    limite: 2,
  });
  return memeUnivers.slice(0, 2);
}

export async function getPersonnes(): Promise<Personne[]> {
  if (SANITY_ACTIF) {
    throw new Error("Requête GROQ des personnes non encore écrite.");
  }
  return PERSONNES_DEMO;
}

export async function getPersonne(slug: string): Promise<Personne | null> {
  const personnes = await getPersonnes();
  return personnes.find((p) => p.slug === slug) ?? null;
}

export async function getTags(): Promise<{ slug: string; nom: string }[]> {
  const articles = await tousLesArticles();
  const map = new Map<string, string>();
  for (const a of articles) {
    for (const t of a.tags) map.set(t.slug, t.nom);
  }
  return [...map.entries()].map(([slug, nom]) => ({ slug, nom }));
}
