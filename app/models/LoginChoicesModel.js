'use strict';

import FBSDKLogin       from 'react-native-fbsdklogin';
import FBSDKCore        from 'react-native-fbsdkcore';
import EmailAddressView from '../views/EmailAddressView';
import Env              from '../util/Env';

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
                        This is what the result looks like:

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
                                        //this._fetching = false;
                                        if (!response || !response.uuid || response.error) {
                                            console.log('Error:', response.error);
                                            //callback();
                                        } else {
                                            
                                            // TODO and WYLO .... Now that you have email/fb account creation working, get /api/mobile/relogin working.
                                            
                                            console.log('TODO: Save', response.uuid, 'to local storage and navigate to GameListView...');
                                            //this._uuid = response.uuid;
                                            //this.navigator.push({component: this.emailSetPasswordView});
                                        }
                                    }).catch((error) => {
                                        console.log(error);
                                        //this._fetching = false;
                                        //callback();
                                    });
                                    
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
