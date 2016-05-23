import React from 'react';

import {
   StyleSheet,
   PropTypes,
   View,
   Text,
   Dimensions,
   TouchableOpacity,
   Animated,
   Platform,
   Component,
} from 'react-native';


import * as GLOBAL from '../utils/Globals';

import MapView from 'react-native-maps';


var screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE =  28.4593299;
const LONGITUDE = 77.0769338;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


var styles = StyleSheet.create({
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
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

let id = 0;

function randomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

class MapScreen extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [
                {
                  coordinate: { longitude: 77.0769338, latitude: 28.4593299 },
                  key: id++,
                  color: randomColor(),
                },
                {
                  coordinate: { longitude: 77.043689, latitude: 28.446333 },
                  key: id++,
                  color: randomColor(),
                },
            ],
        };

    }

onMapPress(e) {
    console.log(' e.nativeEvent.coordinate', e.nativeEvent.coordinate);
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress.bind(this)}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Tap to create a marker of random color</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default MapScreen;
