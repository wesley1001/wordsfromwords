var pg     = require('pg').native,
    bcrypt = require('bcrypt');

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
            } else {
                client.query({
                    name: 'get_uuid_and_password_query',
                    text: 'SELECT * FROM get_uuid_and_password($1)',
                    values: [email]
                },
                function (err, rawResult) {
                    if (err) {
                        callback('Error performing get_uuid_and_password() query: ' + err);
                    } else {
                        var result = {
                            uuid: null,
                            password: null
                        };
                        if (rawResult && rawResult.rows && rawResult.rows[0]) {
                            result.uuid = rawResult.rows[0].uuid;
                            result.password = rawResult.rows[0].password;
                        }
                        callback(null, result);
                    }
                    done();
                });
            }
        });
    },
    
    createEmailUser: function(uuid, email, code, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
            } else {
                client.query({
                    name: 'create_email_user_query',
                    text: 'SELECT create_email_user($1, $2, $3)',
                    values: [uuid, email, code]
                },
                function (err) {
                    if (err) {
                        callback('Error performing create_email_user() query: ' + err);
                    } else {
                        callback(null);
                    }
                    done();
                });
            }
        });
    },

    getCodeAndExp: function(uuid, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
            } else {
                client.query({
                    name: 'get_code_and_exp_query',
                    text: 'SELECT * FROM get_code_and_exp($1)',
                    values: [uuid]
                },
                function (err, rawResult) {
                    if (err) {
                        callback('Error performing get_code_and_exp() query: ' + err);
                    } else {
                        var result = {
                            code: null,
                            expired: null
                        };
                        if (rawResult && rawResult.rows && rawResult.rows[0]) {
                            result.code = rawResult.rows[0].code;
                            result.expired = rawResult.rows[0].expired;
                        }
                        callback(null, result);
                    }
                    done();
                });
            }
        });
    },

    setPassword: function(password, emailToken, uuid, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (hashErr, hash) {
                        if (hashErr) {
                            callback('Error setting password: ' + hashErr);
                            done();
                        } else {
                            client.query({
                                name: 'set_password_query',
                                text: 'SELECT set_password($1, $2, $3)',
                                values: [hash, emailToken, uuid]
                            },
                            function (err) {
                                if (err) {
                                    callback('Error performing set_password() query: ' + err);
                                } else {
                                    callback(null);
                                }
                                done();
                            });
                        }
                    });
                });
            }
        });
    },
    
    end: function() {
        pg.end();
    }
    
};
