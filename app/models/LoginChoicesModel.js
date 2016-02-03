'use strict';

import FBSDKLogin       from 'react-native-fbsdklogin';
import FBSDKCore        from 'react-native-fbsdkcore';
import EmailAddressView from '../views/EmailAddressView';

let {FBSDKLoginManager} = FBSDKLogin;
//let {FBSDKAccessToken}  = FBSDKCore;

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
                    
                    // TODO and WYLO 1 .... Go through the setup options for the core so you can store the access token:
                    //                      https://github.com/facebook/react-native-fbsdk/tree/master/react-native-fbsdkcore#installation

                    // TODO and WYLO 2 .... Go through the setup options for the share so you can store the access token:
                    //                      https://github.com/facebook/react-native-fbsdk/tree/master/react-native-fbsdkshare#installation
                    
                    // TODO and WYLO 3 .... Uncomment the code below and see if it works!
                    
                    //console.log('Logging out');
                    //FBSDKAccessToken.getCurrentAccessToken((token) => {
                    //    console.log(token.tokenString);
                    //    FBSDKLoginManager.logOut();
                    //});
                }
            }
        })
    }
    
}

module.exports = new LoginChoicesModel();
