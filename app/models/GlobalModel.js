'use strict';

class GlobalModel {
    
    constructor() {
        this._uuid = '';
        this._fbUser = false;
    }
    
    get uuid() {
        return this._uuid
    }
    
    set uuid(value) {
        this._uuid = value;
    }
    
    get fbUser() {
        return this._fbUser;
    }
    
    set fbUser(value) {
        this._fbUser = value;
    }
    
}

module.exports = new GlobalModel();
