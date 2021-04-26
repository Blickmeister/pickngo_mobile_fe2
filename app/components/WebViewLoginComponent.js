import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

class WebViewLoginComponent extends Component {
    webview = null;

    handleWebViewNavigationStateChange = newNavState => {
        const { url } = newNavState;
        if (!url) return;

        if (url.includes('home')) {
            this.webview.stopLoading();
            navigation.navigate('Order');
            // maybe close this view?
        }
    };

    render() {
        return (
            <WebView
                ref={ref => (this.webview = ref)}
                source={{ uri: 'http://192.168.100.12:8080/ingredient' }}
                style={{ margin: 20}}
                onNavigationStateChange={this.handleWebViewNavigationStateChange}
            />
        );
    }
}

export default WebViewLoginComponent;
