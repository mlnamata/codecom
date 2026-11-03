import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "obec"."enum_aktuality_rubrika" AS ENUM('zpravy', 'oznameni', 'kultura', 'zpravodaj');
  CREATE TYPE "obec"."enum_aktuality_status" AS ENUM('draft', 'published');
  CREATE TYPE "obec"."enum__aktuality_v_version_rubrika" AS ENUM('zpravy', 'oznameni', 'kultura', 'zpravodaj');
  CREATE TYPE "obec"."enum__aktuality_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "obec"."enum_uredni_deska_status" AS ENUM('draft', 'published');
  CREATE TYPE "obec"."enum__uredni_deska_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "obec"."enum_krizova_hlaseni_kanaly" AS ENUM('web', 'aplikace', 'sms', 'rozhlas');
  CREATE TYPE "obec"."enum_krizova_hlaseni_uroven" AS ENUM('emergency', 'warning', 'info');
  CREATE TYPE "obec"."enum_krizova_hlaseni_status" AS ENUM('draft', 'published');
  CREATE TYPE "obec"."enum__krizova_hlaseni_v_version_kanaly" AS ENUM('web', 'aplikace', 'sms', 'rozhlas');
  CREATE TYPE "obec"."enum__krizova_hlaseni_v_version_uroven" AS ENUM('emergency', 'warning', 'info');
  CREATE TYPE "obec"."enum__krizova_hlaseni_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "obec"."enum_zastupitele_funkce" AS ENUM('starosta', 'mistostarosta', 'radni', 'zastupitel');
  CREATE TYPE "obec"."enum_users_roles" AS ENUM('admin', 'redaktor');
  CREATE TABLE "obec"."aktuality" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulek" varchar,
  	"slug" varchar,
  	"perex" varchar,
  	"obsah" jsonb,
  	"obrazek_id" integer,
  	"rubrika" "obec"."enum_aktuality_rubrika" DEFAULT 'zpravy',
  	"publikovano" timestamp(3) with time zone,
  	"autor_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "obec"."enum_aktuality_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "obec"."_aktuality_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titulek" varchar,
  	"version_slug" varchar,
  	"version_perex" varchar,
  	"version_obsah" jsonb,
  	"version_obrazek_id" integer,
  	"version_rubrika" "obec"."enum__aktuality_v_version_rubrika" DEFAULT 'zpravy',
  	"version_publikovano" timestamp(3) with time zone,
  	"version_autor_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "obec"."enum__aktuality_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "obec"."uredni_deska" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nazev" varchar,
  	"kategorie_id" integer,
  	"cislo_jednaci" varchar,
  	"puvodce" varchar,
  	"vyveseno_od" timestamp(3) with time zone,
  	"vyveseno_do" timestamp(3) with time zone,
  	"soubor_id" integer,
  	"anotace" varchar,
  	"skryt_po_sejmuti" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "obec"."enum_uredni_deska_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "obec"."uredni_deska_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dokumenty_id" integer
  );
  
  CREATE TABLE "obec"."_uredni_deska_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_nazev" varchar,
  	"version_kategorie_id" integer,
  	"version_cislo_jednaci" varchar,
  	"version_puvodce" varchar,
  	"version_vyveseno_od" timestamp(3) with time zone,
  	"version_vyveseno_do" timestamp(3) with time zone,
  	"version_soubor_id" integer,
  	"version_anotace" varchar,
  	"version_skryt_po_sejmuti" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "obec"."enum__uredni_deska_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "obec"."_uredni_deska_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dokumenty_id" integer
  );
  
  CREATE TABLE "obec"."kategorie_desky" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nazev" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"poradi" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "obec"."krizova_hlaseni_kanaly" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "obec"."enum_krizova_hlaseni_kanaly",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "obec"."krizova_hlaseni" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"uroven" "obec"."enum_krizova_hlaseni_uroven" DEFAULT 'info',
  	"titulek" varchar,
  	"text" varchar,
  	"odkaz_text" varchar,
  	"odkaz_url" varchar,
  	"tyka_se" varchar,
  	"plati_od" timestamp(3) with time zone,
  	"plati_do" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "obec"."enum_krizova_hlaseni_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "obec"."_krizova_hlaseni_v_version_kanaly" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "obec"."enum__krizova_hlaseni_v_version_kanaly",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "obec"."_krizova_hlaseni_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_uroven" "obec"."enum__krizova_hlaseni_v_version_uroven" DEFAULT 'info',
  	"version_titulek" varchar,
  	"version_text" varchar,
  	"version_odkaz_text" varchar,
  	"version_odkaz_url" varchar,
  	"version_tyka_se" varchar,
  	"version_plati_od" timestamp(3) with time zone,
  	"version_plati_do" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "obec"."enum__krizova_hlaseni_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "obec"."zastupitele" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titul_pred" varchar,
  	"jmeno" varchar NOT NULL,
  	"titul_za" varchar,
  	"funkce" "obec"."enum_zastupitele_funkce" DEFAULT 'zastupitel' NOT NULL,
  	"vybory" varchar,
  	"zvolen_za" varchar,
  	"email" varchar,
  	"telefon" varchar,
  	"uredni_hodiny" varchar,
  	"foto_id" integer,
  	"obdobi" varchar DEFAULT '2026–2030',
  	"poradi" numeric DEFAULT 100,
  	"aktivni" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "obec"."dokumenty" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"popis" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "obec"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "obec"."users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "obec"."enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "obec"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "obec"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"jmeno" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "obec"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "obec"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "obec"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"aktuality_id" integer,
  	"uredni_deska_id" integer,
  	"kategorie_desky_id" integer,
  	"krizova_hlaseni_id" integer,
  	"zastupitele_id" integer,
  	"dokumenty_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "obec"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "obec"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "obec"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "obec"."aktuality" ADD CONSTRAINT "aktuality_obrazek_id_media_id_fk" FOREIGN KEY ("obrazek_id") REFERENCES "obec"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."aktuality" ADD CONSTRAINT "aktuality_autor_id_users_id_fk" FOREIGN KEY ("autor_id") REFERENCES "obec"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."_aktuality_v" ADD CONSTRAINT "_aktuality_v_parent_id_aktuality_id_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."aktuality"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."_aktuality_v" ADD CONSTRAINT "_aktuality_v_version_obrazek_id_media_id_fk" FOREIGN KEY ("version_obrazek_id") REFERENCES "obec"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."_aktuality_v" ADD CONSTRAINT "_aktuality_v_version_autor_id_users_id_fk" FOREIGN KEY ("version_autor_id") REFERENCES "obec"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."uredni_deska" ADD CONSTRAINT "uredni_deska_kategorie_id_kategorie_desky_id_fk" FOREIGN KEY ("kategorie_id") REFERENCES "obec"."kategorie_desky"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."uredni_deska" ADD CONSTRAINT "uredni_deska_soubor_id_dokumenty_id_fk" FOREIGN KEY ("soubor_id") REFERENCES "obec"."dokumenty"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."uredni_deska_rels" ADD CONSTRAINT "uredni_deska_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."uredni_deska"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."uredni_deska_rels" ADD CONSTRAINT "uredni_deska_rels_dokumenty_fk" FOREIGN KEY ("dokumenty_id") REFERENCES "obec"."dokumenty"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."_uredni_deska_v" ADD CONSTRAINT "_uredni_deska_v_parent_id_uredni_deska_id_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."uredni_deska"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."_uredni_deska_v" ADD CONSTRAINT "_uredni_deska_v_version_kategorie_id_kategorie_desky_id_fk" FOREIGN KEY ("version_kategorie_id") REFERENCES "obec"."kategorie_desky"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."_uredni_deska_v" ADD CONSTRAINT "_uredni_deska_v_version_soubor_id_dokumenty_id_fk" FOREIGN KEY ("version_soubor_id") REFERENCES "obec"."dokumenty"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."_uredni_deska_v_rels" ADD CONSTRAINT "_uredni_deska_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."_uredni_deska_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."_uredni_deska_v_rels" ADD CONSTRAINT "_uredni_deska_v_rels_dokumenty_fk" FOREIGN KEY ("dokumenty_id") REFERENCES "obec"."dokumenty"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."krizova_hlaseni_kanaly" ADD CONSTRAINT "krizova_hlaseni_kanaly_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."krizova_hlaseni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."_krizova_hlaseni_v_version_kanaly" ADD CONSTRAINT "_krizova_hlaseni_v_version_kanaly_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."_krizova_hlaseni_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."_krizova_hlaseni_v" ADD CONSTRAINT "_krizova_hlaseni_v_parent_id_krizova_hlaseni_id_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."krizova_hlaseni"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."zastupitele" ADD CONSTRAINT "zastupitele_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "obec"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obec"."users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "obec"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_aktuality_fk" FOREIGN KEY ("aktuality_id") REFERENCES "obec"."aktuality"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_uredni_deska_fk" FOREIGN KEY ("uredni_deska_id") REFERENCES "obec"."uredni_deska"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kategorie_desky_fk" FOREIGN KEY ("kategorie_desky_id") REFERENCES "obec"."kategorie_desky"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_krizova_hlaseni_fk" FOREIGN KEY ("krizova_hlaseni_id") REFERENCES "obec"."krizova_hlaseni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_zastupitele_fk" FOREIGN KEY ("zastupitele_id") REFERENCES "obec"."zastupitele"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dokumenty_fk" FOREIGN KEY ("dokumenty_id") REFERENCES "obec"."dokumenty"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "obec"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "obec"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "obec"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obec"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "obec"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "aktuality_slug_idx" ON "obec"."aktuality" USING btree ("slug");
  CREATE INDEX "aktuality_obrazek_idx" ON "obec"."aktuality" USING btree ("obrazek_id");
  CREATE INDEX "aktuality_rubrika_idx" ON "obec"."aktuality" USING btree ("rubrika");
  CREATE INDEX "aktuality_publikovano_idx" ON "obec"."aktuality" USING btree ("publikovano");
  CREATE INDEX "aktuality_autor_idx" ON "obec"."aktuality" USING btree ("autor_id");
  CREATE INDEX "aktuality_updated_at_idx" ON "obec"."aktuality" USING btree ("updated_at");
  CREATE INDEX "aktuality_created_at_idx" ON "obec"."aktuality" USING btree ("created_at");
  CREATE INDEX "aktuality__status_idx" ON "obec"."aktuality" USING btree ("_status");
  CREATE INDEX "_aktuality_v_parent_idx" ON "obec"."_aktuality_v" USING btree ("parent_id");
  CREATE INDEX "_aktuality_v_version_version_slug_idx" ON "obec"."_aktuality_v" USING btree ("version_slug");
  CREATE INDEX "_aktuality_v_version_version_obrazek_idx" ON "obec"."_aktuality_v" USING btree ("version_obrazek_id");
  CREATE INDEX "_aktuality_v_version_version_rubrika_idx" ON "obec"."_aktuality_v" USING btree ("version_rubrika");
  CREATE INDEX "_aktuality_v_version_version_publikovano_idx" ON "obec"."_aktuality_v" USING btree ("version_publikovano");
  CREATE INDEX "_aktuality_v_version_version_autor_idx" ON "obec"."_aktuality_v" USING btree ("version_autor_id");
  CREATE INDEX "_aktuality_v_version_version_updated_at_idx" ON "obec"."_aktuality_v" USING btree ("version_updated_at");
  CREATE INDEX "_aktuality_v_version_version_created_at_idx" ON "obec"."_aktuality_v" USING btree ("version_created_at");
  CREATE INDEX "_aktuality_v_version_version__status_idx" ON "obec"."_aktuality_v" USING btree ("version__status");
  CREATE INDEX "_aktuality_v_created_at_idx" ON "obec"."_aktuality_v" USING btree ("created_at");
  CREATE INDEX "_aktuality_v_updated_at_idx" ON "obec"."_aktuality_v" USING btree ("updated_at");
  CREATE INDEX "_aktuality_v_latest_idx" ON "obec"."_aktuality_v" USING btree ("latest");
  CREATE INDEX "uredni_deska_kategorie_idx" ON "obec"."uredni_deska" USING btree ("kategorie_id");
  CREATE INDEX "uredni_deska_cislo_jednaci_idx" ON "obec"."uredni_deska" USING btree ("cislo_jednaci");
  CREATE INDEX "uredni_deska_vyveseno_od_idx" ON "obec"."uredni_deska" USING btree ("vyveseno_od");
  CREATE INDEX "uredni_deska_vyveseno_do_idx" ON "obec"."uredni_deska" USING btree ("vyveseno_do");
  CREATE INDEX "uredni_deska_soubor_idx" ON "obec"."uredni_deska" USING btree ("soubor_id");
  CREATE INDEX "uredni_deska_updated_at_idx" ON "obec"."uredni_deska" USING btree ("updated_at");
  CREATE INDEX "uredni_deska_created_at_idx" ON "obec"."uredni_deska" USING btree ("created_at");
  CREATE INDEX "uredni_deska__status_idx" ON "obec"."uredni_deska" USING btree ("_status");
  CREATE INDEX "vyvesenoOd_vyvesenoDo_idx" ON "obec"."uredni_deska" USING btree ("vyveseno_od","vyveseno_do");
  CREATE INDEX "uredni_deska_rels_order_idx" ON "obec"."uredni_deska_rels" USING btree ("order");
  CREATE INDEX "uredni_deska_rels_parent_idx" ON "obec"."uredni_deska_rels" USING btree ("parent_id");
  CREATE INDEX "uredni_deska_rels_path_idx" ON "obec"."uredni_deska_rels" USING btree ("path");
  CREATE INDEX "uredni_deska_rels_dokumenty_id_idx" ON "obec"."uredni_deska_rels" USING btree ("dokumenty_id");
  CREATE INDEX "_uredni_deska_v_parent_idx" ON "obec"."_uredni_deska_v" USING btree ("parent_id");
  CREATE INDEX "_uredni_deska_v_version_version_kategorie_idx" ON "obec"."_uredni_deska_v" USING btree ("version_kategorie_id");
  CREATE INDEX "_uredni_deska_v_version_version_cislo_jednaci_idx" ON "obec"."_uredni_deska_v" USING btree ("version_cislo_jednaci");
  CREATE INDEX "_uredni_deska_v_version_version_vyveseno_od_idx" ON "obec"."_uredni_deska_v" USING btree ("version_vyveseno_od");
  CREATE INDEX "_uredni_deska_v_version_version_vyveseno_do_idx" ON "obec"."_uredni_deska_v" USING btree ("version_vyveseno_do");
  CREATE INDEX "_uredni_deska_v_version_version_soubor_idx" ON "obec"."_uredni_deska_v" USING btree ("version_soubor_id");
  CREATE INDEX "_uredni_deska_v_version_version_updated_at_idx" ON "obec"."_uredni_deska_v" USING btree ("version_updated_at");
  CREATE INDEX "_uredni_deska_v_version_version_created_at_idx" ON "obec"."_uredni_deska_v" USING btree ("version_created_at");
  CREATE INDEX "_uredni_deska_v_version_version__status_idx" ON "obec"."_uredni_deska_v" USING btree ("version__status");
  CREATE INDEX "_uredni_deska_v_created_at_idx" ON "obec"."_uredni_deska_v" USING btree ("created_at");
  CREATE INDEX "_uredni_deska_v_updated_at_idx" ON "obec"."_uredni_deska_v" USING btree ("updated_at");
  CREATE INDEX "_uredni_deska_v_latest_idx" ON "obec"."_uredni_deska_v" USING btree ("latest");
  CREATE INDEX "version_vyvesenoOd_version_vyvesenoDo_idx" ON "obec"."_uredni_deska_v" USING btree ("version_vyveseno_od","version_vyveseno_do");
  CREATE INDEX "_uredni_deska_v_rels_order_idx" ON "obec"."_uredni_deska_v_rels" USING btree ("order");
  CREATE INDEX "_uredni_deska_v_rels_parent_idx" ON "obec"."_uredni_deska_v_rels" USING btree ("parent_id");
  CREATE INDEX "_uredni_deska_v_rels_path_idx" ON "obec"."_uredni_deska_v_rels" USING btree ("path");
  CREATE INDEX "_uredni_deska_v_rels_dokumenty_id_idx" ON "obec"."_uredni_deska_v_rels" USING btree ("dokumenty_id");
  CREATE UNIQUE INDEX "kategorie_desky_nazev_idx" ON "obec"."kategorie_desky" USING btree ("nazev");
  CREATE UNIQUE INDEX "kategorie_desky_slug_idx" ON "obec"."kategorie_desky" USING btree ("slug");
  CREATE INDEX "kategorie_desky_updated_at_idx" ON "obec"."kategorie_desky" USING btree ("updated_at");
  CREATE INDEX "kategorie_desky_created_at_idx" ON "obec"."kategorie_desky" USING btree ("created_at");
  CREATE INDEX "krizova_hlaseni_kanaly_order_idx" ON "obec"."krizova_hlaseni_kanaly" USING btree ("order");
  CREATE INDEX "krizova_hlaseni_kanaly_parent_idx" ON "obec"."krizova_hlaseni_kanaly" USING btree ("parent_id");
  CREATE INDEX "krizova_hlaseni_plati_od_idx" ON "obec"."krizova_hlaseni" USING btree ("plati_od");
  CREATE INDEX "krizova_hlaseni_plati_do_idx" ON "obec"."krizova_hlaseni" USING btree ("plati_do");
  CREATE INDEX "krizova_hlaseni_updated_at_idx" ON "obec"."krizova_hlaseni" USING btree ("updated_at");
  CREATE INDEX "krizova_hlaseni_created_at_idx" ON "obec"."krizova_hlaseni" USING btree ("created_at");
  CREATE INDEX "krizova_hlaseni__status_idx" ON "obec"."krizova_hlaseni" USING btree ("_status");
  CREATE INDEX "platiOd_platiDo_idx" ON "obec"."krizova_hlaseni" USING btree ("plati_od","plati_do");
  CREATE INDEX "_krizova_hlaseni_v_version_kanaly_order_idx" ON "obec"."_krizova_hlaseni_v_version_kanaly" USING btree ("order");
  CREATE INDEX "_krizova_hlaseni_v_version_kanaly_parent_idx" ON "obec"."_krizova_hlaseni_v_version_kanaly" USING btree ("parent_id");
  CREATE INDEX "_krizova_hlaseni_v_parent_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("parent_id");
  CREATE INDEX "_krizova_hlaseni_v_version_version_plati_od_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("version_plati_od");
  CREATE INDEX "_krizova_hlaseni_v_version_version_plati_do_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("version_plati_do");
  CREATE INDEX "_krizova_hlaseni_v_version_version_updated_at_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("version_updated_at");
  CREATE INDEX "_krizova_hlaseni_v_version_version_created_at_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("version_created_at");
  CREATE INDEX "_krizova_hlaseni_v_version_version__status_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("version__status");
  CREATE INDEX "_krizova_hlaseni_v_created_at_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("created_at");
  CREATE INDEX "_krizova_hlaseni_v_updated_at_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("updated_at");
  CREATE INDEX "_krizova_hlaseni_v_latest_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("latest");
  CREATE INDEX "version_platiOd_version_platiDo_idx" ON "obec"."_krizova_hlaseni_v" USING btree ("version_plati_od","version_plati_do");
  CREATE INDEX "zastupitele_foto_idx" ON "obec"."zastupitele" USING btree ("foto_id");
  CREATE INDEX "zastupitele_aktivni_idx" ON "obec"."zastupitele" USING btree ("aktivni");
  CREATE INDEX "zastupitele_updated_at_idx" ON "obec"."zastupitele" USING btree ("updated_at");
  CREATE INDEX "zastupitele_created_at_idx" ON "obec"."zastupitele" USING btree ("created_at");
  CREATE INDEX "dokumenty_updated_at_idx" ON "obec"."dokumenty" USING btree ("updated_at");
  CREATE INDEX "dokumenty_created_at_idx" ON "obec"."dokumenty" USING btree ("created_at");
  CREATE UNIQUE INDEX "dokumenty_filename_idx" ON "obec"."dokumenty" USING btree ("filename");
  CREATE INDEX "media_updated_at_idx" ON "obec"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "obec"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "obec"."media" USING btree ("filename");
  CREATE INDEX "users_roles_order_idx" ON "obec"."users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "obec"."users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "obec"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "obec"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "obec"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "obec"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "obec"."users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "obec"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "obec"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "obec"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "obec"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "obec"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "obec"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "obec"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_aktuality_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("aktuality_id");
  CREATE INDEX "payload_locked_documents_rels_uredni_deska_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("uredni_deska_id");
  CREATE INDEX "payload_locked_documents_rels_kategorie_desky_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("kategorie_desky_id");
  CREATE INDEX "payload_locked_documents_rels_krizova_hlaseni_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("krizova_hlaseni_id");
  CREATE INDEX "payload_locked_documents_rels_zastupitele_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("zastupitele_id");
  CREATE INDEX "payload_locked_documents_rels_dokumenty_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("dokumenty_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "obec"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "obec"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "obec"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "obec"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "obec"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "obec"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "obec"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "obec"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "obec"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "obec"."payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "obec"."aktuality" CASCADE;
  DROP TABLE "obec"."_aktuality_v" CASCADE;
  DROP TABLE "obec"."uredni_deska" CASCADE;
  DROP TABLE "obec"."uredni_deska_rels" CASCADE;
  DROP TABLE "obec"."_uredni_deska_v" CASCADE;
  DROP TABLE "obec"."_uredni_deska_v_rels" CASCADE;
  DROP TABLE "obec"."kategorie_desky" CASCADE;
  DROP TABLE "obec"."krizova_hlaseni_kanaly" CASCADE;
  DROP TABLE "obec"."krizova_hlaseni" CASCADE;
  DROP TABLE "obec"."_krizova_hlaseni_v_version_kanaly" CASCADE;
  DROP TABLE "obec"."_krizova_hlaseni_v" CASCADE;
  DROP TABLE "obec"."zastupitele" CASCADE;
  DROP TABLE "obec"."dokumenty" CASCADE;
  DROP TABLE "obec"."media" CASCADE;
  DROP TABLE "obec"."users_roles" CASCADE;
  DROP TABLE "obec"."users_sessions" CASCADE;
  DROP TABLE "obec"."users" CASCADE;
  DROP TABLE "obec"."payload_kv" CASCADE;
  DROP TABLE "obec"."payload_locked_documents" CASCADE;
  DROP TABLE "obec"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "obec"."payload_preferences" CASCADE;
  DROP TABLE "obec"."payload_preferences_rels" CASCADE;
  DROP TABLE "obec"."payload_migrations" CASCADE;
  DROP TYPE "obec"."enum_aktuality_rubrika";
  DROP TYPE "obec"."enum_aktuality_status";
  DROP TYPE "obec"."enum__aktuality_v_version_rubrika";
  DROP TYPE "obec"."enum__aktuality_v_version_status";
  DROP TYPE "obec"."enum_uredni_deska_status";
  DROP TYPE "obec"."enum__uredni_deska_v_version_status";
  DROP TYPE "obec"."enum_krizova_hlaseni_kanaly";
  DROP TYPE "obec"."enum_krizova_hlaseni_uroven";
  DROP TYPE "obec"."enum_krizova_hlaseni_status";
  DROP TYPE "obec"."enum__krizova_hlaseni_v_version_kanaly";
  DROP TYPE "obec"."enum__krizova_hlaseni_v_version_uroven";
  DROP TYPE "obec"."enum__krizova_hlaseni_v_version_status";
  DROP TYPE "obec"."enum_zastupitele_funkce";
  DROP TYPE "obec"."enum_users_roles";`)
}
