"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErreur(
        error.message === "Invalid login credentials"
          ? "Identifiants invalides. Vérifiez votre adresse e-mail et mot de passe."
          : error.message
      );
      setChargement(false);
    } else {
      router.push("/compte");
      router.refresh();
    }
  };

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-lg border border-ligne bg-surface p-6 sm:p-8">
        <header className="mb-6 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-arcade">
            Espace Lecteur
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-blanc">
            Connexion
          </h1>
          <p className="mt-1 text-sm text-gris">
            Accédez à votre compte Talaref Média
          </p>
        </header>

        {erreur && (
          <div className="mb-6 rounded-md border border-encre/40 bg-encre/10 p-3.5 text-xs text-encre">
            {erreur}
          </div>
        )}

        <form onSubmit={handleConnexion} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-gris"
            >
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@domaine.com"
              className="mt-1.5 w-full rounded-md border border-ligne bg-noir p-3 text-sm text-blanc transition-colors focus:border-arcade focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-gris"
              >
                Mot de passe
              </label>
              <Link
                href="/mot-de-passe-oublie"
                className="text-xs text-arcade hover:underline"
              >
                Oublié ?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-md border border-ligne bg-noir p-3 text-sm text-blanc transition-colors focus:border-arcade focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={chargement}
            className="w-full rounded-md bg-arcade px-4 py-3 text-sm font-bold text-noir transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {chargement ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <footer className="mt-6 border-t border-ligne pt-4 text-center text-xs text-gris">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-bold text-arcade hover:underline">
            S'inscrire
          </Link>
        </footer>
      </div>
    </main>
  );
}
