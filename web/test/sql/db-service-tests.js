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
    
    describe('emailExists()', function() {
        
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
        
        it('should return true when the email exists', function(done) {
            this.dbService.emailExists('foo@bar.com', function(err, result) {
                if (err) {
                    console.error(err);
                }
                expect(result).to.be.true;
                done();
            });
        });

        it('should return false when the email does not exist', function(done) {
            this.dbService.emailExists('bar@foo.com', function(err, result) {
                if (err) {
                    console.error(err);
                }
                expect(result).not.to.be.true;
                done();
            });
        });
        
        after(function(afterDone) {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query("DELETE FROM users WHERE uuid = '11111111-2222-3333-4444-555555555555'", function(err, result) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    if (!result || !result.rowCount || result.rowCount != 1) {
                        console.error('Unknown error deleting test user.');
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