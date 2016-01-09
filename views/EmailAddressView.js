'use strict';

import React           from 'react-native';
import Device          from '../util/Device';
import InitialLogoView from './InitialLogoView';
import model           from '../models/EmailLoginModel';

let {
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
    
    emailChanged(email) {
        model.email = email;
        this.setState({email});
    }
    
    emailSubmitted() {
        if (model.isEmailValid()) {
            console.log('Sending', this.state.email, 'to the server...');
        } else {
            // TODO and WYLO .... Show an alert.
            console.log('Invalid email...');
        }
    }
    
    render() {
        var emailAndNext = 
            <View>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    maxLength={256}
                    placeholder='Email Address'
                    placeholderTextColor='#777777'
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
            <InitialLogoView subView={emailAndNext}/>
        );
    }
    
}

let styles = StyleSheet.create({
    emailInput: {
        borderColor: '#bbbbbb',
        borderWidth: 1,
        color: '#ffffff',
        height: 48,
        marginBottom: 24,
        paddingLeft: 12,
        width: 400
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
        paddingTop: 16,
        paddingBottom: 16,
        width: Device.isIpad ? 400 : 250
    },
    nextText: {
        color: '#3b579d',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5
    }
});
