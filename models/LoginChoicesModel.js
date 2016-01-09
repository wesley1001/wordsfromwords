'use strict';

import React            from 'react-native';
import EmailAddressView from '../views/EmailAddressView';

class LoginChoicesModel {
    
    initialize(navigator) {
        this.navigator = navigator;
    }
    
    tryEmailLogin() {
        this.navigator.push({component: EmailAddressView});
    }
    
}

module.exports = new LoginChoicesModel();
