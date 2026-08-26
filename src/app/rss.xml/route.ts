import { getArticles } from "@/lib/content";
import { ENTETES_RSS, construireFluxRss } from "@/lib/rss";
import { SITE } from "@/lib/site";

export async function GET() {
  const articles = await getArticles({ limite: 50 });

  return new Response(
    construireFluxRss({
      articles,
      titre: SITE.nomComplet,
      description: SITE.description,
      chemin: "/rss.xml",
    }),
    { headers: ENTETES_RSS },
  );
}
