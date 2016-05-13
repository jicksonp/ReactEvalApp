import React from 'react';

import {
  Text,
  View,
} from 'react-native';

export default function render(styles) {
    return (
        <View style={styles.container}>
            <Text
                style={styles.label}
            >
                {this.props.barcode.code}
            </Text>
        </View>
    );
}
