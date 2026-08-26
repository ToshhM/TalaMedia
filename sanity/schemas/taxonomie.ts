/**
 * Univers, Rubrique, Tag, Personne, Vidéo, Script.
 *
 * Sept objets au total avec l'article, pas un de plus : chaque entité
 * ajoutée est une entité à maintenir, à modérer et à référencer.
 */

/** Liste FERMÉE de six. On n'en ajoute pas depuis le back-office. */
export const univers = {
  name: "univers",
  title: "Univers",
  type: "document",
  readOnly: true,
  fields: [
    { name: "code", type: "string", title: "Code à trois lettres" },
    { name: "nom", type: "string", title: "Nom" },
    { name: "slug", type: "slug", title: "Slug" },
    { name: "territoire", type: "string", title: "Territoire" },
    { name: "description", type: "text", title: "Description" },
    { name: "couleur", type: "string", title: "Couleur d'accent (hex)" },
    { name: "signature", type: "string", title: "Police de signature" },
  ],
};

/** Le format récurrent. Appartient à exactement un univers. */
export const rubrique = {
  name: "rubrique",
  title: "Rubrique",
  type: "document",
  fields: [
    { name: "nom", type: "string", validation: "required" },
    { name: "slug", type: "slug", options: { source: "nom" } },
    {
      name: "univers",
      type: "reference",
      to: [{ type: "univers" }],
      validation: "required",
    },
    { name: "description", type: "text" },
  ],
};

/** Le sujet transversal : une œuvre, une personne, un jeu, un artiste. */
export const tag = {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    { name: "nom", type: "string", validation: "required" },
    { name: "slug", type: "slug", options: { source: "nom" } },
  ],
};

export const personne = {
  name: "personne",
  title: "Personne",
  type: "document",
  fields: [
    { name: "nom", type: "string", validation: "required" },
    { name: "slug", type: "slug", options: { source: "nom" } },
    { name: "bio", type: "text" },
    {
      name: "photo",
      type: "image",
      fields: [
        { name: "alt", type: "string" },
        { name: "credit", type: "string" },
      ],
    },
    {
      name: "liens",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "libelle", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    },
  ],
};

/** Identifiant YouTube, rattachée à 0 ou 1 article. Pas de page à elle. */
export const video = {
  name: "video",
  title: "Vidéo",
  type: "document",
  fields: [
    { name: "youtubeId", type: "string", validation: "required" },
    { name: "titre", type: "string", validation: "required" },
    { name: "duree", type: "number", title: "Durée (secondes)" },
    { name: "misEnLigneLe", type: "datetime" },
  ],
};

/** Matière première. Versionné, JAMAIS exposé au public. */
export const script = {
  name: "script",
  title: "Script",
  type: "document",
  fields: [
    { name: "titre", type: "string" },
    { name: "texte", type: "text" },
    { name: "auteurVideo", type: "reference", to: [{ type: "personne" }] },
  ],
};
