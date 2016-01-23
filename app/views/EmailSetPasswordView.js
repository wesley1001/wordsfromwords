'use strict';

import React           from 'react-native';
import Device          from '../util/Device';
import InitialLogoView from './InitialLogoView';
import model           from '../models/EmailLoginModel';

let {
    Alert,
    Image,
    StyleSheet,
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
            showPassword: false
        };
    }

    componentDidMount() {
        // TODO and WYLO .... Show the 'Security stuff...' alert
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
        console.log('code2 is:', code2);
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
                    autoFocus={false}
                    keyboardType='numeric'
                    maxLength={3}
                    ref='code1'
                    style={styles.codeInput}
                    onChangeText={(text) => this.code1Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    //value={this.state.code1}
                />
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={false}
                    keyboardType='numeric'
                    maxLength={3}
                    ref='code2'
                    style={styles.codeInput}
                    onChangeText={(text) => this.code2Changed(text)}
                    //onSubmitEditing={() => this.emailSubmitted()}
                    //value={this.state.code2}
                />
            </View>
            <TouchableHighlight style={styles.highlight} underlayColor={'#777777'} onPress={() => this.submitTapped()}>
                <View style={styles.nextButton}>
                    <Text style={styles.submitText}>
                        Submit
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
    codeRow: {
        flex: 1,
        flexDirection: 'row'
    },
    codeInput: {
        borderColor: '#bbbbbb',
        borderWidth: 1,
        color: '#ffffff',
        height: 48,
        marginBottom: 24,
        marginLeft: 2,
        marginRight: 2,
        //paddingLeft: 12,
        textAlign: 'center',
        width: 55
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
        width: Device.isIpad ? 400 : 250
    },
    submitText: {
        color: '#3b579d',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5
    }
});
