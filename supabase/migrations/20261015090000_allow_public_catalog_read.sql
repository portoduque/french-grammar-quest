-- Migration: 20261015090000_allow_public_catalog_read.sql
-- Description: Allow anon and authenticated users to read published chapters, topics, and exercise sets (RF-063)
-- Questions remain restricted to authenticated users (RF-065).

GRANT SELECT ON public.chapters TO anon, authenticated;
GRANT SELECT ON public.topics TO anon, authenticated;
GRANT SELECT ON public.exercise_sets TO anon, authenticated;

DROP POLICY IF EXISTS chapters_select ON public.chapters;
CREATE POLICY chapters_select ON public.chapters
  FOR SELECT TO anon, authenticated
  USING (
    editorial_status = 'published'
    OR (auth.role() = 'authenticated' AND is_admin())
  );

DROP POLICY IF EXISTS topics_select ON public.topics;
CREATE POLICY topics_select ON public.topics
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.chapters c
      WHERE c.id = topics.chapter_id
        AND (c.editorial_status = 'published' OR (auth.role() = 'authenticated' AND is_admin()))
    )
  );

DROP POLICY IF EXISTS exercise_sets_select ON public.exercise_sets;
CREATE POLICY exercise_sets_select ON public.exercise_sets
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.chapters c
      WHERE c.id = exercise_sets.chapter_id
        AND (c.editorial_status = 'published' OR (auth.role() = 'authenticated' AND is_admin()))
    )
  );
