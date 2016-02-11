'use strict';

import React             from 'react-native';
import Device            from '../util/Device';
import model             from '../models/LoginChoicesModel';
import InitialLogoView   from './InitialLogoView';

let {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = React;

export default class LoginChoicesView extends React.Component {

    componentDidMount() {
        model.initialize(this.props.navigator);
    }
    
    fbButtonPressed() {
        model.tryFacebookLogin();
    }
    
    emailButtonPressed() {
        model.tryEmailLogin();
    }
    
    render() {
        var fbIcon = null;
        var emailIcon = null;
        
        if (Device.isIpad) {
            fbIcon = <Image source={require('../images/ipad/fbLogo.png')} />;
            emailIcon = <Image source={require('../images/ipad/email.png')} />;
        } else {
            fbIcon = <Image source={require('../images/iphone/fbLogo.png')}/>;
            emailIcon = <Image source={require('../images/iphone/email.png')}/>;
        }
        
        var loginChoices = 
            <View>
                <TouchableHighlight style={styles.highlight} underlayColor={'#617dc4'} onPress={this.fbButtonPressed}>
                    <View style={styles.fbButton}>
                        {fbIcon}
                        <Text style={styles.fbText}>
                            Sign in with Facebook
                        </Text>
                    </View>
                </TouchableHighlight>
                
                <TouchableHighlight style={styles.highlight} underlayColor={'#777777'} onPress={this.emailButtonPressed}>
                    <View style={styles.emailButton}>
                        {emailIcon}
                        <Text style={styles.emailText}>
                            Sign in with Email
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
    highlight: {
        borderRadius: 3,
        marginBottom: 24
    },
    fbButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b579d',
        borderRadius: 3,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: Device.isIpad ? 48 : 12,
        width: Device.isIpad ? 400 : 248
    },
    fbText: {
        color: '#ffffff',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginLeft: Device.isIpad ? 16 : 11
    },
    emailButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#cccccc',
        borderRadius: 3,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: Device.isIpad ? 48 : 12,
        width: Device.isIpad ? 400 : 248
    },
    emailText: {
        color: '#3b579d',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginLeft: Device.isIpad ? 16 : 11
    }
});
