import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import { CarteArticle } from "@/components/carte-article";

export const metadata: Metadata = {
  title: "Les vidéos",
  description:
    "Toutes les vidéos Talaref. Chaque vidéo vit dans son article : le clic mène au texte, où le lecteur se trouve.",
  alternates: { canonical: "/videos" },
};

/**
 * L'index vidéo : servir l'audience YouTube.
 *
 * Une grille de vignettes qui renvoie vers les ARTICLES. Pas de lecteur
 * en page : le clic mène à l'article, où la vidéo se trouve. Le site ne
 * rejoue pas le rôle de YouTube.
 */
export default async function PageVideos() {
  const articles = await getArticles({ avecVideo: true });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="titre-article text-4xl sm:text-5xl">Les vidéos</h1>
      <p className="mt-3 max-w-2xl text-gris">
        Chaque vidéo Talaref est déclinée en article. Le clic mène au texte,
        où la vidéo est intégrée.
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 text-gris">Aucune vidéo publiée pour le moment.</p>
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
