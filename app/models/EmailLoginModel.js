'use strict';

import React            from 'react-native';

class EmailLoginModel {

    initialize(navigator) {
        this.navigator = navigator;
    }
    
    constructor() {
        this._email = '';
        this._fetching = false;
    }
    
    set email(value) {
        this._email = value;
    }
    
    isEmailValid() {
        var atIndex = this._email.indexOf('@');
        return atIndex > 0 && atIndex < this._email.length - 1;
    }
    
    isFetching() {
        return this._fetching;
    }

    // TODO .... Move this into some file in the util directory
    fixedEncodeURIComponent(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }
    
    checkEmailExists(callback) {
        this._fetching = true;
        var encodedEmail = this.fixedEncodeURIComponent(this._email);
        
        // TODO .... Need to figure out how to differentiate between the dev and prod URL...
        
        fetch('http://192.168.1.2:3000/api/email/exists/'+encodedEmail).then((rawResponse) => {
            return rawResponse.json();
        }).then((response) => {
            this._fetching = false;
            if (!response || response.error) {
                callback();
            } else if (!response.exists) {
                callback(true);
            } else {
                console.log('Navigate to EmailPasswordView...');
            }
        }).catch((error) => {
            this._fetching = false;
            callback();
        });
    }
    
    createAccount() {
        this._fetching = true;
        console.log('POSTing ', this._email, ' to /api/email/create');
        
        // TODO and WYLO .... Once /api/email/create works, POST to it, store the returned uuid, then navigate to EmailSetPasswordView
    }

}

module.exports = new EmailLoginModel();
