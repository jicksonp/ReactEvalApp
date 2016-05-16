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
} from 'react-native';

import Navigate from './utils/Navigate';
import { Toolbar } from './components';
import Navigation from './scenes/Navigation';
import store from './stores/ReactEvalStore';

class Application extends Component {

	static childContextTypes = {
		drawer: React.PropTypes.object,
		navigator: React.PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			drawer: null,
			navigator: null,
			barcodes: store.getState().barcodes,
		};
        store.subscribe(() => {
            // Below comment is used to remove the lint warning.
            // Do this only when you are sure that you are calling set state using redux store.
            this.setState({
				barcodes: store.getState().barcodes,
			}); // eslint-disable-line react/no-set-state
        });
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


    onQrCodeRead(qrcode) {
        this.state.navigator.back();
        store.dispatch({
            type: 'ADD_QR_CODE',
            qrcode,
        });
    }

	onScanQrCodePressed() {
        console.log('onScanQrCodePressed');
		this.state.navigator.forward();
    }


	render() {
		const { drawer, navigator } = this.state;
		const navView = React.createElement(Navigation);
		var {height, width} = Dimensions.get('window');
		const drawerWidth = Math.floor(width * 0.85);
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
                                	<route.component
										title={route.title}
										path={route.path}
										barcodes={this.state.barcodes}
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
