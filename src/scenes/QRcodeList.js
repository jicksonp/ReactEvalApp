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
  Platform,
} from 'react-native';

import ActionButton from 'react-native-action-button';

import * as GLOBAL from '../utils/Globals';
import QRcodeRow from '../components/QRcodeRow';

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

const styles = StyleSheet.create({
    container: {
        backgroundColor: GLOBAL.COLOR.BACKGROUND,
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
    },
    loading:{
        justifyContent: 'center',
    }
});

class QRcodeList extends Component {

    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.qrcodes),
            isLoaded: props.isLoaded,
        };

    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this
            .state
            .dataSource
            .cloneWithRows(nextProps.qrcodes);

        //console.log('componentWillReceiveProps ',nextProps);

        // Below comment is used to remove the lint warning.
        // Do this only when you are sure that you are calling set state using redux store.
        this.setState({
            dataSource,
            isLoaded: nextProps.isLoaded,
        }); // eslint-disable-line react/no-set-state
    }

    renderRow(qrcode) {
        return (
            <QRcodeRow
                qrcode={qrcode}
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
                        pageSize={LIST_VIEW_PAGE_SIZE}
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

QRcodeList.propTypes = {
    qrcodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onScanQrCodePressed: React.PropTypes.func.isRequired,
};
export default QRcodeList;
