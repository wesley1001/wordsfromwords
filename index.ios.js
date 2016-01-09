/**
 * Words From Words
 */

'use strict';

import React from 'react-native';
import App   from './app';

let {
    AppRegistry
} = React;

let WordsFromWords = React.createClass({

    render() {
        return <App/>;
    }

});

AppRegistry.registerComponent('WordsFromWords', () => WordsFromWords);
