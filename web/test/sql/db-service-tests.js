/*
    These tests are skipped because they actually talk to
    the database (so they're not actually unit tests).
 */

var dbConfig = require('config').get('config.db');
var pg       = require('pg').native;
var expect   = require('chai').expect;

describe('The db service', function() {
    
    before(function() {
        this.timeout(0);
        this.dbService = require('../../services/db-service').init(dbConfig);
    });
    
    describe('getUuidAndPassword()', function() {

        before(function(beforeDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("INSERT INTO users VALUES('11111111-2222-3333-4444-555555555555', 'foo@bar.com', 'password')", function(err, result) {
                    if (err) {
                        console.error('Error inserting test user:', err);
                        return;
                    }
                    if (!result || !result.rowCount || result.rowCount != 1) {
                        console.error('Unknown error inserting test user.');
                    }
                    done();
                    beforeDone();
                });
            });
        });

        it('should return the uuid and password when they exist', function(done) {
            this.dbService.getUuidAndPassword('foo@bar.com', function(err, result) {
                if (err) {
                    console.error(err);
                }
                expect(result.uuid).to.equal('11111111-2222-3333-4444-555555555555');
                expect(result.password).to.equal('password');
                done();
            });
        });

        it('should return null for the uuid and password when they do not exist', function(done) {
            this.dbService.getUuidAndPassword('bar@foo.com', function(err, result) {
                if (err) {
                    console.error(err);
                }
                expect(result.uuid).to.be.null;
                expect(result.password).to.be.null;
                done();
            });
        });

        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '11111111-2222-3333-4444-555555555555'", function(err) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    done();
                    afterDone();
                });
            });
        });
        
    });
    
    describe('createEmailUser()', function() {
        
        it('should insert a new email user', function(itDone) {
            var connectString = this.dbService.connectionString;
            this.dbService.createEmailUser('21111111-2222-3333-4444-555555555555', 'foo@bar.com', '123456789012', function(err) {
                if (err) {
                    console.error(err);
                }
                pg.connect(connectString, function(err, client, done) {
                    if (err) {
                        console.error('Error connecting to database:', err);
                        return;
                    }
                    client.query("SELECT * FROM users WHERE uuid = '21111111-2222-3333-4444-555555555555'", function(err, result) {
                        if (err) {
                            console.error('Error creating email user:', err);
                            return;
                        }
                        if (!result || !result.rowCount || result.rowCount != 1) {
                            console.error('Unknown error creating email user.');
                        }
                        expect(result.rowCount).to.equal(1);
                        done();
                        itDone();
                    });
                });
            });
        });

        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '21111111-2222-3333-4444-555555555555'", function(err) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    done();
                    afterDone();
                });
            });
        });
        
    });
    
    describe('getCodeAndExp()', function() {

        before(function(beforeDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("INSERT INTO users (uuid, email, verify_code, verify_code_exp) VALUES('31111111-2222-3333-4444-555555555555', 'foo@bar.com', '123456789123', localtimestamp)", function(err, result) {
                    if (err) {
                        console.error('Error inserting test user:', err);
                        return;
                    }
                    if (!result || !result.rowCount || result.rowCount != 1) {
                        console.error('Unknown error inserting test user.');
                    }
                    done();
                    beforeDone();
                });
            });
        });
        
        it('should return the code and false when not expired', function(done) {
            this.dbService.getCodeAndExp('31111111-2222-3333-4444-555555555555', function(err, result) {
                if (err) {
                    console.error(err);
                }
                expect(result.code).to.equal('123456789123');
                expect(result.expired).not.to.be.true;
                done();
            });
        });

        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '31111111-2222-3333-4444-555555555555'", function(err) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    done();
                    afterDone();
                });
            });
        });
        
    });

    describe('setPassword()', function() {

        before(function(beforeDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("INSERT INTO users (uuid, email, verify_code, verify_code_exp) VALUES('41111111-2222-3333-4444-555555555555', 'foo@bar.com', '123456789123', localtimestamp)", function(err, result) {
                    if (err) {
                        console.error('Error inserting test user:', err);
                        return;
                    }
                    if (!result || !result.rowCount || result.rowCount != 1) {
                        console.error('Unknown error inserting test user.');
                    }
                    done();
                    beforeDone();
                });
            });
        });

        it('should set a user\'s password', function(itDone) {
            var connectString = this.dbService.connectionString;
            this.dbService.setPassword('password', '11111111-1111-1111-1111-111111111111', '41111111-2222-3333-4444-555555555555', function(err) {
                if (err) {
                    console.error(err);
                }
                pg.connect(connectString, function(err, client, done) {
                    if (err) {
                        console.error('Error connecting to database:', err);
                        return;
                    }
                    client.query("SELECT * FROM users WHERE uuid = '41111111-2222-3333-4444-555555555555'", function(err, result) {
                        if (err) {
                            console.error('Error creating email user:', err);
                            return;
                        }
                        if (!result || !result.rowCount || result.rowCount != 1) {
                            console.error('Unknown error setting password.');
                        }
                        expect(result.rowCount).to.equal(1);
                        done();
                        itDone();
                    });
                });
            });
        });

        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '41111111-2222-3333-4444-555555555555'", function(err) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    done();
                    afterDone();
                });
            });
        });

    });

    describe('updateCodeAndExp()', function() {

        before(function(beforeDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("INSERT INTO users (uuid, email, verify_code, verify_code_exp) VALUES('51111111-2222-3333-4444-555555555555', 'foo@bar.com', '987654321987', localtimestamp)", function(err, result) {
                    if (err) {
                        console.error('Error inserting test user:', err);
                        return;
                    }
                    if (!result || !result.rowCount || result.rowCount != 1) {
                        console.error('Unknown error inserting test user.');
                    }
                    done();
                    beforeDone();
                });
            });
        });

        it('should update a user\'s code and expiration', function(itDone) {
            var connectString = this.dbService.connectionString;
            this.dbService.updateCodeAndExp('123456789123', '51111111-2222-3333-4444-555555555555', function(err) {
                if (err) {
                    console.error(err);
                }
                pg.connect(connectString, function(err, client, done) {
                    if (err) {
                        console.error('Error connecting to database:', err);
                        return;
                    }
                    client.query("SELECT * FROM users WHERE uuid = '51111111-2222-3333-4444-555555555555'", function(err, result) {
                        if (err) {
                            console.error('Error creating email user:', err);
                            return;
                        }
                        if (!result || !result.rowCount || result.rowCount != 1) {
                            console.error('Unknown error setting password.');
                        }
                        expect(result.rowCount).to.equal(1);
                        done();
                        itDone();
                    });
                });
            });
        });

        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '51111111-2222-3333-4444-555555555555'", function(err) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    done();
                    afterDone();
                });
            });
        });

    });
    
    describe('getUuidByFbToken()', function() {
        
        describe('when the user does not exist', function() {
            
            it('should return null for the uuid', function(itDone) {
                var connectString = this.dbService.connectionString;
                this.dbService.getUuidByFbToken('abc123', function(err, result) {
                    expect(err).to.be.null;
                    expect(result).not.to.be.null;
                    expect(result.uuid).to.be.null;
                    itDone();
                })
            });
            
        });
        
        describe('when the user exists', function() {
            
            before(function(beforeDone) {
                pg.connect(this.dbService.connectionString, function(err, client, done) {
                    if (err) {
                        console.error('Error connecting to database:', err);
                        return;
                    }
                    client.query("INSERT INTO users (uuid, fb_token) VALUES('61111111-2222-3333-4444-555555555555', 'abc123')", function(err, result) {
                        if (err) {
                            console.error('Error inserting test user:', err);
                            return;
                        }
                        if (!result || !result.rowCount || result.rowCount != 1) {
                            console.error('Unknown error inserting test user.');
                        }
                        done();
                        beforeDone();
                    });
                });
            });

            it('should return the uuid', function(itDone) {
                var connectString = this.dbService.connectionString;
                this.dbService.getUuidByFbToken('abc123', function(err, result) {
                    expect(err).to.be.null;
                    expect(result.uuid).to.equal('61111111-2222-3333-4444-555555555555');
                    itDone();
                });
            });

            after(function(afterDone) {
                pg.connect(this.dbService.connectionString, function(err, client, done) {
                    if (err) {
                        console.error('Error connecting to database:', err);
                        return;
                    }
                    client.query("DELETE FROM users WHERE uuid = '61111111-2222-3333-4444-555555555555'", function(err) {
                        if (err) {
                            console.error('Error deleting test user:', err);
                            return;
                        }
                        done();
                        afterDone();
                    });
                });
            });
            
        });
        
    });
    
    describe('createFbUser()', function() {

        it('should insert a new Facebook user', function(itDone) {
            var connectString = this.dbService.connectionString;
            var fbTokenExp = new Date(1459742153 * 1000);
            this.dbService.createFbUser('71111111-2222-3333-4444-555555555555', '123', 'abc', fbTokenExp.toISOString(), 'Rob', function(err) {
                if (err) {
                    console.error(err);
                }
                pg.connect(connectString, function(err, client, done) {
                    if (err) {
                        console.error('Error connecting to database:', err);
                        return;
                    }
                    client.query("SELECT * FROM users WHERE uuid = '71111111-2222-3333-4444-555555555555'", function(err, result) {
                        if (err) {
                            console.error('Error creating Facebook user:', err);
                            return;
                        }
                        if (!result || !result.rowCount || result.rowCount != 1) {
                            console.error('Unknown error creating Facebook user.');
                        }
                        expect(result.rowCount).to.equal(1);
                        done();
                        itDone();
                    });
                });
            });
        });

        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '71111111-2222-3333-4444-555555555555'", function(err) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    done();
                    afterDone();
                });
            });
        });
        
    });
    
    describe('getTokensByUuid()', function() {

        before(function(beforeDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("INSERT INTO users (uuid, email_token, email_token_exp, fb_id, fb_token, fb_token_exp) VALUES('81111111-2222-3333-4444-555555555555', '11111111-2222-3333-4444-555555555555', NOW(), 'abc123', '123abc', localtimestamp)", function(err, result) {
                    if (err) {
                        console.error('Error inserting test user:', err);
                        return;
                    }
                    if (!result || !result.rowCount || result.rowCount != 1) {
                        console.error('Unknown error inserting test user.');
                    }
                    done();
                    beforeDone();
                });
            });
        });
        
        it('should return the tokens and their expirations', function(itDone) {
            this.dbService.getTokensByUuid('81111111-2222-3333-4444-555555555555', function(err, result) {
                expect(err).to.be.null;
                expect(result.emailToken).to.equal('11111111-2222-3333-4444-555555555555');
                expect(result.fbId).to.equal('abc123');
                expect(result.fbToken).to.equal('123abc');
                itDone();
            });
        });

        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '81111111-2222-3333-4444-555555555555'", function(err) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    done();
                    afterDone();
                });
            });
        });
        
    });
    
    after(function() {
        this.dbService.end();
    });
    
});