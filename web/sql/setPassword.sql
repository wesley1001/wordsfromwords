-- psql -d wfw -a -f setPassword.sql

CREATE OR REPLACE FUNCTION set_password(passwordArg character varying(512), emailTokenArg character(36), uuidArg character(36))
RETURNS void AS
$$
BEGIN

    EXECUTE '
        UPDATE users SET password = $1, email_token = $2, email_token_exp = current_date + interval ''60 days'', verify_code = NULL, verify_code_exp = NULL
        WHERE uuid = $3
    '
    USING passwordArg, emailTokenArg, uuidArg;
    
END;
$$
LANGUAGE plpgsql;
