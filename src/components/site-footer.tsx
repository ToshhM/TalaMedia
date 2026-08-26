import Link from "next/link";
import { UNIVERS } from "@/lib/univers";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ligne bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mot-talaref text-sm">Talaref</p>
            <p className="mt-3 max-w-xs text-sm text-gris">{SITE.baseline}</p>
          </div>

          <nav aria-label="Univers">
            <p className="etiquette">Univers</p>
            <ul className="mt-3 space-y-1.5">
              {UNIVERS.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/${u.slug}`}
                    data-u={u.slug}
                    className="text-sm text-gris transition-colors hover:text-accent"
                  >
                    {u.nom}
                    <span className="text-gris"> · {u.territoire}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Le média">
            <p className="etiquette">Le média</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/a-propos" className="text-gris hover:text-blanc">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/auteurs" className="text-gris hover:text-blanc">
                  Les signatures
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gris hover:text-blanc">
                  Les vidéos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gris hover:text-blanc">
                  Contact
                </Link>
              </li>
              <li>
                <a href="/rss.xml" className="text-gris hover:text-blanc">
                  Flux RSS
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Informations légales">
            <p className="etiquette">Informations</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-gris hover:text-blanc"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-gris hover:text-blanc"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-gris">
              Directeur de la publication :<br />
              {SITE.directeurDePublication}
            </p>
          </nav>
        </div>

        <p className="etiquette mt-10 border-t border-ligne pt-6">
          © {new Date().getFullYear()} {SITE.nomComplet}
        </p>
      </div>
    </footer>
  );
}
