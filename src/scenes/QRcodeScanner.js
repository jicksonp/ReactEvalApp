import React from 'react';

import {
  Component,
} from 'react-native';

import BarcodeScanner from 'react-native-barcodescanner';

class QRcodeScanner extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            torchMode: 'off',
            cameraType: 'back',
        };
    }

    //This modification is done to ignore multiple callbacks
    barcodeReceived = (function() { //TODO why lint shows error here?
        var executed = false;
        return function (e) {
            if (!executed) {
                executed = true;
                console.log('Barcode: ' + e.data,'Type: ' + e.type);
                this.props.onQrCodeRead(e.data);
            }
        };
    })();

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


QRcodeScanner.propTypes = {
    onQrCodeRead: React.PropTypes.func.isRequired,
};


export default QRcodeScanner;
