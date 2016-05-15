import React from 'react';

import {
  Component,
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  ListView,
} from 'react-native';

import BarcodeRow from './BarcodeRow';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderRadius: 2,
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 16,
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

    componentWillReceiveProps(nextProps) {
        const dataSource = this
            .state
            .dataSource
            .cloneWithRows(nextProps.barcodes);
        // Below comment is used to remove the lint warning.
        // Do this only when you are sure that you are calling set state using redux store.
        this.setState({ dataSource }); // eslint-disable-line react/no-set-state
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
                <TouchableNativeFeedback
                    onPress={this.props.onScanQrCodePressed}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Scan QR Code
                        </Text>
                    </View>
                </TouchableNativeFeedback>
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
