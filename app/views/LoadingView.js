'use strict';

import React            from 'react-native';
import InitialLogoView  from './InitialLogoView'
import LoginChoicesView from '../views/LoginChoicesView';
import LoadingModel     from '../models/LoadingModel';

let {
    Image,
    ActivityIndicatorIOS,
    View
} = React;

let model = new LoadingModel();

export default class LoadingView extends React.Component {
    
    componentDidMount() {
        model.setLoginChoicesView(LoginChoicesView);
        model.initialize(this.props.navigator);
    }
    
    render() {
        var spinner = <ActivityIndicatorIOS animating={true} color='white' size='large'/>;
        return (
            <InitialLogoView subView={spinner}/>
        );
    }
    
}
