import React from 'react';

import {
    Component,
    PropTypes,
    View,
    Text,
    Image,
} from 'react-native';

import {
    Avatar,
    Drawer,
    Divider,
    COLOR,
    TYPO
} from 'react-native-material-design';

import * as GLOBAL from '../utils/Globals';
import Navigate from '../utils/Navigate';

export default class Navigation extends Component {

    static contextTypes = {
        drawer: PropTypes.object.isRequired,
        navigator: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        global.LOG('Navigate.getInitialRoute().path',Navigate.getInitialRoute().path);
        this.state = {
            route: Navigate.getInitialRoute().path,
        }
    }

    changeScene = (path, name) => {
        const { drawer, navigator } = this.context;

        global.LOG('change scene',path, ' name',name);

        this.setState({
            route: path
        });
        navigator.to(path, name);
        drawer.closeDrawer();
    };

    render() {
        const { route } = this.state;

        return (
            <Drawer theme='light'>
                <Drawer.Header backgroundColor={GLOBAL.COLOR.PRIMARY}>
                    <View style={styles.header}>
                        <Avatar size={80} image={<Image source={require('../img/nuvo_logo.png')}/>} />
                        <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>React Native Sample Application</Text>
                    </View>
                </Drawer.Header>

                <Drawer.Section
                    items={[{
                        icon: 'home',
                        value: 'QR Code Scanner',
                        active: !route || route === 'qrcodelist',
                        onPress: () => this.changeScene('qrcodelist'),
                        onLongPress: () => this.changeScene('qrcodelist')
                    },
                    {
                        icon: 'perm-identity',
                        value: 'Github Profile API',
                        active: !route || route === 'github',
                        onPress: () => this.changeScene('github'),
                        onLongPress: () => this.changeScene('github')
                    },
                    {
                        icon: 'map',
                        value: 'Map',
                        active: !route || route === 'map',
                        onPress: () => this.changeScene('map'),
                        onLongPress: () => this.changeScene('map')
                    },
                    // {
                    //     icon: 'home',
                    //     value: 'Logout',
                    //     active: !route || route === 'logout',
                    //     onPress: () => this.changeScene('logout'),
                    //     onLongPress: () => this.changeScene('logout')
                    // },
                    ]}
                />

            </Drawer>
        );
    }
}

const styles = {
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    }
};
