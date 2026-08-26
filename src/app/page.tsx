import Link from "next/link";
import { getArticles } from "@/lib/content";
import { UNIVERS } from "@/lib/univers";
import { CarteArticle } from "@/components/carte-article";

/**
 * La home : montrer la variété.
 *
 * Une une éditorialisée, puis les six univers en blocs de couleur. Le
 * fond reste STRICTEMENT noir — six accents sur un même écran, c'est la
 * couleur qui doit être contenue, pas le contenu.
 */
export default async function Home() {
  const articles = await getArticles();
  const [une, ...suite] = articles;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      {une ? (
        <section aria-labelledby="la-une" className="mb-16">
          <h1 id="la-une" className="etiquette mb-4">
            À la une
          </h1>
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <CarteArticle article={une} taille="une" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {suite.slice(0, 2).map((a) => (
                <CarteArticle key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="les-univers" className="mb-16">
        <h2 id="les-univers" className="etiquette mb-4">
          Six univers
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {UNIVERS.map((u) => (
            <li key={u.slug} data-u={u.slug}>
              <Link
                href={`/${u.slug}`}
                className="carte-home relative flex h-full flex-col justify-between overflow-hidden p-5"
              >
                <div className="texture" aria-hidden="true" />
                <div className="relative">
                  <span className="pastille-code">{u.code}</span>
                  <p className="mot-univers mt-4 text-3xl">{u.nom}</p>
                  <p className="etiquette mt-2">{u.territoire}</p>
                </div>
                <p className="relative mt-6 line-clamp-3 text-sm text-gris">
                  {u.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {suite.length > 2 ? (
        <section aria-labelledby="derniers">
          <h2 id="derniers" className="etiquette mb-4">
            Les derniers articles
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suite.slice(2).map((a) => (
              <li key={a.slug}>
                <CarteArticle article={a} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
