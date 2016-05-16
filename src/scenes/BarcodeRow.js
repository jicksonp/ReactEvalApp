import React from 'react';

import {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as GLOBAL from '../utils/Globals';
import { toDateString } from '../utils/Utils';

const styles = StyleSheet.create({
    container: {
        backgroundColor: GLOBAL.COLOR.BACKGROUND,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        borderRadius: 2,
        padding: 8,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginLeft: 16,
        marginRight: 16,
    },
    barcode_label: {
        fontSize: 16,
        fontWeight: '400',
    },
    barcode_time_container: {
        flex: 1,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    barcode_time: {
        fontSize: 12,
        fontWeight: '200',
    },
});

class BarcodeRow extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.barcode_label}>
                    {this.props.barcode.code}
                </Text>
                <View style={styles.barcode_time_container}>
                    <Text style={styles.barcode_time}>
                        {toDateString(this.props.barcode.time)}
                    </Text>
                </View>
            </View>
        );
    }
}

BarcodeRow.propTypes = {
    barcode: React.PropTypes.shape({
        code: React.PropTypes.string.isRequired,
        time: React.PropTypes.number.isRequired,
    }).isRequired,
};

export default BarcodeRow;
