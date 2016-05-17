import React from 'react';

import {
  Component,
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  ListView,
  PropTypes,
  ProgressBarAndroid as ProgressBar,
} from 'react-native';

import ActionButton from 'react-native-action-button';

import * as GLOBAL from '../utils/Globals';
import QRcodeRow from '../components/QRcodeRow';

const styles = StyleSheet.create({
    container: {
        backgroundColor: GLOBAL.COLOR.BACKGROUND,
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 16,
    },
    loading:{
        justifyContent: 'center',
    }
});

class BarcodeList extends Component {

    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.barcodes),
            isLoaded: props.isLoaded,
        };

    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this
            .state
            .dataSource
            .cloneWithRows(nextProps.barcodes);

        console.log('componentWillReceiveProps ',nextProps);

        // Below comment is used to remove the lint warning.
        // Do this only when you are sure that you are calling set state using redux store.
        this.setState({
            dataSource,
            isLoaded: nextProps.isLoaded,
        }); // eslint-disable-line react/no-set-state
    }

    renderRow(barcode) {
        return (
            <QRcodeRow
                barcode={barcode}
            />
        );
    }

    static contextTypes = {
        navigator: PropTypes.object.isRequired
    };



    render() {
        const { navigator } = this.context;

        if(this.state.isLoaded){
            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        onPress={this.props.onScanQrCodePressed}
                    />
                </View>
            );
        }else{
            //TODO Show loading...
            return(
                <View style={[styles.container,styles.loading]}>
                    <ProgressBar />
                </View>
            );
        }
    }
}

BarcodeList.propTypes = {
    barcodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onScanQrCodePressed: React.PropTypes.func.isRequired,
};
export default BarcodeList;
