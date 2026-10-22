-- Migration: 20261022120000_seed_primary_admin_portoduque.sql
-- Description: Configure l'administrateur principal (portoduque@outlook.com) et nettoie les comptes de test.

-- 1. Nettoyer les comptes de démonstration ou tests préexistants
delete from public.access_grants
where lower(email) in (
  'etudiant@frenchgrammarquest.app',
  'camille.bernard@example.com',
  'lucas.moreau@example.com',
  'demo@example.com'
);

-- 2. Enregistrer l'administrateur principal avec rôle admin actif
insert into public.access_grants (
  email,
  role,
  status,
  full_name,
  initial_level,
  notes,
  updated_at
) values (
  'portoduque@outlook.com',
  'admin',
  'active',
  'Porto Duque',
  'B2',
  'Administrateur principal et gestionnaire pédagogique de la plateforme',
  now()
)
on conflict (email) do update set
  role = 'admin',
  status = 'active',
  full_name = 'Porto Duque',
  updated_at = now();
