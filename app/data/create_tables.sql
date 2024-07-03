BEGIN;

DROP TABLE IF EXISTS "rate", "profil", "post", "game", "users";


CREATE TABLE "users" (
"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"firstname" TEXT NOT NULL ,
"lastname" TEXT NOT NULL ,
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
"user_id" int NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
"game_id" int NOT NULL REFERENCES "game"("id") ON DELETE CASCADE,
"created_at" timestamptz NOT NULL DEFAULT now(),
"updated_at" timestamptz
);

CREATE TABLE "profil" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "rank" text NOT NULL,
    "level" int NOT NULL,
    "game_id" int NOT NULL REFERENCES "game" ("id") ON DELETE CASCADE,
    "user_id" int NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "rate" (
"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"note" int NOT NULL CHECK (note <= 5),
"description" TEXT NOT NULL,
"sender_user_id" int NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
"receiver_profil_id" int NOT NULL REFERENCES "profil" ("id") ON DELETE CASCADE,
"created_at" timestamptz NOT NULL DEFAULT now(),
"updated_at" timestamptz
);

COMMIT;
