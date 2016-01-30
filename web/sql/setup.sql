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

-- get_uuid_and_password()

CREATE OR REPLACE FUNCTION get_uuid_and_password(emailArg character varying(256))
RETURNS TABLE(uuid character(36), password character varying(512)) AS
$$
BEGIN

    RETURN QUERY EXECUTE '
        SELECT uuid, password
        FROM users
        WHERE email = $1
    '
    USING emailArg;
    
END;
$$
LANGUAGE plpgsql;


-- create_email_user()

CREATE OR REPLACE FUNCTION create_email_user(uuidArg character(36), emailArg character varying(256), codeArg character(12))
RETURNS void AS
$$
BEGIN

    EXECUTE '
        INSERT INTO users (uuid, email, verify_code, verify_code_exp)
        VALUES($1, $2, $3, localtimestamp)
    '
    USING uuidArg, emailArg, codeArg;
    
END;
$$
LANGUAGE plpgsql;


-- get_code_and_exp()

CREATE OR REPLACE FUNCTION get_code_and_exp(uuidArg character(36))
RETURNS TABLE(code character(12), expired boolean) AS
$$
BEGIN

    RETURN QUERY EXECUTE '
        SELECT verify_code AS code, verify_code_exp + interval ''10 minutes'' < localtimestamp AS expired
        FROM users
        WHERE uuid = $1
    '
    USING uuidArg;
    
END;
$$
LANGUAGE plpgsql;


-- set_password()

CREATE OR REPLACE FUNCTION set_password(passwordArg character varying(512), emailTokenArg character(36), uuidArg character(36))
RETURNS void AS
$$
BEGIN

    EXECUTE '
        UPDATE users SET password = $1, email_token = $2, email_token_exp = current_date, verify_code = NULL, verify_code_exp = NULL
        WHERE uuid = $3
    '
    USING passwordArg, emailTokenArg, uuidArg;
    
END;
$$
LANGUAGE plpgsql;


-- 
