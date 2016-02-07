-- psql -d wfw -a -f getUuidByFbToken.sql

CREATE OR REPLACE FUNCTION get_uuid_by_fb_token(fbTokenArg character varying(1024))
RETURNS TABLE(uuid character(36)) AS
$$
BEGIN

    RETURN QUERY EXECUTE '
        SELECT uuid
        FROM users
        WHERE fb_token = $1
    '
    USING fbTokenArg;
    
END;
$$
LANGUAGE plpgsql;
