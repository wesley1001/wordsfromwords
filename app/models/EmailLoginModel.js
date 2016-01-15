'use strict';

import React            from 'react-native';

class EmailLoginModel {

    initialize(navigator) {
        this.navigator = navigator;
    }
    
    constructor() {
        this._email = '';
    }
    
    set email(value) {
        this._email = value;
    }
    
    isEmailValid() {
        var atIndex = this._email.indexOf('@');
        return atIndex > 0 && atIndex < this._email.length - 1;
    }

    // TODO .... Move this into some file in the util directory
    fixedEncodeURIComponent(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }
    
    checkEmailExists(callback) {
        var encodedEmail = this.fixedEncodeURIComponent(this._email);
        // TODO .... Need to figure out how to differentiate between the dev and prod URL...
        fetch('http://192.168.1.2:3000/api/email/exists/'+encodedEmail).then((rawResponse) => {
            return rawResponse.json();
        }).then((response) => {
            // TODO and WYLO .... Handle all the below cases...
            if (!response || response.error) {
                console.log('An unknown error occurred. Please check your network connection and try again.');
            } else if (response.exists) {
                console.log('Navigate to EmailPasswordView...');
            } else {
                console.log('Execute callback()...');
            }
        }).catch((error) => {
            console.warn(error);
        });
    }

}

module.exports = new EmailLoginModel();
