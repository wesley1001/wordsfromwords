'use strict';

import React           from 'react-native';
import Device          from '../util/Device';
import InitialLogoView from './InitialLogoView';
import NavBarView      from './NavBarView';
import model           from '../models/EmailLoginModel';

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

export default class EmailSetPasswordView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            password1: '',
            password2: '',
            secureText: true
        };
    }

    componentDidMount() {
        Alert.alert(
            'Security stuff...',
            "We've emailed you a code. Tap 'OK' to enter the code and set a password.",
            [{text: 'OK', onPress: () => this.refs.code1.focus()}]
        );
    }
    
    code1Changed(code1) {
        if (!model.isFetching()) {
            model.code1 = code1;
            this.setState({code1});
            if (code1.length == 3) {
                this.refs.code2.focus();
            }
        }
    }

    code2Changed(code2) {
        if (!model.isFetching()) {
            model.code2 = code2;
            this.setState({code2});
            if (code2.length == 3) {
                this.refs.code3.focus();
            }
        }
    }

    code3Changed(code3) {
        if (!model.isFetching()) {
            model.code3 = code3;
            this.setState({code3});
            if (code3.length == 3) {
                this.refs.code4.focus();
            }
        }
    }

    code4Changed(code4) {
        if (!model.isFetching()) {
            model.code4 = code4;
            this.setState({code4});
            if (code4.length == 3) {
                this.refs.password1.focus();
            }
        }
    }
    
    password1Changed(password1) {
        if (!model.isFetching()) {
            model.password1 = password1;
            this.setState({password1});
        }
    }

    password2Changed(password2) {
        if (!model.isFetching()) {
            model.password2 = password2;
            this.setState({password2});
        }
    }
    
    showPasswordsChanged(value) {
        this.refs.password1.blur();
        this.refs.password2.blur();
        this.setState({secureText: !value});
    }

    submitTapped() {
        console.log('Submitting code and passwords...');
    }
    
    render() {
        var emailAndNext =
        <View>
            <View style={styles.codeRow}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='numeric'
                    maxLength={3}
                    ref='code1'
                    style={styles.codeInput}
                    onChangeText={(text) => this.code1Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    value={this.state.code1}
                />
                <TextInput
                    autoCapitalize='none'
                    autoFocus={false}
                    keyboardType='numeric'
                    maxLength={3}
                    ref='code2'
                    style={[styles.codeInput, styles.codeInputSecond]}
                    onChangeText={(text) => this.code2Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    value={this.state.code2}
                />
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='numeric'
                    maxLength={3}
                    ref='code3'
                    style={[styles.codeInput, styles.codeInputThird]}
                    onChangeText={(text) => this.code3Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    value={this.state.code3}
                />
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='numeric'
                    maxLength={3}
                    ref='code4'
                    style={styles.codeInput}
                    onChangeText={(text) => this.code4Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    value={this.state.code4}
                />
            </View>
            
            <View>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='default'
                    maxLength={512}
                    placeholder='Password'
                    placeholderTextColor='#777777'
                    ref='password1'
                    secureTextEntry={this.state.secureText}
                    style={styles.passwordInput}
                    onChangeText={(text) => this.password1Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    value={this.state.password1}
                />
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='default'
                    maxLength={512}
                    placeholder='Confirm'
                    placeholderTextColor='#777777'
                    ref='password2'
                    secureTextEntry={this.state.secureText}
                    style={styles.passwordInput}
                    onChangeText={(text) => this.password2Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    value={this.state.password2}
                />
            </View>

            <View style={styles.showPasswordsRow}>
                <Switch
                    disabled={model.isFetching()}
                    value={!this.state.secureText}
                    onValueChange={(value) => this.showPasswordsChanged(value)}
                />
                <Text style={styles.showPasswordsText}>
                    Show Passwords
                </Text>
            </View>
            
            <TouchableHighlight style={styles.highlight} underlayColor={'#777777'} onPress={() => this.submitTapped()}>
                <View style={styles.submitButton}>
                    <Text style={styles.submitText}>
                        Submit
                    </Text>
                </View>
            </TouchableHighlight>
        </View>;

        return (
            <View>
                <NavBarView title='Code & Password' navigator={this.props.navigator}/>
                <InitialLogoView hideLogo={true} subView={emailAndNext}/>
            </View>
        );
    }
    
}

let styles = StyleSheet.create({
    codeRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Device.isIpad ? 100 : 50,
        marginBottom: 60,
        width: Device.isIpad ? 400 : 248
    },
    codeInput: {
        flex: 1,
        borderColor: '#bbbbbb',
        borderWidth: 1,
        color: '#ffffff',
        height: 48,
        textAlign: 'center'
    },
    codeInputSecond: {
        marginLeft: 4,
        marginRight: 2
    },
    codeInputThird: {
        marginLeft: 2,
        marginRight: 4
    },
    passwordInput: {
        borderColor: '#bbbbbb',
        borderWidth: 1,
        color: '#ffffff',
        height: 48,
        marginBottom: 18,
        paddingLeft: 12,
        width: Device.isIpad ? 400 : 248
    },
    showPasswordsRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 60
    },
    showPasswordsText: {
        color: '#ffffff',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginLeft: 8
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
    }
});
