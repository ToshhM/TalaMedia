import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

/**
 * ATTENTION — les mentions marquées « À COMPLÉTER » sont des trous à
 * remplir, pas des valeurs par défaut. Publier cette page en l'état
 * reviendrait à publier des informations légales fausses.
 *
 * Un service de communication au public en ligne doit nommer un directeur
 * de la publication, en plus des mentions habituelles (éditeur, forme
 * juridique, capital, RCS, hébergeur, contact).
 */

function AComplerer({ quoi }: { quoi: string }) {
  return (
    <mark className="bg-encre/20 px-1 text-encre" title="Information à fournir">
      [À COMPLÉTER : {quoi}]
    </mark>
  );
}

export default function PageMentionsLegales() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="titre-article text-4xl sm:text-5xl">Mentions légales</h1>

      <div className="corps-article mt-8">
        <h2 className="titre-article mb-4 mt-12 text-2xl">Éditeur du site</h2>
        <p className="mb-6">
          {SITE.nomComplet}
          <br />
          Forme juridique : <AComplerer quoi="SAS, SARL, association…" />
          <br />
          Capital social : <AComplerer quoi="montant" />
          <br />
          Siège social : <AComplerer quoi="adresse complète" />
          <br />
          RCS : <AComplerer quoi="ville et numéro d'immatriculation" />
          <br />
          Numéro de TVA intracommunautaire :{" "}
          <AComplerer quoi="numéro" />
          <br />
          Contact : <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">
          Directeur de la publication
        </h2>
        <p className="mb-6">
          {SITE.directeurDePublication}, en qualité de{" "}
          <AComplerer quoi="fonction : président, gérant, directeur…" />.
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">Hébergeur</h2>
        <p className="mb-6">
          <AComplerer quoi="raison sociale de l'hébergeur" />
          <br />
          <AComplerer quoi="adresse de l'hébergeur" />
          <br />
          <AComplerer quoi="téléphone de l'hébergeur" />
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">Propriété intellectuelle</h2>
        <p className="mb-6">
          Les textes, photographies et vidéos publiés sur ce site sont protégés
          par le droit d&apos;auteur. Chaque image porte le crédit de son
          auteur. Toute reproduction, même partielle, est soumise à
          autorisation écrite préalable, à l&apos;exception des courtes
          citations accompagnées du nom de l&apos;auteur et de la source.
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">Crédits</h2>
        <p className="mb-6">
          Les crédits photo et vidéo figurent sous chaque média. Une erreur ou
          une omission de crédit peut être signalée à{" "}
          <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a> : elle est
          corrigée sans délai.
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">Droit de réponse</h2>
        <p>
          La procédure de droit de réponse est décrite sur la{" "}
          <a href="/contact">page contact</a>.
        </p>
      </div>
    </main>
  );
}
