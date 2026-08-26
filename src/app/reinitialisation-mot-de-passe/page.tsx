"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ReinitialisationMotDePassePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [chargement, setChargement] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setErreur(error.message);
      setChargement(false);
    } else {
      setSucces(true);
      setChargement(false);
      setTimeout(() => {
        router.push("/compte");
      }, 2000);
    }
  };

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-lg border border-ligne bg-surface p-6 sm:p-8">
        <header className="mb-6 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-arcade">
            Sécurité
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-blanc">
            Nouveau mot de passe
          </h1>
          <p className="mt-1 text-sm text-gris">
            Saisissez votre nouveau mot de passe
          </p>
        </header>

        {succes ? (
          <div className="rounded-md border border-arcade/40 bg-arcade/10 p-5 text-center text-sm text-blanc">
            <h2 className="font-bold text-arcade">Mot de passe mis à jour !</h2>
            <p className="mt-2 text-xs text-gris">
              Redirection automatique vers votre espace compte...
            </p>
          </div>
        ) : (
          <>
            {erreur && (
              <div className="mb-6 rounded-md border border-encre/40 bg-encre/10 p-3.5 text-xs text-encre">
                {erreur}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-gris"
                >
                  Nouveau mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
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
                {chargement ? "Mise à jour..." : "Enregistrer le mot de passe"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
