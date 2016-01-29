var pg = require('pg').native;

module.exports = {
    
    init: function(dbConfig) {
        var username = dbConfig.get('username');
        var password = dbConfig.get('password');
        var hostname = dbConfig.get('hostname');
        var database = dbConfig.get('database');
        this.connectionString = 'postgres://'+username+':'+password+'@'+hostname+'/'+database;
        return this;
    },
    
    getUuidAndPassword: function(email, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
                return;
            }
            client.query({
                name: 'get_uuid_and_password_query',
                text: 'SELECT * FROM get_uuid_and_password($1)',
                values: [email]
            },
            function (err, rawResult) {
                if (err) {
                    callback('Error performing get_uuid_and_password() query: ' + err);
                    return;
                }
                var result = {
                    uuid: null,
                    password: null
                };
                if (rawResult && rawResult.rows && rawResult.rows[0]) {
                    result.uuid = rawResult.rows[0].uuid;
                    result.password = rawResult.rows[0].password;
                }
                callback(null, result);
                done();
            });
        });
    },
    
    createEmailUser: function(uuid, email, code, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
                return;
            }
            client.query({
                name: 'create_email_user_query',
                text: 'SELECT create_email_user($1, $2, $3)',
                values: [uuid, email, code]
            },
            function (err) {
                if (err) {
                    callback('Error performing create_email_user() query: ' + err);
                    return;
                }
                callback(null);
                done();
            });
        });
    },

    getCodeAndExp: function(uuid, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
                return;
            }
            client.query({
                name: 'get_code_and_exp_query',
                text: 'SELECT * FROM get_code_and_exp($1)',
                values: [uuid]
            },
            function (err, rawResult) {
                if (err) {
                    callback('Error performing get_code_and_exp() query: ' + err);
                    return;
                }
                var result = {
                    code: null,
                    expired: null
                };
                if (rawResult && rawResult.rows && rawResult.rows[0]) {
                    result.code = rawResult.rows[0].code;
                    result.expired = rawResult.rows[0].expired;
                }
                callback(null, result);
                done();
            });
        });
    },
    
    end: function() {
        pg.end();
    }
    
};
