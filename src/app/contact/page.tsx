import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter la rédaction de Talaref : proposition de sujet, correction, droit de réponse.",
  alternates: { canonical: "/contact" },
};

export default function PageContact() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="titre-article text-4xl sm:text-5xl">Contact</h1>

      <div className="corps-article mt-8">
        <p className="mb-6">
          Pour joindre la rédaction, écrire à{" "}
          <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
        </p>

        <h2 className="titre-article mb-4 mt-14 text-2xl sm:text-3xl">
          Droit de réponse
        </h2>
        <p className="mb-6">
          Toute personne nommée ou désignée dans un article publié sur ce site
          dispose d&apos;un droit de réponse. La demande doit être adressée à{" "}
          <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a> dans un délai de
          trois mois suivant la publication, en précisant l&apos;article
          concerné, les passages visés et le texte de la réponse.
        </p>
        <p className="mb-6">
          La rédaction accuse réception sous quinze jours et publie la réponse
          recevable à un emplacement équivalent à celui du passage contesté.
        </p>

        <h2 className="titre-article mb-4 mt-14 text-2xl sm:text-3xl">
          Corrections
        </h2>
        <p>
          Une erreur factuelle signalée est vérifiée puis corrigée dans
          l&apos;article, avec mention de la date de mise à jour lorsque la
          correction porte sur le fond.
        </p>
      </div>
    </main>
  );
}
