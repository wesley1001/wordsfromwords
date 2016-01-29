-- psql -d wfw -a -f getUuidAndPassword.sql

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
