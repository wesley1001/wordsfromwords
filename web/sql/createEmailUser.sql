-- psql -d wfw -a -f createEmailUser.sql

CREATE OR REPLACE FUNCTION create_email_user(uuidArg character(36), emailArg character varying(256), codeArg character(12)) RETURNS void AS
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