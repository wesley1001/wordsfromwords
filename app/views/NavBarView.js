'use strict';

import React  from 'react-native';
import Device from '../util/Device';

let {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = React;

export default class NavBarView extends React.Component {

    constructor(props) {
        super(props);
    }
    
    backPressed() {
        this.props.navigator.pop();
    }
    
    render() {
        var backArrow = Device.isIpad ? <Image style={styles.arrow} source={require('../images/ipad/backArrow.png')} /> : <Image style={styles.arrow} source={require('../images/iphone/backArrow.png')}/>;
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor={'#4176a7'} onPress={() => this.backPressed()}>
                    <View>
                        <View style={styles.button}>
                            {backArrow}
                            <Text style={styles.backText}>Back</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
    
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4176a7',
        height: 48,
        position: 'absolute',
        left: 0,
        top: 0,
        width: 3500
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginRight: 16
    },
    arrow: {
        marginLeft: 8
    },
    backText: {
        color: '#ffffff',
        fontSize: Device.isIpad ? 20 : 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginLeft: 6
    },
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

