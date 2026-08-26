/**
 * Schéma « Article » — l'objet canonique du site.
 *
 * Écrit en objet simple : à envelopper dans defineType/defineField une
 * fois Sanity installé. Les règles de validation ci-dessous ne sont pas
 * décoratives, ce sont les huit contrôles bloquants de la publication.
 */
export const article = {
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    {
      name: "titre",
      type: "string",
      title: "Titre",
      description:
        "30 à 65 signes. Au-delà, il est tronqué dans Google et sur les cartes de partage.",
      validation: "required · min 30 · max 65",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "Généré depuis le titre, sans accent. Modifiable UNE SEULE FOIS avant publication : après, il ne bouge plus sans redirection 301.",
      options: { source: "titre", maxLength: 80 },
      validation: "required · unique · aucun mot réservé (r, tag, videos, auteurs, recherche, preview)",
    },
    {
      name: "chapo",
      type: "text",
      title: "Chapô",
      description:
        "200 à 320 signes. Sert de résumé, de méta-description et d'accroche sur la home — trois usages, un seul texte.",
      validation: "required · min 200 · max 320",
    },
    {
      name: "imageDeUne",
      type: "image",
      title: "Image de une",
      description: "16:9, 1600 px minimum.",
      fields: [
        { name: "alt", type: "string", validation: "required" },
        { name: "credit", type: "string", validation: "required" },
      ],
      validation: "required",
    },
    {
      name: "univers",
      type: "reference",
      to: [{ type: "univers" }],
      title: "Univers",
      description:
        "UN SEUL. C'est lui qui décide de la couleur et de la typo de la page. Un sujet à cheval sur deux univers choisit son angle dominant ; le lien vers l'autre territoire se fait par un tag.",
      validation: "required",
    },
    {
      name: "rubrique",
      type: "reference",
      to: [{ type: "rubrique" }],
      title: "Rubrique",
      description: "Limitée aux rubriques de l'univers choisi.",
      validation: "required · doit appartenir à l'univers sélectionné",
    },
    {
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      title: "Tags",
      description: "0 à 5. Au-delà, le tag ne veut plus rien dire.",
      validation: "max 5",
    },
    {
      name: "auteurs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "personne" }] }],
      title: "Auteurs",
      description: "Un article non signé n'est pas publiable.",
      validation: "required · min 1",
    },
    {
      name: "video",
      type: "reference",
      to: [{ type: "video" }],
      title: "Vidéo",
      description:
        "0 ou 1. Si présente, elle se place au-dessus du premier intertitre. La vidéo n'a pas de page à elle.",
    },
    {
      name: "scriptSource",
      type: "reference",
      to: [{ type: "script" }],
      title: "Script source",
      description:
        "Trace l'origine du texte. Visible uniquement en interne, jamais publié.",
    },
    {
      name: "corps",
      type: "array",
      title: "Corps",
      description:
        "Uniquement les 14 blocs du jeu fermé. Aucun texte libre mis en forme.",
      of: [
        { type: "blocParagraphe" },
        { type: "blocIntertitre" },
        { type: "blocModuleVideo" },
        { type: "blocLaRef" },
        { type: "blocImage" },
        { type: "blocGalerie" },
        { type: "blocChiffreCle" },
        { type: "blocCitation" },
        { type: "blocListe" },
        { type: "blocChronologie" },
        { type: "blocFicheTechnique" },
        { type: "blocALireAussi" },
        { type: "blocSeparateur" },
      ],
      validation:
        "required · au moins un bloc « La ref » · un intertitre minimum toutes les 400 mots",
    },
    {
      name: "publieLe",
      type: "datetime",
      title: "Publié le",
      description: "Programmable à l'avance.",
      validation: "required",
    },
    {
      name: "misAJourLe",
      type: "datetime",
      title: "Mis à jour le",
      description:
        "Automatique. Affiché sur le site seulement si l'écart dépasse 30 jours.",
      readOnly: true,
    },
    {
      name: "tempsDeLecture",
      type: "number",
      title: "Temps de lecture",
      description:
        "JAMAIS saisi à la main — 230 mots/minute, recalculé à chaque sauvegarde.",
      readOnly: true,
    },
  ],
};
