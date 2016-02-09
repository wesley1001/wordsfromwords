'use strict';

import React            from 'react-native';
import LoginChoicesView from '../views/LoginChoicesView';

let {
    AsyncStorage
} = React;

export default class LoadingModel {
    
    initialize(navigator) {
        let uuid = null;
        
        AsyncStorage.getItem('uuid').then((value) => {
            uuid = value;
            return AsyncStorage.getItem('token');
        }).then((token) => {
            if (uuid && token) {
                console.log('POSTing uuid and token to /api/mobile/relogin...');
            } else {
                navigator.replace({component: LoginChoicesView});
            }
        }).catch((error) => {
            console.log("Failed to get uuid and/or token", error);
        });
    }
    
}