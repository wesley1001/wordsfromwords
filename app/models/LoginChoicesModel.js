'use strict';

import EmailAddressView from '../views/EmailAddressView';
//import EmailSetPasswordView from '../views/EmailSetPasswordView';

class LoginChoicesModel {
    
    initialize(navigator) {
        this.navigator = navigator;
    }
    
    tryEmailLogin() {
        this.navigator.push({component: EmailAddressView});
    }
    
}

module.exports = new LoginChoicesModel();
