import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticles, getPersonne, getPersonnes } from "@/lib/content";
import { CarteArticle } from "@/components/carte-article";

type Params = { slug: string };

export async function generateStaticParams() {
  const personnes = await getPersonnes();
  return personnes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const personne = await getPersonne(slug);
  if (!personne) return {};
  return {
    title: personne.nom,
    description: personne.bio ?? `Les articles signés ${personne.nom}.`,
    alternates: { canonical: `/auteurs/${personne.slug}` },
  };
}

export default async function PageAuteur({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const personne = await getPersonne(slug);
  if (!personne) notFound();

  const articles = await getArticles({ auteur: personne.slug });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="etiquette">Signature</p>
      <h1 className="titre-article mt-2 text-4xl sm:text-5xl">
        {personne.nom}
      </h1>
      {personne.bio ? (
        <p className="mt-4 max-w-2xl text-gris">{personne.bio}</p>
      ) : null}

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <CarteArticle article={a} />
          </li>
        ))}
      </ul>
    </main>
  );
}
