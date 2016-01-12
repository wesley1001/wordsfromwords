/**
 * Utility class for detecting device type based on dimensions.
 */

import React from 'react-native';

let {Dimensions} = React;

class Device {
    
    constructor() {
        let {width} = Dimensions.get('window');
        this._isIpad = width >= 768;
    }
    
    get isIpad() {
        return this._isIpad;
    }
    
}

module.exports = new Device();
