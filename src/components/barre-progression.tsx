"use client";

import { useEffect, useState } from "react";

/**
 * Barre de progression de lecture — l'un des rares endroits d'une page
 * d'article où la couleur d'accent est autorisée (dosage 80/15/5).
 */
export function BarreProgression() {
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    let frame = 0;

    function mesurer() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgression(total > 0 ? (h.scrollTop / total) * 100 : 0);
      frame = 0;
    }

    function auDefilement() {
      if (frame) return;
      frame = requestAnimationFrame(mesurer);
    }

    mesurer();
    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement);
    return () => {
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${progression}%` }}
      />
    </div>
  );
}
