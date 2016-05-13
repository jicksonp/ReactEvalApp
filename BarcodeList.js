import React from 'react';

import {
  Component,
  View,
  StyleSheet,
  Text,
} from 'react-native';


const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start',
    },
});

class BarcodeList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Hello world</Text>
            </View>
        );
    }

}
export default BarcodeList;
