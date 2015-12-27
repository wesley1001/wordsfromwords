'use strict';

import React from 'react-native';

let {
    ActivityIndicatorIOS,
    StyleSheet,
    Text,
    View
} = React;

export default class LoadingView extends React.Component {

    render() {
        return (
            <View style = {styles.centered}>
                <Text>
                    Loading...
                </Text>
                <ActivityIndicatorIOS
                    animating = {true}
                    size = 'large'
                />
            </View>
        );
    }

}

let styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
