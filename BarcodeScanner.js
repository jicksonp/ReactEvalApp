import React from 'react';

import {
  Component,
} from 'react-native';

import BarcodeScanner from 'react-native-barcodescanner';

class BarcodeScannerScreen extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            torchMode: 'off',
            cameraType: 'back',
        };
    }

    barcodeReceived(e) {
        console.log('Barcode: ' + e.data);
        console.log('Type: ' + e.type);
    }

    render() {
        return (
          <BarcodeScanner
              cameraType={this.state.cameraType}
              onBarCodeRead={this.barcodeReceived}
              style={{ flex: 1 }}
              torchMode={this.state.torchMode}
          />
        );
    }
}

export default BarcodeScannerScreen;
