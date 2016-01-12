'use strict';

import React  from 'react-native';
import Device from '../util/Device';

let {
    Image,
    View,
    StyleSheet
} = React;

export default class InitialLogoView extends React.Component {

    render() {
        var logo = Device.isIpad ? <Image source={require('../images/ipad/logo.png')} /> : <Image source={require('../images/iphone/logo.png')} />;
        return (
            <View style={styles.outer}>
                <View style={styles.backgroundWrapper}>
                    <Image style={styles.backgroundImage} source={require('../images/background.png')} />
                </View>
                <View style={styles.quartered}>
                    {logo}
                </View>
                <View style={styles.centered}>
                    {this.props.subView}
                </View>
            </View>
        );
    }
    
}

let styles = StyleSheet.create({
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