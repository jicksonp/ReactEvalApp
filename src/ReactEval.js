import React from 'react';

import {
  Component,
  Navigator,
  BackAndroid,
} from 'react-native';

import store from './store/ReactEvalStore';
import BarcodeList from './barcodelist/BarcodeList.js';
import BarcodeScannerScreen from './barcodescanner/BarcodeScanner';

class ReactTodo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = store.getState();
        store.subscribe(() => {
            // Below comment is used to remove the lint warning.
            // Do this only when you are sure that you are calling set state using redux store.
            this.setState(store.getState()); // eslint-disable-line react/no-set-state
        });
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.backButtonEventListener.bind(this));
    }

    backButtonEventListener() {
        const noOfRoutes = this.nav.getCurrentRoutes().length;
        let status;
        if (noOfRoutes > 1) {
            this.nav.pop();
            status = true;
        } else {
            status = false;
        }
        return status;
    }

    onScanQrCodePressed() {
        console.log('onScanQrCodePressed');
        this.nav.push({
            name: 'qrscanner',
        });
    }

    onQrCodeRead(qrcode) {
        console.log('QRCODE IS:', qrcode);
        this.nav.pop();
        store.dispatch({
            type: 'ADD_QR_CODE',
            qrcode,
        });
    }

    renderScene(route, navigator) {
        switch (route.name) {
        case 'qrscanner':
            return (
                <BarcodeScannerScreen
                    onQrCodeRead={this.onQrCodeRead.bind(this)}
                />
            );
        default:
            return (
                <BarcodeList
                    barcodes={this.state.barcodes}
                    onScanQrCodePressed={this.onScanQrCodePressed.bind(this)}
                />
            );
        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                initialRoute={{ name: 'tasklist', index: 0 }}
                ref={((nav) => {
                    this.nav = nav;
                })}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }
}

function setup() {
    return ReactTodo;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;
