import Link from "next/link";
import { UNIVERS } from "@/lib/univers";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="etiquette">Erreur 404</p>
      <h1 className="titre-article mt-4 text-4xl">Cette page n&apos;existe pas</h1>
      <p className="mt-4 text-gris">
        L&apos;adresse est peut-être erronée, ou la page a été déplacée. Les six
        univers restent accessibles ci-dessous.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {UNIVERS.map((u) => (
          <li key={u.slug} data-u={u.slug}>
            <Link
              href={`/${u.slug}`}
              className="block border border-ligne px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {u.nom}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
