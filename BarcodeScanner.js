import React from 'react';

import {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: '300',
    },
});

class BarcodeScanner extends Component {
    render() {
        return (
            <View>
                <Text>
                    Hello scanner
                </Text>
            </View>
        );
    }
}

export default BarcodeScanner;
