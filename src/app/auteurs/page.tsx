import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, getPersonnes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Les signatures",
  description: "Les rédactrices et rédacteurs du média Talaref.",
  alternates: { canonical: "/auteurs" },
};

export default async function PageAuteurs() {
  const personnes = await getPersonnes();
  const compte = await Promise.all(
    personnes.map(async (p) => ({
      personne: p,
      nombre: (await getArticles({ auteur: p.slug })).length,
    })),
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="titre-article text-4xl sm:text-5xl">Les signatures</h1>
      <p className="mt-3 text-gris">
        Un article non signé n&apos;est pas publiable. Chaque texte engage une
        personne.
      </p>

      <ul className="mt-10 divide-y divide-ligne border-y border-ligne">
        {compte.map(({ personne, nombre }) => (
          <li key={personne.slug}>
            <Link
              href={`/auteurs/${personne.slug}`}
              className="flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-accent"
            >
              <span>
                <span className="text-lg font-semibold">{personne.nom}</span>
                {personne.bio ? (
                  <span className="mt-1 block text-sm text-gris">
                    {personne.bio}
                  </span>
                ) : null}
              </span>
              <span className="etiquette shrink-0">
                {nombre} article{nombre > 1 ? "s" : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
