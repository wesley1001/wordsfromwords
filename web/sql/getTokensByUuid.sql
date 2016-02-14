-- psql -d wfw -a -f getTokensByUuid.sql

CREATE OR REPLACE FUNCTION get_tokens_by_uuid(uuidArg character(36))
RETURNS TABLE(email_token character(36), email_token_exp date, fb_id character varying(256), fb_token character varying(1024), fb_token_exp timestamp without time zone) AS
$$
BEGIN

    RETURN QUERY EXECUTE '
        SELECT email_token, email_token_exp, fb_id, fb_token, fb_token_exp
        FROM users
        WHERE uuid = $1
    '
    USING uuidArg;
    
END;
$$
LANGUAGE plpgsql;
