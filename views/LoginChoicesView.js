'use strict';

import React           from 'react-native';
import Device          from '../util/Device';
import InitialLogoView from './InitialLogoView'

let {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} = React;

export default class LoginChoicesView extends React.Component {
    
    fbButtonPressed() {
        console.log('the facebook button was pressed');
    }
    
    render() {
        var fbLogo = null;
        var emailLogo = null;
        
        // TODO and WYLO .... Pick an email logo, then create a 'Sign in with Email' button.
        
        if (Device.isIpad) {
            fbLogo = <Image source={require('../images/ipad/fbLogo.png')} />
        } else {
            fbLogo = <Image source={require('../images/iphone/fbLogo.png')}/>;
        }
        
        var loginChoices = 
            <View>
                <TouchableHighlight style={styles.fbHighlight} underlayColor={'#617dc4'}>
                    <View style={styles.fbButton}>
                        {fbLogo}
                        <Text style={styles.fbText}>
                            Sign in with Facebook
                        </Text>
                    </View>
                </TouchableHighlight>
                
            </View>;
        
        return (
            <InitialLogoView subView={loginChoices}/>
        );
    }
    
}

let styles = StyleSheet.create({
    fbHighlight: {
        borderRadius: 4
    },
    fbButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b579d',
        borderRadius: 3,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: Device.isIpad ? 48 : 12,
        paddingRight: Device.isIpad ? 48 : 12
    },
    fbLogo: {
        flex: 1
    },
    fbText: {
        flex: 1,
        color: '#ffffff',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginLeft: Device.isIpad ? 16 : 11
    }
});
