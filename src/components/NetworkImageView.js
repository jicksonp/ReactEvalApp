import React from 'react';

import {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ProgressBarAndroid,
} from 'react-native';

const styles = StyleSheet.create({
    progress: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    profile: {
        width: 200,
        height: 200,
        marginBottom: 8,
    },
});

class NetworkImageView extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            error: false,
            loading: true,
        };
    }

    render() {
        console.log('render', this.state);

        const loader = this.state.loading ?
            <View style={styles.progress}>
                <ProgressBarAndroid style={{ marginLeft: 5 }}/>
            </View> : null;

        if (this.state.error) {
            return (
                <Text>{this.state.error}</Text>
            );
        } else {
            return (
                <Image
                    onError={(e) => this.setState({error: e.nativeEvent.error, loading: false})}
                    onLoad={() => this.setState({loading: false, error: false})}
                    source={this.props.source}
                    style={[styles.profile, { overflow: 'visible' }]}>
                    {loader}
                </Image>
            );
        }
    }

}

export default NetworkImageView;
