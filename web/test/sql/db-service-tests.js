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
    
    after(function() {
        this.dbService.end();
    });
    
});