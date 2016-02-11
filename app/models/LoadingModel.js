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
            console.log('uuid at launch is:', uuid);
            return AsyncStorage.getItem('token');
        }).then((token) => {
            if (uuid && token) {
                // TODO and WYLO 1 .... Now that you seem to be setting the uuid and token correctly, get /api/mobile/relogin working.
                // TODO and WYLO 2 .... Create the GlobalModel class and set stuff on it...
                console.log('POSTing uuid and token to /api/mobile/relogin...');
            } else {
                navigator.replace({component: LoginChoicesView});
            }
        }).catch((error) => {
            console.log("Failed to get uuid and/or token", error);
        });
    }
    
}