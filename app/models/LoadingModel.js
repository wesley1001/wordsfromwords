'use strict';

import React from 'react-native';
import Env   from '../util/Env';

let {
    AsyncStorage
} = React;

export default class LoadingModel {
    
    setLoginChoicesView(loginChoicesView) {
        this.loginChoicesView = loginChoicesView;
    }
    
    initialize(navigator) {
        let uuid = null;
        
        /*
        AsyncStorage.removeItem('uuid');
        AsyncStorage.removeItem('token');
        */
        
        /**/
        AsyncStorage.getItem('uuid').then((value) => {
            uuid = value;
            return AsyncStorage.getItem('token');
        }).then((token) => {
            if (uuid && token) {
                console.log('POSTing uuid and token to /api/mobile/relogin...');
                fetch(Env.getApiHost() + '/api/mobile/relogin', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uuid: uuid,
                        token: token
                    })
                }).then((rawResponse) => {
                    return rawResponse.json();
                }).then((response) => {
                    if (!response || !response.authenticated) {
                        console.log('not authenticated...');
                        this.navigator.push({component: this.loginChoicesView});
                    } else {
                        // TODO and WYLO .... Create the GlobalModel class and set stuff on it...
                        console.log('authenticated...setting uuid to', uuid, 'and fbUser to', response.fbUser, 'on GlobalModel');
                        console.log('TODO: Navigate to GameListView...');
                    }
                }).catch((error) => {
                    console.log(error);
                    this._fetching = false;
                    callback();
                });
            } else {
                navigator.replace({component: this.loginChoicesView});
            }
        }).catch((error) => {
            console.log("Failed to get uuid and/or token", error);
        });
        
    }
    
}