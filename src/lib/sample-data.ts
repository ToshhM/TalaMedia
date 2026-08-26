import type { Article, Personne } from "./types";

/**
 * Données de démonstration.
 *
 * Elles servent UNIQUEMENT tant que Sanity n'est pas branché : dès que
 * NEXT_PUBLIC_SANITY_PROJECT_ID est renseigné, src/lib/content.ts
 * interroge le CMS et ce fichier n'est plus lu. Il reste dans le dépôt
 * comme jeu d'essai pour développer hors ligne.
 */

const toshiro: Personne = {
  slug: "toshiro",
  nom: "Toshiro Mpika",
  bio: "Fondateur de Talaref. Photographe et réalisateur.",
};

const redaction: Personne = {
  slug: "la-redaction",
  nom: "La rédaction",
};

function img(alt: string, credit: string) {
  return {
    url: "",
    alt,
    credit,
  };
}

export const ARTICLES_DEMO: Article[] = [
  {
    slug: "silent-hill-2-remake-le-brouillard-a-un-cout",
    titre: "Silent Hill 2 Remake : le brouillard a un coût",
    chapo:
      "Bloober Team reprend un monument du survival horror et déplace la caméra derrière l'épaule. Ce choix technique change la peur elle-même — et il fallait recalculer tout l'éclairage pour que le brouillard reste un personnage.",
    imageDeUne: img("Rue embrumée de Silent Hill", "Konami"),
    univers: "arcade",
    rubrique: "test",
    tags: [{ slug: "silent-hill", nom: "Silent Hill" }],
    auteurs: [toshiro],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      titre: "Silent Hill 2 Remake — notre test",
      duree: 842,
      misEnLigneLe: "2026-08-18",
    },
    corps: [
      {
        _key: "b1",
        _type: "paragraphe",
        texte:
          "Le brouillard de Silent Hill n'a jamais été une intention artistique. En 1999, la PlayStation ne pouvait pas afficher la ville entière : le brouillard masquait ce que la console ne calculait pas. Vingt-sept ans plus tard, le matériel n'a plus cette limite, et c'est précisément là que le remake devient intéressant.",
      },
      {
        _key: "b2",
        _type: "laRef",
        titre: "La distance d'affichage",
        texte:
          "En 3D temps réel, la distance d'affichage est la profondeur au-delà de laquelle le moteur cesse de dessiner. Les jeux de l'époque la masquaient par du brouillard : sans lui, on aurait vu les décors apparaître d'un coup. La contrainte est devenue une signature.",
      },
      {
        _key: "b3",
        _type: "intertitre",
        niveau: 2,
        texte: "La caméra change la peur",
      },
      {
        _key: "b4",
        _type: "paragraphe",
        texte:
          "Passer d'une caméra fixe à une caméra à l'épaule ne modifie pas seulement le confort de jeu : cela supprime le hors-champ imposé. L'original décidait de ce que vous ne pouviez pas voir. Le remake vous rend ce pouvoir, et perd au passage une partie de son angoisse.",
      },
      {
        _key: "b5",
        _type: "chiffreCle",
        valeur: "8 h 40",
        libelle: "durée moyenne d'une première partie",
        source: "Relevé interne sur trois sessions complètes",
      },
      { _key: "b6", _type: "aLireAussi" },
    ],
    publieLe: "2026-08-20",
    tempsDeLecture: 7,
  },
  {
    slug: "one-piece-1105-le-chapitre-qui-cloture-egghead",
    titre: "One Piece 1105 : le chapitre qui clôture Egghead",
    chapo:
      "Oda referme l'arc le plus dense de la série depuis Marineford. Retour sur la mécanique de révélation qu'il installe depuis quarante chapitres, et sur ce qu'elle annonce pour la suite.",
    imageDeUne: img("Planche de manga", "Shueisha"),
    univers: "encre",
    rubrique: "chapitre",
    tags: [{ slug: "one-piece", nom: "One Piece" }],
    auteurs: [redaction],
    corps: [
      {
        _key: "c1",
        _type: "paragraphe",
        texte:
          "Un arc de One Piece se juge à sa dernière page. Egghead avait installé plus de fils narratifs qu'aucun arc précédent, et la question n'était pas de savoir si Oda allait les refermer, mais lesquels il choisirait de laisser ouverts.",
      },
      {
        _key: "c2",
        _type: "laRef",
        titre: "Le nakama-power",
        texte:
          "Terme employé par le fandom pour désigner le moment où l'amitié devient un ressort de puissance narrative. Chez Oda, il fonctionne parce qu'il est toujours préparé plusieurs centaines de chapitres à l'avance, jamais improvisé.",
      },
      {
        _key: "c3",
        _type: "citation",
        texte: "Un arc se termine quand le lecteur comprend pourquoi il a commencé.",
        auteur: "Eiichiro Oda, entretien Jump, 2019",
      },
    ],
    publieLe: "2026-08-22",
    tempsDeLecture: 5,
  },
  {
    slug: "dune-partie-trois-ce-que-villeneuve-doit-trancher",
    titre: "Dune partie trois : ce que Villeneuve doit trancher",
    chapo:
      "Le Messie de Dune est un livre qui démonte son propre héros. Adapter ce retournement après deux films qui l'ont construit est le pari le plus risqué du cinéma de science-fiction contemporain.",
    imageDeUne: img("Dune sous deux soleils", "Warner Bros."),
    univers: "pop",
    rubrique: "sortie",
    tags: [{ slug: "dune", nom: "Dune" }],
    auteurs: [toshiro],
    corps: [
      {
        _key: "d1",
        _type: "paragraphe",
        texte:
          "Herbert a écrit Le Messie de Dune parce que ses lecteurs avaient adoré Paul Atréides. Le livre est une correction : il montre le coût humain du messianisme que le premier tome rendait séduisant.",
      },
      {
        _key: "d2",
        _type: "laRef",
        titre: "Le jihad fremen",
        texte:
          "Dans le roman, la guerre sainte déclenchée au nom de Paul fait douze milliards de morts. Le premier film l'évoque en visions, le second l'annonce. Le troisième doit le montrer — ou renoncer au propos du livre.",
      },
    ],
    publieLe: "2026-08-24",
    tempsDeLecture: 6,
  },
  {
    slug: "sahel-comprendre-le-retrait-francais-en-cinq-dates",
    titre: "Sahel : comprendre le retrait français en cinq dates",
    chapo:
      "Entre 2013 et 2026, la présence militaire française au Sahel est passée de l'intervention saluée au départ contraint. Chronologie d'un basculement, sans raccourci.",
    imageDeUne: img("Carte du Sahel", "Talaref"),
    univers: "agora",
    rubrique: "chronologie",
    tags: [{ slug: "sahel", nom: "Sahel" }],
    auteurs: [redaction],
    corps: [
      {
        _key: "e1",
        _type: "paragraphe",
        texte:
          "Un retrait militaire ne se décide jamais en un jour. Celui du Sahel s'explique par une suite de décisions dont chacune, prise isolément, paraissait raisonnable.",
      },
      {
        _key: "e2",
        _type: "chronologie",
        entrees: [
          {
            date: "Janvier 2013",
            texte:
              "Lancement de l'opération Serval à la demande des autorités maliennes.",
          },
          {
            date: "Août 2014",
            texte:
              "Serval devient Barkhane et s'étend à cinq pays, sans mandat de sortie défini.",
          },
          {
            date: "Février 2022",
            texte: "Annonce du retrait du Mali après la rupture diplomatique.",
          },
        ],
      },
      {
        _key: "e3",
        _type: "laRef",
        titre: "Le G5 Sahel",
        texte:
          "Cadre institutionnel créé en 2014 réunissant Mauritanie, Mali, Burkina Faso, Niger et Tchad. Sa dissolution de fait en 2023 a privé la région de sa principale structure de coordination sécuritaire.",
      },
    ],
    publieLe: "2026-08-25",
    tempsDeLecture: 9,
  },
  {
    slug: "tiakola-et-l-economie-du-feat",
    titre: "Tiakola et l'économie du featuring",
    chapo:
      "Un featuring n'est pas un geste artistique, c'est un contrat. Décomposition des flux financiers derrière une collaboration rap française, des avances au partage des royalties de streaming.",
    imageDeUne: img("Scène de concert", "Talaref"),
    univers: "bpm",
    rubrique: "business",
    tags: [{ slug: "tiakola", nom: "Tiakola" }],
    auteurs: [toshiro],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      titre: "L'économie du feat, expliquée",
      duree: 1120,
      misEnLigneLe: "2026-08-14",
    },
    corps: [
      {
        _key: "f1",
        _type: "paragraphe",
        texte:
          "Quand deux artistes apparaissent sur un même morceau, trois contrats se superposent : celui de l'enregistrement, celui de l'édition, et celui de l'exploitation. Ils ne se partagent pas dans les mêmes proportions.",
      },
      {
        _key: "f2",
        _type: "chiffreCle",
        valeur: "0,0032 €",
        libelle: "revenu moyen par écoute sur les principales plateformes",
        source: "Moyenne constatée toutes plateformes confondues, 2025",
      },
      {
        _key: "f3",
        _type: "laRef",
        titre: "Le split sheet",
        texte:
          "Document signé en studio qui fixe les parts de chaque contributeur avant toute exploitation. Son absence est la première cause de litige dans le rap français : sans lui, les parts se négocient après le succès, donc en position de faiblesse.",
      },
    ],
    publieLe: "2026-08-21",
    tempsDeLecture: 8,
  },
  {
    slug: "photographier-un-match-en-salle-sans-flash",
    titre: "Photographier un match en salle sans flash",
    chapo:
      "Lumière artificielle instable, sujets rapides, flash interdit. Le handball en salle est l'un des terrains les plus exigeants pour un photographe. Méthode, réglages et arbitrages assumés.",
    imageDeUne: img("Match de handball", "Toshiro Mpika"),
    univers: "objectif",
    rubrique: "tuto",
    tags: [{ slug: "handball", nom: "Handball" }],
    auteurs: [toshiro],
    corps: [
      {
        _key: "g1",
        _type: "paragraphe",
        texte:
          "Une salle de handball est éclairée pour que les joueurs voient le ballon, pas pour qu'un capteur enregistre proprement. La lumière scintille à la fréquence du secteur et sa température varie d'un projecteur à l'autre.",
      },
      {
        _key: "g2",
        _type: "ficheTechnique",
        lignes: [
          { libelle: "Vitesse", valeur: "1/1000 s minimum" },
          { libelle: "Ouverture", valeur: "f/2.8 constante" },
          { libelle: "Sensibilité", valeur: "3200 à 6400 ISO" },
          { libelle: "Mise au point", valeur: "Suivi continu, zone réduite" },
        ],
        verdict:
          "Le bruit numérique se rattrape au développement, le flou de mouvement jamais. La vitesse passe avant tout le reste.",
      },
      {
        _key: "g3",
        _type: "laRef",
        titre: "Le flicker",
        texte:
          "Scintillement invisible à l'œil provoqué par l'alternance du courant. À vitesse élevée, il produit des bandes de densité et des dérives de couleur d'une image à l'autre. La plupart des boîtiers récents proposent une détection anti-flicker qui synchronise le déclenchement.",
      },
    ],
    publieLe: "2026-08-19",
    tempsDeLecture: 6,
  },
];

export const PERSONNES_DEMO: Personne[] = [toshiro, redaction];
