import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticles, getTags } from "@/lib/content";
import { CarteArticle } from "@/components/carte-article";

type Params = { slug: string };

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = (await getTags()).find((t) => t.slug === slug);
  if (!tag) return {};
  return {
    title: tag.nom,
    description: `Tous les articles Talaref sur ${tag.nom}, tous univers confondus.`,
    alternates: { canonical: `/tag/${tag.slug}` },
  };
}

/**
 * La page de tag : relier les univers.
 *
 * Le seul endroit du site où deux couleurs cohabitent légitimement — un
 * tag rassemble des articles de plusieurs univers, chacun gardant sa
 * pastille. C'est aussi par un tag, jamais par un second classement, que
 * se fait le lien vers un autre territoire.
 */
export default async function PageTag({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tag = (await getTags()).find((t) => t.slug === slug);
  if (!tag) notFound();

  const articles = await getArticles({ tag: tag.slug });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="etiquette">Sujet</p>
      <h1 className="titre-article mt-2 text-4xl sm:text-5xl">{tag.nom}</h1>
      <p className="mt-3 text-gris">
        {articles.length} article{articles.length > 1 ? "s" : ""}, tous univers
        confondus
      </p>

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
