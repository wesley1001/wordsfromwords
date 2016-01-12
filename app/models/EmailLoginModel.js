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
    
}

module.exports = new EmailLoginModel();
