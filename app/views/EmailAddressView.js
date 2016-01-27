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
    Text,
    TextInput,
    TouchableHighlight,
    View
} = React;

export default class EmailAddressView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: ''};
    }

    componentDidMount() {
        model.setNavigator(this.props.navigator);
        model.setEmailSetPasswordView(EmailSetPasswordView);
    }
    
    emailChanged(email) {
        if (!model.isFetching()) {
            model.email = email;
            this.setState({email});
        }
    }
    
    showUnknownError() {
        Alert.alert(
            'Hmm...',
            "Something went wrong. Check your network connection and try again."
        );
    }
    
    emailSubmitted() {
        if (!model.isFetching()) {
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
            } else {
                Alert.alert(
                    'Uh, yeah...',
                    "We're gonna need you to go ahead and enter a valid email address. Mmmkay?",
                    [{text: 'OK', onPress: () => this.refs.email.focus()}]
                );
            }
        } else {
            console.log('Alredy checking...');
        }
    }
    
    render() {
        var emailAndNext = 
            <View style={styles.container}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    maxLength={256}
                    placeholder='Email Address'
                    placeholderTextColor='#777777'
                    ref='email'
                    style={styles.emailInput}
                    onChangeText={(text) => this.emailChanged(text)}
                    onSubmitEditing={() => this.emailSubmitted()}
                    value={this.state.email}
                />
                <TouchableHighlight style={styles.highlight} underlayColor={'#777777'} onPress={() => this.emailSubmitted()}>
                    <View style={styles.nextButton}>
                        <Text style={styles.nextText}>
                            Next
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>;

        return (
            <View>
                <NavBarView title='Email' navigator={this.props.navigator}/>
                <InitialLogoView hideLogo={true} subView={emailAndNext}/>
            </View>
        );
    }
    
}

let styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    emailInput: {
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
    nextButton: {
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
    nextText: {
        color: '#3b579d',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5
    }
});
