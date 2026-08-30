"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [chargement, setChargement] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const handleReinitialisation = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    if (!supabase) {
      setErreur("Configuration Supabase manquante. Veuillez vérifier les variables d'environnement.");
      setChargement(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reinitialisation-mot-de-passe`,
    });

    if (error) {
      setErreur(error.message);
      setChargement(false);
    } else {
      setSucces(true);
      setChargement(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-lg border border-ligne bg-surface p-6 sm:p-8">
        <header className="mb-6 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-objectif">
            Récupération
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-blanc">
            Mot de passe oublié
          </h1>
          <p className="mt-1 text-sm text-gris">
            Saisissez votre e-mail pour réinitialiser votre mot de passe
          </p>
        </header>

        {succes ? (
          <div className="rounded-md border border-objectif/40 bg-objectif/10 p-5 text-center text-sm text-blanc">
            <h2 className="font-bold text-objectif">Lien envoyé !</h2>
            <p className="mt-2 text-xs text-gris">
              Si un compte est associé à <strong className="text-blanc">{email}</strong>,
              un lien de réinitialisation vous a été envoyé par e-mail.
            </p>
            <div className="mt-5">
              <Link
                href="/connexion"
                className="inline-block rounded bg-objectif px-4 py-2 text-xs font-bold text-noir hover:opacity-90"
              >
                Retour à la connexion
              </Link>
            </div>
          </div>
        ) : (
          <>
            {erreur && (
              <div className="mb-6 rounded-md border border-encre/40 bg-encre/10 p-3.5 text-xs text-encre">
                {erreur}
              </div>
            )}

            <form onSubmit={handleReinitialisation} className="space-y-4">
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
                  className="mt-1.5 w-full rounded-md border border-ligne bg-noir p-3 text-sm text-blanc transition-colors focus:border-objectif focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={chargement}
                className="w-full rounded-md bg-objectif px-4 py-3 text-sm font-bold text-noir transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {chargement ? "Envoi du lien..." : "Envoyer le lien"}
              </button>
            </form>

            <footer className="mt-6 border-t border-ligne pt-4 text-center text-xs text-gris">
              <Link href="/connexion" className="font-bold text-gris hover:text-blanc">
                ← Retour à la connexion
              </Link>
            </footer>
          </>
        )}
      </div>
    </main>
  );
}
