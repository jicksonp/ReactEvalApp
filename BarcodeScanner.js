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
        this.props.onQrCodeRead(e.data);
    }

    render() {
        return (
          <BarcodeScanner
              cameraType={this.state.cameraType}
              onBarCodeRead={this.barcodeReceived.bind(this)}
              style={{ flex: 1 }}
              torchMode={this.state.torchMode}
          />
        );
    }
}


BarcodeScannerScreen.propTypes = {
    onQrCodeRead: React.PropTypes.func.isRequired,
};


export default BarcodeScannerScreen;
