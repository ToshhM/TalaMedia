# Sanity — le back-office

Ce dossier contient les schémas du CMS, écrits en objets simples pour
rester lisibles avant l'installation de Sanity. Il est volontairement
exclu de la compilation TypeScript du site (`tsconfig.json` → `exclude`) :
tant que les paquets Sanity ne sont pas installés, il ne casse rien.

## Installer

```bash
npm create sanity@latest -- --project <ID_PROJET> --dataset production
```

Puis reprendre les définitions de `schemas/` en les enveloppant dans
`defineType` / `defineField`, et renseigner dans `.env.local` :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=...          # LECTURE SEULE, jamais NEXT_PUBLIC_
SANITY_REVALIDATE_SECRET=...
```

Dès que `NEXT_PUBLIC_SANITY_PROJECT_ID` est renseigné,
`src/lib/content.ts` cesse de servir les données de démonstration —
il faut alors y écrire les requêtes GROQ (l'endroit est marqué `TODO`).

## Ce que le back-office doit garantir

Le gabarit d'article n'est pas une consigne donnée aux rédacteurs, c'est
une contrainte de l'outil : le rédacteur choisit un bloc, il ne le met
jamais en forme. C'est la seule façon d'obtenir la même présentation quel
que soit l'auteur.

### Cinq rôles

Écrire et publier sont deux droits différents — c'est la seule protection
réelle contre l'article publié par erreur un vendredi soir.

| Rôle | Peut | Ne peut pas |
|---|---|---|
| Administrateur | Tout, plus les rôles, la taxonomie et les réglages | — |
| Rédaction en chef | Publier, dépublier, programmer, assigner, composer la home, créer des rubriques | Gérer les comptes et les clés techniques |
| Rédacteur | Créer, écrire, soumettre à relecture, éditer ses propres brouillons | Publier · toucher aux articles des autres |
| Relecteur | Commenter, demander des corrections, valider | Réécrire le fond · publier |
| Invité | Consulter le back-office et les brouillons partagés | Écrire quoi que ce soit |

### Huit contrôles bloquants à la publication

Le bouton « Publier » reste inactif tant que ces conditions ne sont pas
remplies. Le message d'erreur dit quoi corriger, pas « champ invalide ».

1. Titre entre 30 et 65 signes
2. Chapô rempli, entre 200 et 320 signes
3. Image de une présente, en 16:9, avec crédit et texte alternatif
4. Univers et rubrique renseignés, la rubrique appartenant bien à l'univers
5. Au moins un bloc « La ref »
6. Texte alternatif sur toutes les images du corps
7. Slug unique, sans accent, ne heurtant aucun mot réservé
8. Validé par un relecteur différent de l'auteur

### Au-delà de l'édition

- **Calendrier éditorial** — vue semaine et mois : ce qui est tourné, écrit, programmé.
- **Prévisualisation** — un lien de brouillon partageable qui affiche l'article dans le vrai gabarit et la vraie couleur d'univers. On ne relit jamais dans l'éditeur.
- **Historique** — chaque sauvegarde est une version restaurable, avec son auteur.

### Sécurité

- Toutes les clés en variables d'environnement, aucune côté navigateur.
- Jeton du CMS en lecture seule côté site.
- Webhook de revalidation **signé** — sinon n'importe qui peut faire tomber le cache en boucle.
- Authentification à deux facteurs obligatoire sur les comptes qui publient.
- Sauvegarde quotidienne exportable.
