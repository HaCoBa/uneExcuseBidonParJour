/* CREATION DES TABLES */

BEGIN;

DROP TABLE IF EXISTS "subject", "verb", "complement";

CREATE TABLE IF NOT EXISTS"subject" (
    "id" serial PRIMARY Key,
    "name" text NOT NULL
);

CREATE TABLE IF NOT EXISTS"verb" (
    "id" serial PRIMARY Key,
    "name" text NOT NULL
);

CREATE TABLE IF NOT EXISTS"complement" (
    "id" serial PRIMARY Key,
    "name" text NOT NULL
);

COMMIT;

/* INJECTIONS DES DONNEES DANS LES TABLES */

BEGIN;

INSERT INTO "subject" ("id","name") VALUES
(1, 'Mon chat'),
(2, 'Mon chien'),
(3, 'Mon hamster');

INSERT INTO "verb" ("id","name") VALUES
(1, 'a mangé'),
(2, 'a brûlé'),
(3, 'a bavé sur');

INSERT INTO "complement" ("id","name") VALUES
(1, 'mes devoirs'),
(2, 'mes pantoufles'),
(3, 'mon lit');

COMMIT;

/* PETITE REGLE POUR RECUPERER LE DERNIER ID A LA CREATION D'UNE NOUVELLE ENTREE VIA UNE INTERFACE */
/* PAS SURE DE L'UTILISER ICI MAIS ON SAIT JAMAIS */

BEGIN;

-- PostGres avec le type serial n'incrémente pas automatiquement de façon implicite la séquence rattaché à la colonne !
-- Il faut donc mettre à jour la valeur courante de chacune des séquences en séléctionnant l'id maximum de chaque table

SELECT setval('subject_id_seq', (SELECT MAX(id) from "subject"));
SELECT setval('verb_id_seq', (SELECT MAX(id) from "verb"));
SELECT setval('complement_id_seq', (SELECT MAX(id) from "complement"));

COMMIT;