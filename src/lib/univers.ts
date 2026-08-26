/**
 * Les six univers editoriaux — liste FERMÉE.
 *
 * Charte graphique V1 : chaque univers porte un code de trois lettres, un
 * nom, une couleur, une police de signature et une texture. Ces cinq
 * éléments voyagent ensemble : on ne prend jamais la couleur d'Agora avec
 * la typo de Pop.
 *
 * Le slug d'URL est le code de l'univers en minuscules — /arcade, /agora.
 * Ajouter un septième univers ici sans lui donner code, couleur, typo ET
 * texture casse le système : la charte l'interdit explicitement.
 */

export type UniversSlug =
  | "arcade"
  | "encre"
  | "pop"
  | "agora"
  | "bpm"
  | "objectif";

export type Rubrique = {
  slug: string;
  nom: string;
};

export type Univers = {
  slug: UniversSlug;
  /** Code à trois lettres affiché en pastille. */
  code: string;
  /** Le mot d'univers, en police de signature. */
  nom: string;
  /** Le territoire, en clair. */
  territoire: string;
  description: string;
  /** Accent de l'univers. Contraste vérifié sur Noir Forge #0B0B0C. */
  couleur: string;
  /** Contraste mesuré sur Noir Forge, pour mémoire. */
  contraste: string;
  /** Variable CSS de la police de signature (définie dans fonts.ts). */
  signature: string;
  rubriques: Rubrique[];
};

export const UNIVERS: Univers[] = [
  {
    slug: "arcade",
    code: "ARC",
    nom: "Arcade",
    territoire: "Jeux vidéo",
    description:
      "Le terrain du gameplay, des sorties, de l'e-sport et de la culture joueur. La couleur vient du phosphore vert des écrans cathodiques et des HUD.",
    couleur: "#A3FF3D",
    contraste: "15,9:1",
    signature: "var(--font-press-start)",
    rubriques: [
      { slug: "test", nom: "Test" },
      { slug: "speedrun", nom: "Speedrun" },
      { slug: "studio", nom: "Studio" },
      { slug: "e-sport", nom: "E-sport" },
      { slug: "patch", nom: "Patch" },
    ],
  },
  {
    slug: "encre",
    code: "ENC",
    nom: "Encre",
    territoire: "Manga & anime",
    description:
      "Manga, anime, animation et culture japonaise. Le vermillon est celui du sceau d'encre et de la jaquette de tankôbon : un rouge qui vire orange, jamais un rouge d'alerte.",
    couleur: "#FF4A3D",
    contraste: "5,9:1",
    signature: "var(--font-reggae-one)",
    rubriques: [
      { slug: "chapitre", nom: "Chapitre" },
      { slug: "auteur", nom: "Auteur" },
      { slug: "adaptation", nom: "Adaptation" },
      { slug: "classement", nom: "Classement" },
      { slug: "animation", nom: "Animation" },
    ],
  },
  {
    slug: "pop",
    code: "POP",
    nom: "Pop",
    territoire: "Pop culture",
    description:
      "Cinéma, séries, mode, internet, célébrités. Le jaune est la couleur la plus bruyante du système : c'est l'univers qui assume le divertissement pur.",
    couleur: "#FFC53D",
    contraste: "12,5:1",
    signature: "var(--font-bungee)",
    rubriques: [
      { slug: "sortie", nom: "Sortie" },
      { slug: "serie", nom: "Série" },
      { slug: "phenomene", nom: "Phénomène" },
      { slug: "mode", nom: "Mode" },
      { slug: "chronique", nom: "Chronique" },
    ],
  },
  {
    slug: "agora",
    code: "AGO",
    nom: "Agora",
    territoire: "Politique & société",
    description:
      "Géopolitique, société, économie, histoire. Le bleu froid est le seul accent du système qui ne cherche pas à attirer l'œil : il donne à l'univers le plus sérieux une distance visuelle assumée.",
    couleur: "#5B8DFF",
    contraste: "6,3:1",
    signature: "var(--font-instrument-serif)",
    rubriques: [
      { slug: "decryptage", nom: "Décryptage" },
      { slug: "carte", nom: "Carte" },
      { slug: "portrait", nom: "Portrait" },
      { slug: "chronologie", nom: "Chronologie" },
      { slug: "le-mot", nom: "Le mot" },
    ],
  },
  {
    slug: "bpm",
    code: "BPM",
    nom: "BPM",
    territoire: "Musique",
    description:
      "Rap, afro, scènes, industrie, business de la musique. Le violet vient de la lumière de club et de la LED de scène — la couleur est toujours traitée comme une source lumineuse.",
    couleur: "#C05CFF",
    contraste: "5,8:1",
    signature: "var(--font-anton)",
    rubriques: [
      { slug: "album", nom: "Album" },
      { slug: "carriere", nom: "Carrière" },
      { slug: "chiffres", nom: "Chiffres" },
      { slug: "live", nom: "Live" },
      { slug: "business", nom: "Business" },
    ],
  },
  {
    slug: "objectif",
    code: "OBJ",
    nom: "Objectif",
    territoire: "Photo & vidéo",
    description:
      "Le métier : photo, réalisation, matériel, coulisses de production. Le cyan est la couleur des repères de cadrage et des interfaces de monitoring.",
    couleur: "#3DE0FF",
    contraste: "12,5:1",
    signature: "var(--font-dm-mono)",
    rubriques: [
      { slug: "materiel", nom: "Matériel" },
      { slug: "making-of", nom: "Making-of" },
      { slug: "tuto", nom: "Tuto" },
      { slug: "portrait", nom: "Portrait" },
      { slug: "plan-par-plan", nom: "Plan par plan" },
    ],
  },
];

export const UNIVERS_SLUGS = UNIVERS.map((u) => u.slug);

export function getUnivers(slug: string): Univers | undefined {
  return UNIVERS.find((u) => u.slug === slug);
}

export function isUniversSlug(slug: string): slug is UniversSlug {
  return UNIVERS_SLUGS.includes(slug as UniversSlug);
}

export function getRubrique(
  universSlug: string,
  rubriqueSlug: string,
): Rubrique | undefined {
  return getUnivers(universSlug)?.rubriques.find(
    (r) => r.slug === rubriqueSlug,
  );
}
