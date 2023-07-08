DROP SCHEMA IF EXISTS toyshare CASCADE;

CREATE SCHEMA toyshare
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar,
    last_name varchar,
    email varchar,
    signed_in boolean,
    city_state varchar
  )
  CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name varchar NOT NULL
  )
  CREATE TABLE toys (
    id SERIAL PRIMARY KEY,
    toy_name varchar,
    category_id integer,
    rating integer,
    user_id integer NOT NULL,
    toy_description varchar,
    original_price numeric NOT NULL,
    rental_price numeric NOT NULL,
    delivery_method varchar,
    payment_method varchar,
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,
    FOREIGN KEY(category_id)
      REFERENCES category(id)
      ON DELETE CASCADE
  )
  CREATE TABLE saved_toys (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    toy_id integer NOT NULL,
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,
    FOREIGN KEY(toy_id)
      REFERENCES toys(id)
      ON DELETE CASCADE
  )
  CREATE TABLE inventory_out (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    toy_id integer NOT NULL,
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,
    FOREIGN KEY(toy_id)
      REFERENCES toys(id)
      ON DELETE CASCADE
  )
    CREATE TABLE toy_rental_history (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    toy_id integer NOT NULL,
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,
    FOREIGN KEY(toy_id)
      REFERENCES toys(id)
      ON DELETE CASCADE
  )
  CREATE TABLE dates_available (
    id SERIAL PRIMARY KEY,
    toy_id integer NOT NULL,
    dates date NOT NULL,
    toy_status integer NOT NULL,
    FOREIGN KEY(toy_id)
      REFERENCES toys(id)
      ON DELETE CASCADE
  )
  CREATE TABLE toy_photos (
    id SERIAL PRIMARY KEY,
    toy_id integer NOT NULL,
    url varchar,
    FOREIGN KEY(toy_id)
      REFERENCES toys(id)
      ON DELETE CASCADE
  )
 CREATE TABLE user_photos (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    url varchar,
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  )
  CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    message varchar,
    read boolean,
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  -- AFTER IMPORTING THE DATA- This sets the auto icrement to the last id
SELECT setval('toyshare.users_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.users));
SELECT setval('toyshare.category_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.category));
SELECT setval('toyshare.toys_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.toys));
SELECT setval('toyshare.saved_toys_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.saved_toys));
SELECT setval('toyshare.inventory_out_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.inventory_out));
SELECT setval('toyshare.toy_rental_history_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.toy_rental_history));
SELECT setval('toyshare.dates_available_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.dates_available));
SELECT setval('toyshare.toy_photos_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.toy_photos));
SELECT setval('toyshare.user_photos_id_seq', (SELECT COALESCE(MAX(id), 0) FROM toyshare.user_photos));
