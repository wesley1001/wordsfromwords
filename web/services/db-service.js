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
    
    updateCodeAndExp: function(code, uuid, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
            } else {
                client.query({
                    name: 'update_code_and_exp_query',
                    text: 'SELECT update_code_and_exp($1, $2)',
                    values: [code, uuid]
                },
                function (err) {
                    if (err) {
                        callback('Error performing update_code_and_exp() query: ' + err);
                    } else {
                        callback(null);
                    }
                    done();
                });
            }
        });
    },
    
    getUuidByFbToken: function(fbToken, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
            } else {
                client.query({
                    name: 'get_uuid_by_fb_token_query',
                    text: 'SELECT * FROM get_uuid_by_fb_token($1)',
                    values: [fbToken]
                },
                function (err, rawResult) {
                    if (err) {
                        callback('Error performing get_uuid_by_fb_token() query: ' + err);
                    } else {
                        var result = {
                            uuid: null
                        };
                        if (rawResult && rawResult.rows && rawResult.rows[0]) {
                            result.uuid = rawResult.rows[0].uuid;
                        }
                        callback(null, result);
                    }
                    done();
                });
            }
        });
    },
    
    createFbUser: function(uuid, fbId, fbToken, fbTokenExp, displayName, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
            } else {
                client.query({
                    name: 'create_fb_user_query',
                    text: 'SELECT create_fb_user($1, $2, $3, $4, $5)',
                    values: [uuid, fbId, fbToken, fbTokenExp, displayName]
                },
                function (err) {
                    if (err) {
                        callback('Error performing create_fb_user() query: ' + err);
                    } else {
                        callback(null);
                    }
                    done();
                });
            }
        });
    },
    
    getTokensByUuid: function(uuid, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
            } else {
                client.query({
                    name: 'get_tokens_by_uuid_query',
                    text: 'SELECT * FROM get_tokens_by_uuid($1)',
                    values: [uuid]
                },
                function (err, rawResult) {
                    if (err) {
                        callback('Error performing get_tokens_by_uuid() query: ' + err);
                    } else {
                        var result = {
                            emailToken:    null,
                            emailTokenExp: null,
                            fbId:          null,
                            fbToken:       null,
                            fbTokenExp:    null
                        };
                        if (rawResult && rawResult.rows && rawResult.rows[0]) {
                            result.emailToken    = rawResult.rows[0].email_token;
                            result.emailTokenExp = rawResult.rows[0].email_token_exp;
                            result.fbId          = rawResult.rows[0].fb_id;
                            result.fbToken       = rawResult.rows[0].fb_token;
                            result.fbTokenExp    = rawResult.rows[0].fb_token_exp;
                        }
                        callback(null, result);
                    }
                    done();
                });
            }
        });
    },
    
    end: function() {
        pg.end();
    }
    
};
