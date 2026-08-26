import { getArticles } from "@/lib/content";
import { UNIVERS, getUnivers } from "@/lib/univers";
import { ENTETES_RSS, construireFluxRss } from "@/lib/rss";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return UNIVERS.map((u) => ({ univers: u.slug }));
}

export async function GET(
  _requete: Request,
  { params }: { params: Promise<{ univers: string }> },
) {
  const { univers: slug } = await params;
  const univers = getUnivers(slug);
  if (!univers) return new Response("Univers inconnu", { status: 404 });

  const articles = await getArticles({ univers: univers.slug, limite: 50 });

  return new Response(
    construireFluxRss({
      articles,
      titre: `${SITE.nom} · ${univers.nom}`,
      description: univers.description,
      chemin: `/${univers.slug}/rss.xml`,
    }),
    { headers: ENTETES_RSS },
  );
}
