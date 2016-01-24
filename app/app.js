'use strict';

import React       from 'react-native';
import LoadingView from './views/LoadingView';

let {
    Navigator
} = React;

export default class App extends React.Component {
    
    render() {
        var navigator = (
            <Navigator
                initialRoute={{component: LoadingView}}
                configureScene={(route) => {
                    if (route.component === LoadingView) {
                        return Navigator.SceneConfigs.FloatFromBottom;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => React.createElement(route.component, {navigator})}
            />
        );
        return navigator;
    }
    
}
