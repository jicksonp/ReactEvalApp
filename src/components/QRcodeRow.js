import React from 'react';

import {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
    Card,
} from 'react-native-material-design';

import * as GLOBAL from '../utils/Globals';
import { toDateString } from '../utils/Utils';

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
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
            <Card>
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
            </Card>
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
