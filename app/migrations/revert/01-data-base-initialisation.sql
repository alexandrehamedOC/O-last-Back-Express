-- Revert olast:create from pg

BEGIN;

DROP TABLE IF EXISTS "rate", "profil", "post", "game", "user";

COMMIT;
