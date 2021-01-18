/* CREATION DES TABLES */

BEGIN;

DROP TABLE IF EXISTS "subject", "verb", "complement";

CREATE TABLE IF NOT EXIST "subject" (
    "id" serial PRIMARY Key,
    "name" text NOT NULL
);

CREATE TABLE IF NOT EXIST "verb" (
    "id" serial PRIMARY Key,
    "name" text NOT NULL
);

CREATE TABLE IF NOT EXIST "complement" (
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

SELECT setval('list_id_seq', (SELECT MAX(id) from "list"));
SELECT setval('card_id_seq', (SELECT MAX(id) from "card"));
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag"));

COMMIT;