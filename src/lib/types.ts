import type { UniversSlug } from "./univers";

/**
 * Le jeu de blocs FERMÉ — architecture V1 §03.
 *
 * Quatorze blocs, pas un de plus. Le rédacteur ne peut pas mettre en
 * forme, il ne peut que choisir un bloc : la cohérence n'est plus une
 * consigne, c'est une contrainte de l'outil. Toute demande d'un quinzième
 * bloc passe par la rédaction en chef.
 */
export type TypeBloc =
  | "chapo"
  | "paragraphe"
  | "intertitre"
  | "moduleVideo"
  | "laRef"
  | "image"
  | "galerie"
  | "chiffreCle"
  | "citation"
  | "liste"
  | "chronologie"
  | "ficheTechnique"
  | "aLireAussi"
  | "separateur";

export type Image = {
  url: string;
  alt: string;
  /** Obligatoire : crédits photo systématiques (§09, obligation légale). */
  credit: string;
  legende?: string;
  largeur?: number;
  hauteur?: number;
};

export type Bloc =
  | { _key: string; _type: "chapo"; texte: string }
  | { _key: string; _type: "paragraphe"; texte: string }
  | { _key: string; _type: "intertitre"; niveau: 2 | 3; texte: string }
  | { _key: string; _type: "moduleVideo"; video: Video }
  | { _key: string; _type: "laRef"; titre: string; texte: string }
  | { _key: string; _type: "image"; image: Image }
  | { _key: string; _type: "galerie"; images: Image[] }
  | {
      _key: string;
      _type: "chiffreCle";
      valeur: string;
      libelle: string;
      source: string;
    }
  | { _key: string; _type: "citation"; texte: string; auteur: string }
  | { _key: string; _type: "liste"; entrees: string[] }
  | {
      _key: string;
      _type: "chronologie";
      entrees: { date: string; texte: string }[];
    }
  | {
      _key: string;
      _type: "ficheTechnique";
      lignes: { libelle: string; valeur: string }[];
      verdict?: string;
    }
  | { _key: string; _type: "aLireAussi" }
  | { _key: string; _type: "separateur" };

export type Video = {
  /** Identifiant YouTube. La vidéo n'a pas de page à elle (§00). */
  youtubeId: string;
  titre: string;
  /** Durée en secondes, pour le VideoObject de Schema.org. */
  duree: number;
  misEnLigneLe: string;
};

export type Personne = {
  slug: string;
  nom: string;
  bio?: string;
  photo?: Image;
  liens?: { libelle: string; url: string }[];
};

export type Tag = {
  slug: string;
  nom: string;
};

export type Article = {
  slug: string;
  /** 30 à 65 signes — au-delà, tronqué dans Google. */
  titre: string;
  /** 200 à 320 signes — résumé, méta-description et accroche sur la home. */
  chapo: string;
  imageDeUne: Image;
  univers: UniversSlug;
  /** Doit appartenir à l'univers choisi. */
  rubrique: string;
  tags: Tag[];
  /** Un article non signé n'est pas publiable. */
  auteurs: Personne[];
  video?: Video;
  corps: Bloc[];
  publieLe: string;
  misAJourLe?: string;
  /** Jamais saisi à la main — 230 mots/minute, recalculé à la sauvegarde. */
  tempsDeLecture: number;
};
