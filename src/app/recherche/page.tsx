import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import { CarteArticle } from "@/components/carte-article";

export const metadata: Metadata = {
  title: "Rechercher",
  description: "Chercher dans les articles Talaref.",
  alternates: { canonical: "/recherche" },
  robots: { index: false },
};

/**
 * Recherche — version provisoire.
 *
 * L'architecture V1 retient Pagefind : index statique, gratuit, sans base
 * de données. Il s'installe une fois le site en place (il indexe le HTML
 * produit par `next build`). En attendant, filtrage simple côté serveur
 * sur le titre et le chapô.
 */
export default async function PageRecherche({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const requete = (q ?? "").trim();

  const tous = await getArticles();
  const resultats = requete
    ? tous.filter((a) =>
        `${a.titre} ${a.chapo}`
          .toLowerCase()
          .includes(requete.toLowerCase()),
      )
    : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="titre-article text-4xl sm:text-5xl">Rechercher</h1>

      <form method="get" className="mt-8 flex max-w-xl gap-2">
        <label htmlFor="q" className="sr-only">
          Votre recherche
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={requete}
          placeholder="Un jeu, un artiste, un sujet…"
          className="flex-1 border border-ligne bg-surface px-4 py-2.5 text-blanc placeholder:text-gris focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="bg-accent px-5 py-2.5 font-semibold text-noir transition-opacity hover:opacity-90"
        >
          Chercher
        </button>
      </form>

      {requete ? (
        <>
          <p className="etiquette mt-8">
            {resultats.length} résultat{resultats.length > 1 ? "s" : ""} pour
            « {requete} »
          </p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resultats.map((a) => (
              <li key={a.slug}>
                <CarteArticle article={a} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </main>
  );
}
