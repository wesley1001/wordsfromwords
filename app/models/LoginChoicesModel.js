'use strict';

import FBSDKLogin       from 'react-native-fbsdklogin';
import FBSDKCore        from 'react-native-fbsdkcore';
import EmailAddressView from '../views/EmailAddressView';

let {FBSDKLoginManager} = FBSDKLogin;
let {
    FBSDKAccessToken,
    FBSDKGraphRequest
} = FBSDKCore;

class LoginChoicesModel {
    
    initialize(navigator) {
        this.navigator = navigator;
    }
    
    tryEmailLogin() {
        this.navigator.push({component: EmailAddressView});
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
                    console.log('Logged in! Result:', result);
                    
                    /*
                        This is what the result looked like:

                        {
                            isCancelled: false,
                            declinedPermissions: [],
                            grantedPermissions: ['public_profile']
                        }
                        
                     */
                    
                    FBSDKAccessToken.getCurrentAccessToken((token) => {
                        if (token && token.tokenString) {
                            console.log('Got a token...');
                            console.log(token.tokenString);
                            var graphRequest = new FBSDKGraphRequest((graphError, result) => {
                                if (graphError) {
                                    alert('Error making graph request:', graphError);
                                } else {
                                    // Data from request is in result
                                    console.log('Result of graph request:', result);
                                }
                            }, '/me?fields=id,name');
                            graphRequest.start();
                        } else {
                            console.log('Logging out...');
                            FBSDKLoginManager.logOut();
                        }
                    });
                }
            }
        })
    }
    
}

module.exports = new LoginChoicesModel();
