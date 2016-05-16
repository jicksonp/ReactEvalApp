import React from 'react';

import {
  Component,
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  ListView,
  StatusBar,
} from 'react-native';

import RColors from '../utils/RColors';
import BarcodeRow from './BarcodeRow';

const styles = StyleSheet.create({
    container: {
        backgroundColor: RColors.background,
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderRadius: 2,
        backgroundColor: RColors.primary,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: RColors.textIcon,
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

        // TODO change this logic
        const barcodes = [];
        for (let i = 0; i < 100; i++) {
            barcodes.push(
                {
                    code: 'Barcode 1',
                    time: new Date().getTime(),
                }
            );
        }

        this.state = {
            dataSource: ds.cloneWithRows(barcodes),
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
                <StatusBar
                    backgroundColor="#455A64"
                    barStyle="light-content"
                />
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
