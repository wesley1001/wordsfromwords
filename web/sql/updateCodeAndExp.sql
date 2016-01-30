-- psql -d wfw -a -f updateCodeAndExp.sql

CREATE OR REPLACE FUNCTION update_code_and_exp(codeArg character(12), uuidArg character(36))
RETURNS void AS
$$
BEGIN

    EXECUTE '
        UPDATE users SET verify_code = $1, verify_code_exp = localtimestamp
        WHERE uuid = $2
    '
    USING codeArg, uuidArg;
    
END;
$$
LANGUAGE plpgsql;

