import React from 'react';

import {
  Component,
  View,
  Text,
  ProgressBarAndroid as ProgressBar,
  StyleSheet,
} from 'react-native';


import * as GLOBAL from '../utils/Globals';

import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

class MapScreen extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
          <MapView
            style={ styles.map }
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        );
    }
}

export default MapScreen;
