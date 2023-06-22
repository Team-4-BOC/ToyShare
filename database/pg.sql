DROP SCHEMA IF EXISTS toyshare CASCADE;

CREATE SCHEMA toyshare
  CREATE TABLE users (
    id integer PRIMARY KEY,
    first_name varchar,
    last_name varchar,
    email varchar,
    signed_in boolean,
    city_state varchar
  )
  CREATE TABLE category (
    id integer PRIMARY KEY,
    name varchar NOT NULL
  )
  CREATE TABLE toys (
    id integer PRIMARY KEY,
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
    id integer PRIMARY KEY,
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
    id integer PRIMARY KEY,
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
    id integer PRIMARY KEY,
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
    id integer PRIMARY KEY,
    toy_id integer NOT NULL,
    dates date NOT NULL,
    toy_status integer NOT NULL,
    FOREIGN KEY(toy_id)
      REFERENCES toys(id)
      ON DELETE CASCADE
  )
  CREATE TABLE toy_photos (
    id integer PRIMARY KEY,
    toy_id integer NOT NULL,
    url varchar,
    FOREIGN KEY(toy_id)
      REFERENCES toys(id)
      ON DELETE CASCADE
  )
 CREATE TABLE user_photos (
    id integer PRIMARY KEY,
    user_id integer NOT NULL,
    url varchar,
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );