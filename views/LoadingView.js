'use strict';

import React from 'react-native';

let {
    ActivityIndicatorIOS,
    StyleSheet,
    Text,
    View
} = React;

export default class LoadingView extends React.Component {

    componentWillMount() {
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
    }

}

let styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
