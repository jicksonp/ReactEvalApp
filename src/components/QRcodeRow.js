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
    qrcode_label: {
        fontSize: 16,
        fontWeight: '400',
    },
    qrcode_time_container: {
        flex: 1,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    qrcode_time: {
        fontSize: 12,
        fontWeight: '200',
    },
});

class QRcodeRow extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.qrcode_label}>
                    {this.props.qrcode.code}
                </Text>
                <View style={styles.qrcode_time_container}>
                    <Text style={styles.qrcode_time}>
                        {toDateString(this.props.qrcode.time)}
                    </Text>
                </View>
            </View>
        );
    }
}

QRcodeRow.propTypes = {
    qrcode: React.PropTypes.shape({
        code: React.PropTypes.string.isRequired,
        time: React.PropTypes.number.isRequired,
    }).isRequired,
};

export default QRcodeRow;
