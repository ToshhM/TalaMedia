import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getArticles } from "@/lib/content";
import { UNIVERS, getUnivers } from "@/lib/univers";
import { SITE } from "@/lib/site";
import { CarteArticle } from "@/components/carte-article";

type Params = { univers: string };

/** Les six univers sont une liste fermée : on les rend tous à la compilation. */
export function generateStaticParams() {
  return UNIVERS.map((u) => ({ univers: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { univers: slug } = await params;
  const univers = getUnivers(slug);
  if (!univers) return {};

  return {
    title: `${univers.nom} — ${univers.territoire}`,
    description: univers.description,
    alternates: {
      canonical: `/${univers.slug}`,
      types: {
        "application/rss+xml": `${SITE.url}/${univers.slug}/rss.xml`,
      },
    },
  };
}

/**
 * La page d'univers : ouvrir en grand.
 *
 * C'est le SEUL endroit du site où la couleur d'accent peut occuper une
 * pleine largeur. Les rubriques du territoire sont des filtres visibles,
 * pas un menu déroulant.
 */
export default async function PageUnivers({
  params,
}: {
  params: Promise<Params>;
}) {
  const { univers: slug } = await params;
  const univers = getUnivers(slug);
  if (!univers) notFound();

  const articles = await getArticles({ univers: univers.slug });

  return (
    <main data-u={univers.slug}>
      <header className="relative overflow-hidden border-b border-ligne">
        <div className="texture" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="pastille-code">{univers.code}</span>
          <h1 className="mot-univers mt-5 text-5xl sm:text-7xl">
            {univers.nom}
          </h1>
          <p className="etiquette mt-3">{univers.territoire}</p>
          <p className="mt-5 max-w-2xl text-pretty text-gris">
            {univers.description}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <nav aria-label={`Rubriques de ${univers.nom}`} className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {univers.rubriques.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${univers.slug}/r/${r.slug}`}
                  className="block border border-ligne px-3 py-1.5 text-sm text-gris transition-colors hover:border-accent hover:text-accent"
                >
                  {r.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {articles.length === 0 ? (
          <p className="text-gris">
            Aucun article publié dans cet univers pour le moment.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <CarteArticle article={a} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
