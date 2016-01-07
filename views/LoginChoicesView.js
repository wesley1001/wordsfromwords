'use strict';

import React from 'react-native';

let {
    Image,
    StyleSheet,
    Text,
    View
} = React;

export default class LoginChoicesView extends React.Component {
    
    render() {
        
        // TODO and WYLO .... The background and logo needs to be a reusable component.
        
        return (
            <View>
                <Text>Login Choices...</Text>
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
