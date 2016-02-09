'use strict';

import Env from '../util/Env';

class EmailLoginModel {

    constructor() {
        this._email = '';
        this._uuid  = '';
        this._code1 = '';
        this._code2 = '';
        this._code3 = '';
        this._code4 = '';
        this._password = '';  // Used for login.
        this._password1 = ''; // Used for registration.
        this._password2 = '';
        this._fetching = false;
    }
    
    setNavigator(navigator) {
        this.navigator = navigator;
    }
    
    setEmailSetPasswordView(emailSetPasswordView) {
        this.emailSetPasswordView = emailSetPasswordView;
    }
    
    setEmailPasswordView(emailPasswordView) {
        this.emailPasswordView = emailPasswordView;
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

    set password(value) {
        this._password = value;
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
    
    isPasswordValid() {
        return this._password.length >= 8;
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
        
        fetch(Env.getApiHost() + '/api/email/exists/'+encodedEmail).then((rawResponse) => {
            return rawResponse.json();
        }).then((response) => {
            this._fetching = false;
            if (!response || response.error) {
                callback();
            } else if (!response.exists) {
                callback(true);
            } else {
                this.navigator.push({component: this.emailPasswordView});
            }
        }).catch((error) => {
            this._fetching = false;
            callback();
        });
    }
    
    createAccount(callback) {
        this._fetching = true;

        fetch(Env.getApiHost() + '/api/email/create', {
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
                // TODO ....
                console.log('TODO: Save', response.uuid, 'to local storage...');
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

        this._fetching = true;

        fetch(Env.getApiHost() + '/api/email/passwords', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this._email,
                uuid: this._uuid,
                code: fullCode,
                password1: this._password1,
                password2: this._password2
            })
        }).then((rawResponse) => {
            return rawResponse.json();
        }).then((response) => {
            this._fetching = false;
            if (!response || (response.error && response.error !== 'code' && response.error !== 'expired')) {
                callback({unknown: true});
            } else if (response.error) {
                var reason = {};
                reason[response.error] = true; // Could be 'code' or 'expired'.
                callback(reason);
            } else {
                // TODO ....
                console.log('TODO: Save email login token', response.token, 'to local storage...');
                console.log('TODO: Navigate to GameListView...');
            }
        }).catch((error) => {
            console.log(error);
            this._fetching = false;
            callback({unknown: true});
        });
    }

}

module.exports = new EmailLoginModel();
