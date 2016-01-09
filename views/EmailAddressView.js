'use strict';

import React           from 'react-native';
import Device          from '../util/Device';
import InitialLogoView from './InitialLogoView';

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
        // TODO .... Set the email address on the EmailLoginModel
        console.log('email is', email);
        this.setState({email});
    }
    
    enterPressed() {
        console.log('enter was pressed...sending', this.state.email, 'to the server');
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
                    onSubmitEditing={() => this.enterPressed()}
                    value={this.state.email}
                />
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
        paddingLeft: 12,
        width: 400
    }
});
