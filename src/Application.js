import React from 'react';
import {
	AppRegistry,
	Component,
	Navigator,
	DrawerLayoutAndroid,
	ScrollView,
	View,
	Text,
	Dimensions,
	StatusBar,
} from 'react-native';

import Navigate from './utils/Navigate';
import { Toolbar } from './components';
import Navigation from './scenes/Navigation';
import store from './stores/ReactEvalStore';
import * as GLOBAL from './utils/Globals';

const Firebase = require('firebase');

class Application extends Component {

	static childContextTypes = {
		drawer: React.PropTypes.object,
		navigator: React.PropTypes.object
	};

	constructor(props) {
		super(props);
		this.itemsRef = this.getRef().child(GLOBAL.FIREBASE_KEY);
		this.state = {
			drawer: null,
			navigator: null,
			qrcodes: store.getState().qrcodes,
		};
        store.subscribe(() => {
            // Below comment is used to remove the lint warning.
            // Do this only when you are sure that you are calling set state using redux store.
            this.setState({
				qrcodes: store.getState().qrcodes,
				isLoaded: store.getState().isLoaded,
			}); // eslint-disable-line react/no-set-state
        });
	}

	getRef() {
    	return new Firebase(GLOBAL.FIREBASE_URL);
  	}

	getChildContext = () => {
		return {
			drawer: this.state.drawer,
			navigator: this.state.navigator
		}
	};

	setDrawer = (drawer) => {
		this.setState({
			drawer
		});
	};

	setNavigator = (navigator) => {
		this.setState({
			navigator: new Navigate(navigator)
		});
	};


	componentDidMount() {
    	this.listenForItems(this.itemsRef);
  	}

	listenForItems(itemsRef) {
		itemsRef.on('value', (snap) => {
			// get children as an array
			var qrcodes = [];
			snap.forEach((child) => {
				qrcodes.push({
				  code: child.val().code,
				  time: child.val().time,
				  _key: child.key(),
				});
			});
			qrcodes.reverse();
			console.log('Data recieved listenForItems',qrcodes);
			store.dispatch({
				type: 'UPDATE_ALL_QR_CODES',
				qrcodes,
			});
	    });
  	}


    onQrCodeRead(code) {

		this.state.navigator.back();
		const qrcode = {
			code: code ,
            time: new Date().getTime(),
		};

		//TODO check if this is right
		this.itemsRef.push(qrcode);
    }

	onScanQrCodePressed() {
        console.log('onScanQrCodePressed');
		this.state.navigator.forward();
    }


	render() {
		const { drawer, navigator } = this.state;
		const navView = React.createElement(Navigation);
		const drawerWidth = Math.floor(Dimensions.get('window').width * 0.85);
		return (
			<DrawerLayoutAndroid
				drawerWidth={drawerWidth}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => {
                    if (drawer && navigator) {
                        return navView;
                    }
                    return null;
                }}
				ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
			>
				{drawer &&
				<Navigator
					initialRoute={Navigate.getInitialRoute()}
					navigationBar={<Toolbar onIconPress={drawer.openDrawer} />}
					configureScene={() => {
                            return Navigator.SceneConfigs.FadeAndroid;
                        }}
					ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
					renderScene={(route) => {
                        if (this.state.navigator && route.component) {
                            return (
                                <View
                                    style={styles.scene}
                                    showsVerticalScrollIndicator={false}>
									<StatusBar
										backgroundColor={GLOBAL.COLOR.DARK_PRIMARY}
										barStyle="light-content"
									/>
                                	<route.component
										title={route.title}
										path={route.path}
										qrcodes={this.state.qrcodes}
										isLoaded={this.state.isLoaded}
					                    onScanQrCodePressed={this.onScanQrCodePressed.bind(this)}
										onQrCodeRead={this.onQrCodeRead.bind(this)}
										{...route.props}
									/>
                                </View>
                            );
                        }
                    }}
				/>
				}
			</DrawerLayoutAndroid>
		);
	}
}

const styles = {
	scene: {
		flex: 1,
		marginTop: 56
	}
};

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = Application;
