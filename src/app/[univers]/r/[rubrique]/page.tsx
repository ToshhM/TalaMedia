import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getArticles } from "@/lib/content";
import { UNIVERS, getRubrique, getUnivers } from "@/lib/univers";
import { CarteArticle } from "@/components/carte-article";

type Params = { univers: string; rubrique: string };

export function generateStaticParams() {
  return UNIVERS.flatMap((u) =>
    u.rubriques.map((r) => ({ univers: u.slug, rubrique: r.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { univers: uSlug, rubrique: rSlug } = await params;
  const univers = getUnivers(uSlug);
  const rubrique = getRubrique(uSlug, rSlug);
  if (!univers || !rubrique) return {};

  return {
    title: `${rubrique.nom} — ${univers.nom}`,
    description: `Tous les articles de la rubrique ${rubrique.nom}, dans l'univers ${univers.nom} (${univers.territoire}).`,
    alternates: { canonical: `/${univers.slug}/r/${rubrique.slug}` },
  };
}

/**
 * La page de rubrique : créer le rendez-vous.
 *
 * Tous les « Tests », tous les « Décryptages ». C'est la page qu'on met en
 * favori et qu'on suit en RSS. Le segment /r/ n'est pas décoratif : sans
 * lui, /arcade/tests désignerait aussi bien la rubrique qu'un article.
 */
export default async function PageRubrique({
  params,
}: {
  params: Promise<Params>;
}) {
  const { univers: uSlug, rubrique: rSlug } = await params;
  const univers = getUnivers(uSlug);
  const rubrique = getRubrique(uSlug, rSlug);
  if (!univers || !rubrique) notFound();

  const articles = await getArticles({
    univers: univers.slug,
    rubrique: rubrique.slug,
  });

  return (
    <main data-u={univers.slug} className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="Fil d'Ariane" className="etiquette mb-6">
        <Link href={`/${univers.slug}`} className="hover:text-accent">
          {univers.nom}
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-blanc">{rubrique.nom}</span>
      </nav>

      <h1 className="titre-article text-4xl sm:text-5xl">{rubrique.nom}</h1>
      <p className="mt-3 text-gris">
        {articles.length} article{articles.length > 1 ? "s" : ""} dans{" "}
        {univers.nom}
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 text-gris">
          Aucun article dans cette rubrique pour le moment.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <CarteArticle article={a} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
