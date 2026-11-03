import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Rules the database enforces on top of the Payload schema.
 *
 * Payload keeps required fields nullable because drafts may be incomplete, so the
 * checks below apply to published rows only. They are a safety net under the admin
 * validation: a script, an import or a bug cannot publish a document without a file,
 * a category or a posting date, and nobody can erase a document that already hung
 * on the úřední deska.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Úřední deska ---------------------------------------------------------------
  ALTER TABLE "obec"."uredni_deska"
    ADD CONSTRAINT "uredni_deska_obdobi_ck"
      CHECK ("vyveseno_do" IS NULL OR "vyveseno_od" IS NULL OR "vyveseno_do" >= "vyveseno_od"),
    -- Day-only values are stored as 12:00 UTC of the calendar day (see src/lib/datum.ts).
    ADD CONSTRAINT "uredni_deska_den_ck"
      CHECK (("vyveseno_od" IS NULL OR ("vyveseno_od" AT TIME ZONE 'UTC')::time = '12:00')
         AND ("vyveseno_do" IS NULL OR ("vyveseno_do" AT TIME ZONE 'UTC')::time = '12:00')),
    ADD CONSTRAINT "uredni_deska_zverejneny_ck"
      CHECK ("_status" IS DISTINCT FROM 'published' OR (
        "nazev" IS NOT NULL AND btrim("nazev") <> ''
        AND "kategorie_id" IS NOT NULL
        AND "puvodce" IS NOT NULL
        AND "vyveseno_od" IS NOT NULL
        AND "soubor_id" IS NOT NULL)),
    ADD CONSTRAINT "uredni_deska_skryt_ck" CHECK ("skryt_po_sejmuti" IS NOT NULL);

  ALTER TABLE "obec"."uredni_deska" ALTER COLUMN "skryt_po_sejmuti" SET NOT NULL;

  -- The public list reads published rows by posting window.
  CREATE INDEX "uredni_deska_verejne_idx" ON "obec"."uredni_deska"
    USING btree ("vyveseno_od" DESC, "vyveseno_do") WHERE "_status" = 'published';

  -- A document that has been published and reached its first day must never disappear.
  CREATE FUNCTION "obec"."uredni_deska_nemazat"() RETURNS trigger
    LANGUAGE plpgsql SET search_path = '' AS $fn$
  BEGIN
    IF OLD."_status" = 'published'
       AND (OLD."vyveseno_od" AT TIME ZONE 'Europe/Prague')::date <= (now() AT TIME ZONE 'Europe/Prague')::date THEN
      RAISE EXCEPTION 'Dokument "%" už visel na úřední desce a nelze ho smazat. Ukončete vyvěšení a případně ho skryjte v archivu.', OLD."nazev"
        USING ERRCODE = 'restrict_violation';
    END IF;
    RETURN OLD;
  END
  $fn$;

  CREATE TRIGGER "uredni_deska_nemazat_tg" BEFORE DELETE ON "obec"."uredni_deska"
    FOR EACH ROW EXECUTE FUNCTION "obec"."uredni_deska_nemazat"();

  -- Krizová hlášení ------------------------------------------------------------
  ALTER TABLE "obec"."krizova_hlaseni"
    ADD CONSTRAINT "krizova_hlaseni_obdobi_ck"
      CHECK ("plati_do" IS NULL OR "plati_od" IS NULL OR "plati_do" > "plati_od"),
    ADD CONSTRAINT "krizova_hlaseni_zverejnene_ck"
      CHECK ("_status" IS DISTINCT FROM 'published' OR (
        "uroven" IS NOT NULL
        AND "titulek" IS NOT NULL AND char_length("titulek") BETWEEN 1 AND 90
        AND "text" IS NOT NULL AND char_length("text") BETWEEN 1 AND 300
        AND "plati_od" IS NOT NULL)),
    ADD CONSTRAINT "krizova_hlaseni_odkaz_ck"
      CHECK ("odkaz_url" IS NULL OR "odkaz_url" ~ '^(https?://|/[^/])');

  CREATE INDEX "krizova_hlaseni_aktivni_idx" ON "obec"."krizova_hlaseni"
    USING btree ("plati_od" DESC, "plati_do") WHERE "_status" = 'published';

  -- Zastupitelé ----------------------------------------------------------------
  ALTER TABLE "obec"."zastupitele"
    ADD CONSTRAINT "zastupitele_jmeno_ck" CHECK ("jmeno" IS NOT NULL AND btrim("jmeno") <> ''),
    ADD CONSTRAINT "zastupitele_telefon_ck" CHECK ("telefon" IS NULL OR "telefon" ~ '^\\+?[0-9 ]{9,17}$');

  -- Aktuality ------------------------------------------------------------------
  ALTER TABLE "obec"."aktuality"
    ADD CONSTRAINT "aktuality_zverejnene_ck"
      CHECK ("_status" IS DISTINCT FROM 'published' OR (
        "titulek" IS NOT NULL AND "perex" IS NOT NULL AND "slug" IS NOT NULL AND "publikovano" IS NOT NULL));

  CREATE INDEX "aktuality_verejne_idx" ON "obec"."aktuality"
    USING btree ("publikovano" DESC) WHERE "_status" = 'published';

  -- Supabase: keep the schema private ------------------------------------------
  -- Payload connects as the schema owner. The Data API roles get nothing, and RLS
  -- without policies blocks them even if the schema is exposed by mistake later.
  DO $do$
  DECLARE t record;
  BEGIN
    FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'obec' LOOP
      EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', 'obec', t.tablename);
    END LOOP;
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
      EXECUTE 'REVOKE ALL ON SCHEMA obec FROM anon, authenticated';
      EXECUTE 'REVOKE ALL ON ALL TABLES IN SCHEMA obec FROM anon, authenticated';
      EXECUTE 'ALTER DEFAULT PRIVILEGES IN SCHEMA obec REVOKE ALL ON TABLES FROM anon, authenticated';
    END IF;
  END
  $do$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TRIGGER IF EXISTS "uredni_deska_nemazat_tg" ON "obec"."uredni_deska";
  DROP FUNCTION IF EXISTS "obec"."uredni_deska_nemazat"();
  DROP INDEX IF EXISTS "obec"."uredni_deska_verejne_idx";
  DROP INDEX IF EXISTS "obec"."krizova_hlaseni_aktivni_idx";
  DROP INDEX IF EXISTS "obec"."aktuality_verejne_idx";
  ALTER TABLE "obec"."uredni_deska" ALTER COLUMN "skryt_po_sejmuti" DROP NOT NULL;
  ALTER TABLE "obec"."uredni_deska"
    DROP CONSTRAINT IF EXISTS "uredni_deska_obdobi_ck",
    DROP CONSTRAINT IF EXISTS "uredni_deska_den_ck",
    DROP CONSTRAINT IF EXISTS "uredni_deska_zverejneny_ck",
    DROP CONSTRAINT IF EXISTS "uredni_deska_skryt_ck";
  ALTER TABLE "obec"."krizova_hlaseni"
    DROP CONSTRAINT IF EXISTS "krizova_hlaseni_obdobi_ck",
    DROP CONSTRAINT IF EXISTS "krizova_hlaseni_zverejnene_ck",
    DROP CONSTRAINT IF EXISTS "krizova_hlaseni_odkaz_ck";
  ALTER TABLE "obec"."zastupitele"
    DROP CONSTRAINT IF EXISTS "zastupitele_jmeno_ck",
    DROP CONSTRAINT IF EXISTS "zastupitele_telefon_ck";
  ALTER TABLE "obec"."aktuality" DROP CONSTRAINT IF EXISTS "aktuality_zverejnene_ck";
  `)
}
