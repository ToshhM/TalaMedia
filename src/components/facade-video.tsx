"use client";

import { useState } from "react";

/**
 * Façade YouTube.
 *
 * Une iframe YouTube coûte plusieurs centaines de kilo-octets au
 * chargement de la page. La façade affiche la vignette et ne charge le
 * lecteur qu'au clic — c'est la différence entre une page d'article qui
 * s'ouvre vite et une qui traîne.
 */
export function FacadeVideo({
  youtubeId,
  titre,
}: {
  youtubeId: string;
  titre: string;
}) {
  const [actif, setActif] = useState(false);

  if (actif) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-noir">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={titre}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActif(true)}
      className="group relative aspect-video w-full overflow-hidden bg-surface-2"
      aria-label={`Lire la vidéo : ${titre}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-noir/30 transition-colors group-hover:bg-noir/10" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent">
        <svg
          viewBox="0 0 24 24"
          className="ml-1 h-7 w-7 fill-noir"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
