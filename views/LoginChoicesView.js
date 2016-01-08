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
        borderRadius: 4,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 48,
        paddingRight: 48
    },
    fbLogo: {
        flex: 1
    },
    fbText: {
        flex: 1,
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginLeft: 16
    },
    
    outer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundWrapper: {
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0
    },
    backgroundImage: {
        resizeMode: 'contain'
    },
    quartered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        flex: 1
    }
});
