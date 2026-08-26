import type { Metadata } from "next";
import Link from "next/link";
import { UNIVERS } from "@/lib/univers";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: SITE.description,
  alternates: { canonical: "/a-propos" },
};

export default function PageAPropos() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="titre-article text-4xl sm:text-5xl">
        Une marque. Six univers.
      </h1>

      <div className="corps-article mt-8">
        <p className="mb-6">
          Talaref parle de jeux vidéo, de manga, de pop culture, de politique,
          de musique et d&apos;image. Six terrains, un seul média. Le socle
          typographique et le noir ne bougent jamais : c&apos;est ce qui rend
          la marque reconnaissable. La couleur, la police de signature et la
          texture changent : c&apos;est ce qui dit au lecteur, en une
          demi-seconde, sur quel terrain il vient d&apos;atterrir.
        </p>
        <p className="mb-6">
          Chaque sujet donne un article, et cet article est l&apos;objet
          principal du site. Quand il y a une vidéo, elle vit à
          l&apos;intérieur de l&apos;article — jamais sur une page à part. Un
          sujet, une adresse.
        </p>

        <h2 className="titre-article mb-4 mt-14 text-2xl sm:text-3xl">
          Les six territoires
        </h2>
        <ul className="mb-6 space-y-4">
          {UNIVERS.map((u) => (
            <li key={u.slug} data-u={u.slug}>
              <Link href={`/${u.slug}`} className="group block">
                <span className="pastille-code">{u.code}</span>{" "}
                <span className="font-semibold text-blanc group-hover:text-accent">
                  {u.nom}
                </span>
                <span className="text-gris"> — {u.territoire}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="titre-article mb-4 mt-14 text-2xl sm:text-3xl">
          Nous écrire
        </h2>
        <p>
          Pour une proposition de sujet, une correction ou une demande de droit
          de réponse : <Link href="/contact">la page contact</Link>.
        </p>
      </div>
    </main>
  );
}
