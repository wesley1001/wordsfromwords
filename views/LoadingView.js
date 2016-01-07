'use strict';

import React        from 'react-native';
import Device       from '../util/Device.js';
import LoadingModel from '../models/LoadingModel.js';

let {
    Image,
    ActivityIndicatorIOS,
    StyleSheet,
    View
} = React;

let model = new LoadingModel();

export default class LoadingView extends React.Component {
    
    componentDidMount() {
        model.initialize(this.props.navigator);
    }
    
    render() {
        var logo = Device.isIpad ? <Image source={require('../images/ipad/logo.png')} /> : <Image source={require('../images/iphone/logo.png')} />;
        return (
            <View style = {styles.outer}>
                <View style={styles.backgroundWrapper}>
                    <Image style={styles.backgroundImage} source={require('../images/background.png')} />
                </View>
                <View style={styles.quartered}>
                    {logo}
                </View>
                <View style = {styles.centered}>
                    <ActivityIndicatorIOS
                        animating = {true}
                        color = 'white'
                        size = 'large'
                    />
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
