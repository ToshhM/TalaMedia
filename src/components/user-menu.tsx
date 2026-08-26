"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (user) {
    const prenom =
      user.user_metadata?.full_name?.split(" ")[0] ||
      user.email?.split("@")[0] ||
      "Compte";

    return (
      <Link
        href="/compte"
        className="rounded-sm border border-arcade/40 bg-arcade/10 px-2.5 py-1.5 text-xs font-bold text-arcade transition-colors hover:bg-arcade hover:text-noir"
      >
        {prenom}
      </Link>
    );
  }

  return (
    <Link
      href="/connexion"
      className="rounded-sm border border-ligne bg-surface px-2.5 py-1.5 text-xs font-semibold text-gris transition-colors hover:border-blanc hover:text-blanc"
    >
      Connexion
    </Link>
  );
}
