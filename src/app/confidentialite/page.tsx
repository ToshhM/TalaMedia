import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

/**
 * Cette page décrit la mesure d'audience SANS COOKIE retenue par
 * l'architecture V1 (Plausible ou Umami). Si le projet bascule sur Google
 * Analytics, ce texte devient FAUX : GA dépose des identifiants, ce qui
 * impose un bandeau de consentement préalable et une section transferts
 * hors Union européenne. Ne pas laisser les deux coexister.
 */
export default function PageConfidentialite() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="titre-article text-4xl sm:text-5xl">
        Politique de confidentialité
      </h1>

      <div className="corps-article mt-8">
        <h2 className="titre-article mb-4 mt-12 text-2xl">
          Ce que ce site collecte
        </h2>
        <p className="mb-6">
          La consultation de ce site ne nécessite aucun compte et ne dépose
          aucun cookie publicitaire ni traceur tiers à des fins de ciblage.
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">Mesure d&apos;audience</h2>
        <p className="mb-6">
          L&apos;audience est mesurée avec un outil sans cookie : aucune donnée
          n&apos;est stockée sur votre appareil et aucun identifiant ne permet
          de vous suivre d&apos;un site à l&apos;autre. Seules des statistiques
          agrégées sont produites — pages consultées, provenance, type
          d&apos;appareil.
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">Contenus intégrés</h2>
        <p className="mb-6">
          Les vidéos sont hébergées par YouTube et intégrées via le domaine{" "}
          <code>youtube-nocookie.com</code>. Aucun élément n&apos;est chargé
          depuis YouTube tant que vous n&apos;avez pas cliqué pour lancer la
          lecture : jusqu&apos;à ce clic, seule une vignette est affichée. En
          lançant la lecture, vous établissez une connexion avec les serveurs
          de YouTube, soumise à la politique de confidentialité de ce service.
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">
          Formulaire de contact
        </h2>
        <p className="mb-6">
          Les messages adressés à la rédaction sont conservés le temps
          nécessaire au traitement de la demande, puis supprimés.
        </p>

        <h2 className="titre-article mb-4 mt-12 text-2xl">Vos droits</h2>
        <p className="mb-6">
          Vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement et d&apos;opposition sur les données vous
          concernant. Ces demandes s&apos;exercent auprès de{" "}
          <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>. Vous pouvez
          également introduire une réclamation auprès de la CNIL.
        </p>
      </div>
    </main>
  );
}
