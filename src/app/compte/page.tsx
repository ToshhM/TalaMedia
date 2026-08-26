"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function ComptePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/connexion");
      } else {
        setUser(user);
      }
      setChargement(false);
    }

    getUser();
  }, [router]);

  const handleDeconnexion = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (chargement) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-12">
        <p className="font-mono text-sm text-gris">Chargement de votre compte...</p>
      </main>
    );
  }

  if (!user) return null;

  const nomComplet = user.user_metadata?.full_name || "Lecteur Talaref";

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="mb-8 border-b border-ligne pb-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-arcade">
          Espace Membre
        </span>
        <h1 className="mt-2 text-3xl font-black text-blanc">{nomComplet}</h1>
        <p className="mt-1 font-mono text-xs text-gris">{user.email}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Box Informations de compte */}
        <section className="rounded-lg border border-ligne bg-surface p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blanc">
            Informations de compte
          </h2>
          <dl className="mt-4 divide-y divide-ligne text-xs">
            <div className="py-2.5 flex justify-between">
              <dt className="text-gris">ID Utilisateur</dt>
              <dd className="font-mono text-blanc">{user.id.slice(0, 8)}...</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-gris">E-mail</dt>
              <dd className="text-blanc">{user.email}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-gris">Statut e-mail</dt>
              <dd className="text-arcade font-semibold">
                {user.email_confirmed_at ? "Vérifié" : "En attente de vérification"}
              </dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-gris">Dernière connexion</dt>
              <dd className="text-blanc">
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </dd>
            </div>
          </dl>
        </section>

        {/* Box Actions rapides */}
        <section className="rounded-lg border border-ligne bg-surface p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blanc">
              Navigation Rapide
            </h2>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  href="/videos"
                  className="block rounded bg-noir p-3 text-gris transition-colors hover:text-blanc hover:border-arcade border border-transparent"
                >
                  📺 Voir les vidéos récentes
                </Link>
              </li>
              <li>
                <Link
                  href="/recherche"
                  className="block rounded bg-noir p-3 text-gris transition-colors hover:text-blanc hover:border-arcade border border-transparent"
                >
                  🔍 Explorer les univers et rubriques
                </Link>
              </li>
            </ul>
          </div>

          <button
            onClick={handleDeconnexion}
            className="mt-6 w-full rounded-md border border-encre/40 bg-encre/10 px-4 py-2.5 text-xs font-bold text-encre transition-colors hover:bg-encre hover:text-noir"
          >
            Se déconnecter
          </button>
        </section>
      </div>
    </main>
  );
}
