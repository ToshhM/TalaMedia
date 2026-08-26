-- Schema PostgreSQL / Supabase pour Talaref Média V1
-- Conforme à l'Architecture V1 et à la Charte graphique V1

-- Table des articles
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL CHECK (char_length(titre) >= 30 AND char_length(titre) <= 65),
  chapo TEXT NOT NULL CHECK (char_length(chapo) >= 200 AND char_length(chapo) <= 320),
  image_de_une JSONB NOT NULL,
  univers TEXT NOT NULL CHECK (univers IN ('arcade', 'encre', 'pop', 'agora', 'bpm', 'objectif')),
  rubrique TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  auteurs JSONB NOT NULL DEFAULT '[]'::jsonb,
  video JSONB,
  corps JSONB NOT NULL DEFAULT '[]'::jsonb,
  publie_le TIMESTAMPTZ NOT NULL DEFAULT now(),
  mis_a_jour_le TIMESTAMPTZ,
  temps_de_lecture INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des personnes (auteurs, relecteurs, invités)
CREATE TABLE IF NOT EXISTS public.personnes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  bio TEXT,
  photo JSONB,
  liens JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour accélérer les requêtes d'articles par univers, rubrique et date
CREATE INDEX IF NOT EXISTS idx_articles_univers ON public.articles(univers);
CREATE INDEX IF NOT EXISTS idx_articles_rubrique ON public.articles(rubrique);
CREATE INDEX IF NOT EXISTS idx_articles_publie_le ON public.articles(publie_le DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);

-- Polices de sécurité Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personnes ENABLE ROW LEVEL SECURITY;

-- Accès en lecture publique pour le site
CREATE POLICY "Lecture publique des articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Lecture publique des personnes" ON public.personnes FOR SELECT USING (true);
