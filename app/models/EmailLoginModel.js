'use strict';

class EmailLoginModel {

    constructor() {
        this._email = '';
        this._uuid  = '';
        this._code1 = '';
        this._code2 = '';
        this._code3 = '';
        this._code4 = '';
        this._password1 = '';
        this._password2 = '';
        this._fetching = false;
    }
    
    setNavigator(navigator) {
        this.navigator = navigator;
    }
    
    setEmailSetPasswordView (emailSetPasswordView) {
        this.emailSetPasswordView = emailSetPasswordView;
    }
    
    set email(value) {
        this._email = value;
    }

    set code1(value) {
        this._code1 = value;
    }

    set code2(value) {
        this._code2 = value;
    }

    set code3(value) {
        this._code3 = value;
    }

    set code4(value) {
        this._code4 = value;
    }

    set password1(value) {
        this._password1 = value;
    }

    set password2(value) {
        this._password2 = value;
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
    
    createAccount(callback) {
        this._fetching = true;

        // TODO .... Need to figure out how to differentiate between the dev and prod URL...
        
        fetch('http://192.168.1.2:3000/api/email/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this._email
            })
        }).then((rawResponse) => {
            return rawResponse.json();
        }).then((response) => {
            this._fetching = false;
            if (!response || !response.uuid || response.error) {
                callback();
            } else {
                console.log('Saving', response.uuid, 'to local storage...');
                this._uuid = response.uuid;
                this.navigator.push({component: this.emailSetPasswordView});
            }
        }).catch((error) => {
            console.log(error);
            this._fetching = false;
            callback();
        });
    }
    
    submitCodeAndPassword(callback) {
        var fullCode = this._code1 + this._code2 + this._code3 + this._code4;
        if (!/^\d{12}$/.test(fullCode)) {
            callback({invalidCode: true});
            return;
        }
        
        if (this._password1.length < 8) {
            callback({invalidPassword: true});
            return;
        }
        
        if (this._password1 !== this._password2) {
            callback({mismatch: true});
            return;
        }
        
        console.log('POSTing uuid:', this._uuid);
        
        // TODO and WYLO .... POST the uuid, code, and passwords to /api/email/passwords
    }

}

module.exports = new EmailLoginModel();
