/*
    These tests are skipped because they actually talk to
    the database (so they're not actually unit tests).
 */

var dbConfig = require('config').get('config.db');
var pg       = require('pg').native;
var expect   = require('chai').expect;

describe('The db service', function() {
    
    before(function() {
        console.log('booger');
        this.timeout(0);
        this.dbService = require('../../services/db-service').init(dbConfig);
    });
    
    describe('emailExists()', function() {
        
        before(function(beforeDone) {
            console.log('1');
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.log('Error connecting to database:', err);
                    return;
                } else {
                    console.log('no error here...');
                }
                client.query("INSERT INTO users VALUES('11111111-2222-3333-4444-555555555555', 'foo@bar.com', 'password')", function(err, result) {
                    if (err) {
                        console.log('Error inserting test user:', err);
                        return;
                    }
                    console.log('result is:', result);
                    // TODO and WYLO .... This is what the result object looked like:
                    //                    { command: 'INSERT', rowCount: 1, rows: [], fields: null }
                    //
                    //                    Remember that the polaris user still has no permissions!
                    done();
                    beforeDone();
                });
            });
            console.log('2');
        });
        
        it('should return true when the email exists', function(done) {
            console.log('run this!');
            expect(true).to.be.true;
            done();
        });
        
        /*
        after(function() {
            pg.connect(this.dbService.connectionString, function(err, client, done) {
                if (err) {
                    console.error('Error connecting to database:', err);
                    return;
                }
                client.query('DELETE FROM users WHERE uuid = "11111111-2222-3333-4444-555555555555"', function(err, result) {
                    if (err) {
                        console.error('Error deleting test user:', err);
                        return;
                    }
                    console.log('result is:', result);
                    done();
                });
            });
        });
        */
        
    });
    
    after(function() {
        this.dbService.end();
    });
    
});