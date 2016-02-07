-- psql -d wfw -a -f createFbUser.sql

CREATE OR REPLACE FUNCTION create_fb_user(uuidArg character(36),
                                          fbIdArg character varying(256),
                                          fbTokenArg character varying(1024),
                                          fbTokenExpArg timestamp without time zone,
                                          displayNameArg character varying(256))
RETURNS void AS
$$
BEGIN

    EXECUTE '
        INSERT INTO users (uuid, fb_id, fb_token, fb_token_exp, display_name)
        VALUES($1, $2, $3, $4, $5)
    '
    USING uuidArg, fbIdArg, fbTokenArg, fbTokenExpArg, displayNameArg;
    
END;
$$
LANGUAGE plpgsql;
