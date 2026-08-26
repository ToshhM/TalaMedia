# Talaref Média

Le site du média Talaref. Next.js 15 (App Router), TypeScript, Tailwind v4.

Conforme à **Charte graphique V1** et **Architecture V1** (août 2026).

---

## Démarrer

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Le site tourne sur <http://localhost:3000> avec les données de
démonstration de `src/lib/sample-data.ts`. Aucun compte Sanity n'est
nécessaire pour développer.

> Les polices sont téléchargées depuis Google Fonts à la première
> compilation : la machine doit avoir accès au réseau.

## Le principe

**L'article est l'objet canonique du site, la vidéo est un bloc à
l'intérieur.** Trois conséquences qui gouvernent tous les arbitrages :

- **Un sujet = une URL.** Jamais deux pages sur la même chose. Toute
  l'autorité de référencement se concentre au même endroit.
- **La vidéo n'a pas de page à elle.** Elle est hébergée par YouTube et
  intégrée dans l'article. Le site ne rejoue pas le rôle de YouTube.
- **Le script n'est pas un contenu.** C'est de la matière première, jamais
  publiée telle quelle.

## Les URL

```
/                              home
/arcade                        univers (6 pages)
/arcade/r/test                 rubrique
/arcade/silent-hill-2-remake   article — la page canonique
/tag/one-piece                 tag, transversal aux 6 univers
/videos                        index vidéo
/auteurs/toshiro               profil
/recherche
/a-propos  /contact  /mentions-legales  /confidentialite
/rss.xml  /arcade/rss.xml  /sitemap.xml
```

Le segment `/r/` n'est pas décoratif : sans lui, `/arcade/tests`
désignerait aussi bien la rubrique « Test » qu'un article dont le slug
serait « tests ». Les mots `r`, `tag`, `videos`, `auteurs`, `recherche` et
`preview` sont **réservés** (`src/lib/reserved.ts`) : le back-office doit
refuser un slug d'article qui les emploie.

**Une URL est un engagement.** Un slug modifié après publication crée
toujours une redirection 301 dans `next.config.ts`, jamais un doublon.

## Où se trouve quoi

| Fichier | Rôle |
|---|---|
| `src/lib/univers.ts` | Les 6 univers, leurs couleurs, typos et 30 rubriques. Liste **fermée**. |
| `src/lib/types.ts` | Le jeu de 14 blocs, fermé lui aussi. |
| `src/lib/content.ts` | **Seule** porte d'accès au contenu. Aucune page n'interroge le CMS directement. |
| `src/lib/reserved.ts` | Mots réservés et slugification. |
| `src/app/globals.css` | Les tokens de la charte + les 6 textures. |
| `src/components/blocs.tsx` | Le rendu des 14 blocs. |
| `sanity/` | Schémas du back-office. Exclu de la compilation tant que Sanity n'est pas installé. |

## Comment la couleur bascule

Un seul attribut sur le conteneur, et toute la page — liens, boutons,
filets, badges, survols — passe dans l'univers du contenu :

```tsx
<main data-u="agora">
```

`--accent` et `--signature` suivent. C'est le mécanisme décrit en §04 de
la charte. Ne jamais coder une couleur d'univers en dur dans un
composant.

## Règles à ne pas casser

- **Une seule couleur d'univers par contenu.** Sur la home, la couleur
  reste à l'intérieur de la carte : filet de 3 px en haut, pastille de
  code, rien d'autre. Le fond de page reste strictement noir.
- **La page d'univers est le seul endroit** où l'accent occupe une pleine
  largeur.
- **Sur la page d'article, retour au dosage 80/15/5** : l'accent ne sert
  plus qu'aux liens, aux encadrés, à la barre de progression et au badge.
- **« TALAREF » est toujours blanc**, en JetBrains Mono, interlettrage
  0.34em. Jamais en couleur d'accent.
- **Une police de signature ne sert jamais** au texte courant ni aux
  sous-titres.
- **La texture passe derrière l'image**, jamais par-dessus le texte.

## Reste à faire

- [ ] Brancher Sanity : requêtes GROQ dans `src/lib/content.ts` (marqué `TODO`)
- [ ] Remplir les mentions légales — la page contient des `[À COMPLÉTER]` volontaires
- [ ] Pagefind pour la recherche (index statique, après le premier `next build`)
- [ ] Images de partage générées à la volée (`opengraph-image.tsx`)
- [ ] Mesure d'audience — voir la note ci-dessous
- [ ] Webhook de revalidation signé
- [ ] Formulaire de contact protégé contre le spam

### Note sur la mesure d'audience

L'architecture V1 retient **Plausible ou Umami** : sans cookie, donc sans
bandeau de consentement. La page `/confidentialite` est écrite pour cette
hypothèse.

Passer à **Google Analytics** change trois choses : un bandeau de
consentement préalable devient obligatoire, GA ne doit se déclencher
qu'après acceptation, et la politique de confidentialité doit être
réécrite (dépôt d'identifiants, transferts hors Union européenne). Les
deux options ne peuvent pas coexister — il faut trancher avant de coder.

## Sécurité

- Toutes les clés en variables d'environnement. `.env.local` n'est jamais
  versionné.
- `SANITY_API_READ_TOKEN` est **en lecture seule** et **sans** préfixe
  `NEXT_PUBLIC_` : ce préfixe l'enverrait dans le navigateur.
- `src/lib/content.ts` est marqué `server-only` : il ne peut pas être
  importé par un composant client.
- En-têtes de sécurité dans `next.config.ts`.
