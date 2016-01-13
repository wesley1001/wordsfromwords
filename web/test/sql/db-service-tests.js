/*
    These tests are skipped because they actually talk to
    the database (so they're not actually unit tests).
 */

var dbConfig = require('config').get('config.db');
var expect   = require('chai').expect;

describe('The db service', function() {
    
    before(function() {
        console.log('booger');
        this.timeout(0);
        this.dbService = require('../../services/db-service').init(dbConfig);
    });
    
    describe('emailExists()', function() {
        
        before(function() {
            // TODO .... Insert a user with an email address
        });
        
        it('should return true when the email exists');
        
        it('should return false when the email exists');

        after(function() {
            // TODO .... Remove the user inserted in before()
        });
        
    });
    
    after(function() {
        this.dbService.end();
    });
    
});