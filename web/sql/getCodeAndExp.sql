-- psql -d wfw -a -f getCodeAndExp.sql

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
