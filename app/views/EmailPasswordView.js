'use strict';

import React                from 'react-native';
import Device               from '../util/Device';
import InitialLogoView      from './InitialLogoView';
import NavBarView           from './NavBarView';
import model                from '../models/EmailLoginModel';
import EmailSetPasswordView from './EmailSetPasswordView';

let {
    Alert,
    Image,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableHighlight,
    View
} = React;

export default class EmailPasswordView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            secureText: true
        };
    }

    componentDidMount() {
        model.setNavigator(this.props.navigator);
    }

    passwordChanged(password) {
        if (!model.isFetching()) {
            model.password = password;
            this.setState({password});
        }
    }

    showUnknownError() {
        Alert.alert(
            'Hmm...',
            'Something went wrong. Check your network connection and try again.'
        );
    }

    showPasswordChanged(value) {
        this.refs.password.blur();
        this.setState({secureText: !value});
    }

    passwordSubmitted() {
        if (!model.isFetching()) {
            if (model.isPasswordValid()) {
                // TODO and WYLO .... Send the password somewhere for verification.
            } else {
                Alert.alert(
                    'Uh, yeah...',
                    "We're gonna need you to go ahead and enter a valid password. Mmmkay?",
                    [{text: 'OK', onPress: () => this.refs.password.focus()}]
                );
            }
            /*
            if (model.isEmailValid()) {
                model.checkEmailExists((create) => {
                    if (create) {
                        Alert.alert(
                            'Welcome!',
                            `Looks like you're a new player.\nShall we create an account for ${this.state.email}?`,
                        [
                            {text: 'Yes', onPress: () => model.createAccount(this.showUnknownError)},
                            {text: 'No'}
                        ]
                        );
                    } else {
                        this.showUnknownError();
                    }
                });
            }
            */
        } else {
            console.log('Alredy checking...');
        }
    }

    render() {
        var passwordAndSubmit =
            <View style={styles.container}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='default'
                    maxLength={512}
                    placeholder='Password'
                    placeholderTextColor='#777777'
                    ref='password'
                    secureTextEntry={this.state.secureText}
                    style={styles.passwordInput}
                    onChangeText={(text) => this.passwordChanged(text)}
                    onSubmitEditing={() => this.passwordSubmitted()}
                    value={this.state.password}
                />
    
                <View style={styles.showPasswordRow}>
                    <Switch
                        disabled={model.isFetching()}
                        value={!this.state.secureText}
                        onValueChange={(value) => this.showPasswordChanged(value)}
                    />
                    <Text style={styles.showPasswordText}>
                        Show Password
                    </Text>
                </View>
                
                <TouchableHighlight style={styles.highlight} underlayColor={'#777777'} onPress={() => this.passwordSubmitted()}>
                    <View style={styles.submitButton}>
                        <Text style={styles.submitText}>
                            Submit
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>;
        
        // TODO and WYLO .... You need a 'Forgot Password?' link here.
        
        return (
            <View>
                <NavBarView title='Password' navigator={this.props.navigator}/>
                <InitialLogoView hideLogo={true} subView={passwordAndSubmit}/>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    passwordInput: {
        borderColor: '#bbbbbb',
        borderWidth: 1,
        color: '#ffffff',
        height: 48,
        marginBottom: 24,
        paddingLeft: 12,
        width: Device.isIpad ? 400 : 248
    },
    highlight: {
        borderRadius: 3
    },
    submitButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#cccccc',
        borderRadius: 3,
        justifyContent: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        width: Device.isIpad ? 400 : 248
    },
    submitText: {
        color: '#3b579d',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5
    },
    showPasswordRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 60
    },
    showPasswordText: {
        color: '#ffffff',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginLeft: 8
    },
});
