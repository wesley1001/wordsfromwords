var pg = require('pg').native;

module.exports = {
    
    init: function(dbConfig) {
        // TODO and WYLO 1 .... Write the necessary initialization code here.
    },
    
    emailExists: function(email) {
        // TODO and WYLO 2 .... Use your new email_exists() stored function!
    },
    
    end: function() {
        pg.end();
    }
    
};
