import Link from "next/link";

/**
 * Le verrou de marque : « TALAREF » se pose toujours au même endroit,
 * en JetBrains Mono capitales, interlettrage 0.34em. Il ne prend jamais
 * la couleur d'accent — blanc, toujours, quel que soit l'univers.
 */
export function LogoTalaref({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`mot-talaref text-sm hover:opacity-80 transition-opacity ${className}`}
      aria-label="Talaref — accueil"
    >
      Talaref
    </Link>
  );
}
