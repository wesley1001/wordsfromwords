'use strict';

import React            from 'react-native';
import EmailAddressView from '../views/EmailAddressView';

class LoginChoicesModel {
    
    constructor() {
        this._navigator = null;
    }
    
    get navigator() {
        return this._navigator;
    }
    
    initialize(nav) {
        this._navigator = nav;
    }
    
    tryEmailLogin() {
        this.navigator.push({component: EmailAddressView});
    }
    
}

module.exports = new LoginChoicesModel();
