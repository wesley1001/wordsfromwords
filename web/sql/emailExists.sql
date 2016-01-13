-- psql -d wfw -a -f emailExists.sql

CREATE OR REPLACE FUNCTION email_exists(emailArg character varying(256)) RETURNS boolean AS
$$
DECLARE
    result RECORD;
BEGIN

    EXECUTE '
        SELECT uuid, password
        FROM users
        WHERE email = $1
    '
    INTO result
    USING emailArg;
    
    RETURN result.uuid IS NOT NULL AND result.password IS NOT NULL;
    
END;
$$
LANGUAGE plpgsql;