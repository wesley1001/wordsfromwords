'use strict';

import React      from 'react-native';
import FBSDKLogin from 'react-native-fbsdklogin';
import FBSDKCore  from 'react-native-fbsdkcore';
import Env        from '../util/Env';

let {
    AsyncStorage
} = React;

let {
    FBSDKLoginManager
} = FBSDKLogin;

let {
    FBSDKAccessToken,
    FBSDKGraphRequest
} = FBSDKCore;

class LoginChoicesModel {
    
    setEmailAddressView(emailAddressView) {
        this.emailAddressView = emailAddressView;
    }
    
    initialize(navigator) {
        this.navigator = navigator;
    }
    
    tryEmailLogin() {
        this.navigator.push({component: this.emailAddressView});
    }
    
    tryFacebookLogin() {
        FBSDKLoginManager.setLoginBehavior('native');
        FBSDKLoginManager.setDefaultAudience('friends');
        FBSDKLoginManager.logInWithReadPermissions(['public_profile'], (error, result) => {
            if (error) {
                console.log('Error logging in:', error);
            } else {
                if (result.isCancelled) {
                    console.log('Login cancelled...');
                } else {
                    
                    /*
                        This is what the result looks like:

                        {
                            isCancelled: false,
                            declinedPermissions: [],
                            grantedPermissions: ['public_profile']
                        }
                        
                     */
                    
                    FBSDKAccessToken.getCurrentAccessToken((token) => {
                        if (token && token.tokenString) {
                            var graphRequest = new FBSDKGraphRequest((graphError, result) => {
                                if (graphError) {
                                    console.log('Error making graph request:', graphError);
                                } else {
                                    fetch(Env.getApiHost() + '/api/facebook/validate', {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            fbId: result.id,
                                            displayName: result.name.substring(0, result.name.indexOf(' ')),
                                            fbToken: token.tokenString
                                        })
                                    }).then((rawResponse) => {
                                        return rawResponse.json();
                                    }).then((response) => {
                                        if (!response || !response.uuid || response.error) {
                                            console.log('Error:', response.error);
                                        } else {
                                            AsyncStorage.setItem('uuid', response.uuid);
                                            AsyncStorage.setItem('token', token.tokenString);
                                            // TODO and WYLO .... Create the GlobalModel class and set stuff on it...
                                            console.log('TODO: Save', response.uuid, 'to local storage and navigate to GameListView...');
                                        }
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                    
                                }
                            }, '/me?fields=id,name');
                            graphRequest.start();
                        } else {
                            FBSDKLoginManager.logOut();
                        }
                    });
                }
            }
        })
    }
    
}

module.exports = new LoginChoicesModel();
