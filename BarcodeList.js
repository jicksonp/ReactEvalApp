import React from 'react';

import {
  Component,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView,
} from 'react-native';

import BarcodeRow from './BarcodeRow/Component';

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600',
    },
});

class BarcodeList extends Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.barcodes),
        };
    }

    renderRow(barcode) {
        return (
            <BarcodeRow
                barcode={barcode}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    onPress={this.props.onScanQrCodePressed}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Scan QR Code
                    </Text>
                </TouchableHighlight>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

BarcodeList.propTypes = {
    barcodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onScanQrCodePressed: React.PropTypes.func.isRequired,
};
export default BarcodeList;
