-- Migration: 20261022130000_create_admin_register_student_account.sql
-- Description: Criação da procedure administrativa para registro oficial de alunos em auth.users e concessão de privilégios em tabelas de estudantes.

-- 1. Conceder privilégios essenciais de tabelas da aplicação ao papel autenticado
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.question_attempts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_achievements TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_mistakes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.access_grants TO authenticated;

-- 2. Garantir colunas essenciais
ALTER TABLE public.access_grants
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS initial_level text DEFAULT 'A1' CHECK (initial_level IN ('A1', 'A2', 'B1', 'B2')),
  ADD COLUMN IF NOT EXISTS notes text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_temporary_password boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS first_login_completed boolean NOT NULL DEFAULT false;

-- 3. Procedure administrativa para criar conta de aluno completa (access_grants + auth.users + auth.identities + profiles)
CREATE OR REPLACE FUNCTION public.admin_register_student_account(
  p_email text,
  p_password text,
  p_full_name text,
  p_initial_level text DEFAULT 'A1',
  p_notes text DEFAULT null
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions
AS $$
DECLARE
  v_caller uuid := auth.uid();
  v_clean_email text := lower(trim(p_email));
  v_clean_name text := trim(p_full_name);
  v_existing_user_id uuid;
  v_uid uuid;
  v_grant public.access_grants%rowtype;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Accès refusé : privilèges administrateur requis';
  END IF;

  IF v_clean_email = '' OR v_clean_email NOT LIKE '%@%.%' THEN
    RAISE EXCEPTION 'Adresse e-mail invalide';
  END IF;

  IF length(p_password) < 6 THEN
    RAISE EXCEPTION 'Le mot de passe doit comporter au moins 6 caractères';
  END IF;

  -- 1. Inserir ou atualizar na allowlist (access_grants)
  INSERT INTO public.access_grants (
    email,
    role,
    status,
    full_name,
    initial_level,
    notes,
    invited_by,
    updated_at
  ) VALUES (
    v_clean_email,
    'student',
    'active',
    v_clean_name,
    p_initial_level,
    p_notes,
    v_caller,
    now()
  )
  ON CONFLICT (email) DO UPDATE SET
    status = 'active',
    full_name = excluded.full_name,
    initial_level = excluded.initial_level,
    notes = excluded.notes,
    updated_at = now()
  RETURNING * INTO v_grant;

  -- 2. Verificar se já existe em auth.users
  SELECT id INTO v_existing_user_id
  FROM auth.users
  WHERE lower(email) = v_clean_email;

  IF v_existing_user_id IS NOT NULL THEN
    UPDATE auth.users
    SET
      encrypted_password = crypt(p_password, gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      confirmation_token = '',
      recovery_token = '',
      email_change_token_new = '',
      email_change = '',
      email_change_token_current = '',
      phone_change = '',
      phone_change_token = '',
      reauthentication_token = '',
      raw_user_meta_data = jsonb_build_object('full_name', v_clean_name),
      updated_at = now()
    WHERE id = v_existing_user_id;

    UPDATE public.profiles
    SET
      display_name = v_clean_name,
      is_temporary_password = true,
      updated_at = now()
    WHERE id = v_existing_user_id;

    v_uid := v_existing_user_id;
  ELSE
    v_uid := gen_random_uuid();

    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change,
      email_change_token_current,
      phone_change,
      phone_change_token,
      reauthentication_token,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      v_uid,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      v_clean_email,
      crypt(p_password, gen_salt('bf')),
      now(),
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('full_name', v_clean_name),
      now(),
      now()
    );

    INSERT INTO auth.identities (
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      v_uid,
      jsonb_build_object('sub', v_uid::text, 'email', v_clean_email, 'email_verified', true, 'phone_verified', false),
      'email',
      v_uid::text,
      now(),
      now(),
      now()
    );

    INSERT INTO public.profiles (
      id,
      email,
      display_name,
      role,
      is_temporary_password,
      first_login_completed
    ) VALUES (
      v_uid,
      v_clean_email,
      v_clean_name,
      'student',
      true,
      false
    )
    ON CONFLICT (id) DO UPDATE SET
      display_name = excluded.display_name,
      is_temporary_password = true,
      updated_at = now();
  END IF;

  INSERT INTO public.audit_log (
    actor_id,
    event,
    target_type,
    target_id,
    metadata
  ) VALUES (
    v_caller,
    'student_registered',
    'access_grants',
    v_grant.id::text,
    jsonb_build_object(
      'email', v_clean_email,
      'full_name', v_clean_name,
      'initial_level', p_initial_level,
      'user_id', v_uid::text
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_uid,
    'email', v_clean_email,
    'student', row_to_json(v_grant)
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_register_student_account(text, text, text, text, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.admin_register_student_account(text, text, text, text, text) TO authenticated;
