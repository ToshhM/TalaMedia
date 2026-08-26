import type { Univers } from "@/lib/univers";

/**
 * La pastille de code à trois lettres.
 * C'est le repère qui rend une grille de contenus lisible d'un seul regard.
 */
export function PastilleCode({
  univers,
  className = "",
}: {
  univers: Univers;
  className?: string;
}) {
  return (
    <span
      className={`pastille-code ${className}`}
      title={`${univers.nom} — ${univers.territoire}`}
    >
      {univers.code}
    </span>
  );
}
