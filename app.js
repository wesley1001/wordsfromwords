'use strict';

import React       from 'react-native';
import LoadingView from './views/LoadingView';

let {
    Navigator
} = React;

export default class App extends React.Component {

    render() {
        return (
            <Navigator
                initialRoute = {{component: LoadingView}}
                renderScene = {(route, navigator) => React.createElement(route.component, {navigator, size: 'small'})}
            />
        );
    }

}
