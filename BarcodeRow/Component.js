import React from 'react';

import {
  Component,
  StyleSheet,
} from 'react-native';

import Render from './Render';

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

class BarcodeRow extends Component {
    render() {
        return Render.bind(this)(styles);
    }
}

BarcodeRow.propTypes = {
    barcode: React.PropTypes.shape({
        code: React.PropTypes.string.isRequired,
    }).isRequired,
};

export default BarcodeRow;
