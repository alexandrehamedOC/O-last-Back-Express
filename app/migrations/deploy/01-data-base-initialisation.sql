-- Deploy olast:create to pg

BEGIN;

DROP TABLE IF EXISTS "rate", "profil", "post", "game", "user";

-- XXX Add DDLs here.

CREATE TABLE "user" (
"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"firstname" TEXT NOT NULL UNIQUE,
"lastname" TEXT NOT NULL UNIQUE,
"email" TEXT NOT NULL UNIQUE,
"password" TEXT NOT NULL,
"birth_date" timestamptz NOT NULL,
"discord_username" text NOT NULL,
"city" TEXT NOT NULL,
"created_at" timestamptz NOT NULL DEFAULT now(),
"updated_at" timestamptz
);



CREATE TABLE "game" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "pegi" int NOT NULL,
    "category" int NOT NULL,
    "description" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "post" (
"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"title" TEXT NOT NULL,
"platform" TEXT NOT NULL,
"description" TEXT NOT NULL,
"schedule_start" timestamptz,
"schedule_end" timestamptz,
"status" boolean,
"user_id" int NOT NULL REFERENCES "user"("id"),
"game_id" int NOT NULL REFERENCES "game"("id"),
"created_at" timestamptz NOT NULL DEFAULT now(),
"updated_at" timestamptz
);

CREATE TABLE "profil" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "rank" text NOT NULL,
    "level" int NOT NULL,
    "game_id" int NOT NULL REFERENCES "game" ("id"),
    "user_id" int NOT NULL REFERENCES "user" ("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "rate" (
"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"note" int NOT NULL CHECK (note <= 5),
"description" TEXT NOT NULL,
"sender_user_id" int NOT NULL REFERENCES "user" ("id"),
"receiver_profil_id" int NOT NULL REFERENCES "profil" ("id"),
"created_at" timestamptz NOT NULL DEFAULT now(),
"updated_at" timestamptz
);

COMMIT;
