'use strict';

import React from 'react-native';
import Device from '../util/device.js';

let {
    Image,
    Dimensions,
    ActivityIndicatorIOS,
    StyleSheet,
    Text,
    View
} = React;

export default class LoadingView extends React.Component {

    componentWillMount() {
        console.log('On an iPad:', Device.isIpad);
        /*
        setTimeout(() => {
            console.log('Replacing route...');
            this.props.navigator.replace({component: LoadingView});
        }, 1000);
        */
    }

    componentWillUnmount() {
        console.log('Umnounting');
    }

    render() {
        return (
            <View style = {styles.outer}>
                {/*
                <View style={styles.backgroundWrapper}>
                    <Image style={styles.backgroundImage} source={require('../background.png')} />
                </View>
                */}
                <View style={styles.quartered}>
                    <Image source={require('../test.png')} />
                </View>
                <View style = {styles.centered}>
                    <ActivityIndicatorIOS
                        animating = {true}
                        //color = 'white'
                        size = 'large'
                    />
                </View>
            </View>
        );
        /*
        return (
            <View style = {styles.centered}>
                <Text>
                    Loading...
                </Text>
                <ActivityIndicatorIOS
                    animating = {true}
                    size = {this.props.size}
                />
            </View>
        );
        */
    }

}

let {width, height} = Dimensions.get('window');

let styles = StyleSheet.create({
    outer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    backgroundWrapper: {
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0
    },
    backgroundImage: {
        resizeMode: 'contain'
    },
    quartered: {
        backgroundColor: 'blue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        backgroundColor: 'white',
        flex: 1
    }
});
