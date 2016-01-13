/*
    Setup script for the wfw database.
 */

----- Database -----

DROP DATABASE IF EXISTS wfw;

CREATE DATABASE wfw
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1;


----- Tables -----

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    uuid character(36) NOT NULL,
    email character varying(256),
    password character varying(512),
    email_token character(36),
    email_token_exp date,
    verify_code character(8),
    fb_id character varying(256),
    fb_token character varying(1024),
    CONSTRAINT pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS=FALSE
);

CREATE INDEX email_idx
    ON users
    USING btree
    (email COLLATE pg_catalog."default");

ALTER TABLE users
    ADD CONSTRAINT email_uniq UNIQUE(email);

ALTER TABLE users
    ADD CONSTRAINT fb_id_uniq UNIQUE(fb_id);


----- Stored Functions -----


