DROP DATABASE IF EXISTS datasapiens_test;
CREATE DATABASE datasapiens_test;
\connect datasapiens_test;

CREATE SEQUENCE categories_id_seq;
CREATE TABLE categories (
  id integer PRIMARY KEY DEFAULT nextval('categories_id_seq'),
  name varchar(20) UNIQUE NOT NULL
);

CREATE SEQUENCE users_id_seq;
CREATE TABLE users (
  id integer PRIMARY KEY DEFAULT nextval('users_id_seq'),
  first_name varchar(15) NOT NULL,
  last_name varchar(15) NOT NULL
);

CREATE TYPE entry_type AS ENUM ('expense', 'income');
CREATE SEQUENCE entries_id_seq;
CREATE TABLE entries (
  id integer PRIMARY KEY DEFAULT nextval('entries_id_seq'),
  name varchar(30) NOT NULL,
  type entry_type NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  category_id integer DEFAULT NULL REFERENCES categories (id) ON DELETE SET NULL,
  user_id integer NOT NULL REFERENCES users (id)
);
