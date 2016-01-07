'use strict';

import React            from 'react-native';
import LoginChoicesView from '../views/LoginChoicesView';

let {
    AsyncStorage
} = React;

export default class LoadingModel {
    
    initialize(navigator) {
        let uuid  = null;
        
        AsyncStorage.getItem('uuid').then((value) => {
            uuid = value;
            return AsyncStorage.getItem('token');
        }).then((token) => {
            if (uuid && token) {
                console.log('POSTing uuid and token to /api/mobile/relogin...');
            } else {
                console.log('Navigating to LoginChoicesView...');
                navigator.replace({component: LoginChoicesView});
            }
        }).catch(function(error) {
            console.log("Failed to get uuid and/or token", error);
        });
    }
    
}