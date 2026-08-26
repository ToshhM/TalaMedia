import Link from "next/link";
import type { Article } from "@/lib/types";
import { getUnivers } from "@/lib/univers";
import { formaterDate, formaterDuree } from "@/lib/site";
import { PastilleCode } from "./pastille-code";

/**
 * La carte d'article.
 *
 * Sur la home, six couleurs cohabitent : la couleur reste À L'INTÉRIEUR de
 * la carte — filet de 3 px en haut, pastille de code, et rien d'autre.
 * Elle ne déborde jamais sur le fond de page, sinon les univers se
 * marchent dessus.
 */
export function CarteArticle({
  article,
  taille = "normale",
}: {
  article: Article;
  taille?: "normale" | "une";
}) {
  const univers = getUnivers(article.univers);
  if (!univers) return null;

  const estUne = taille === "une";

  return (
    <article
      data-u={univers.slug}
      className="carte-home group relative flex h-full flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-2">
        <div className="texture" aria-hidden="true" />
        {article.video ? (
          <span className="etiquette absolute bottom-2 right-2 bg-noir/80 px-1.5 py-1 text-blanc">
            Vidéo
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <PastilleCode univers={univers} />
          <Link
            href={`/${univers.slug}/r/${article.rubrique}`}
            className="etiquette relative z-10 hover:text-blanc"
          >
            {univers.rubriques.find((r) => r.slug === article.rubrique)?.nom ??
              article.rubrique}
          </Link>
        </div>

        <h2
          className={`titre-article text-balance ${
            estUne ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl"
          }`}
        >
          <Link
            href={`/${univers.slug}/${article.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.titre}
          </Link>
        </h2>

        <p
          className={`text-pretty text-gris ${
            estUne ? "text-base" : "line-clamp-3 text-sm"
          }`}
        >
          {article.chapo}
        </p>

        <p className="etiquette mt-auto pt-2">
          <time dateTime={article.publieLe}>
            {formaterDate(article.publieLe)}
          </time>
          <span aria-hidden="true"> · </span>
          {formaterDuree(article.tempsDeLecture)}
        </p>
      </div>
    </article>
  );
}
