import React from 'react';

import {
    Component,
    PropTypes,
    Text,
    View,
} from 'react-native';

import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import * as GLOBAL from '../utils/Globals';
export default class Toolbar extends Component {

    static contextTypes = {
        navigator: PropTypes.object
    };

    static propTypes = {
        onIconPress: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            title: GLOBAL.SCREEN_TITLE.QR_CODE_SCANNER,
            theme: 'light',
        };
    }

    render() {
        const { navigator } = this.context;
        const { theme } = this.state;
        const { onIconPress } = this.props;

        return (
            <MaterialToolbar
                title={navigator && navigator.currentRoute ? navigator.currentRoute.title : GLOBAL.SCREEN_TITLE.QR_CODE_SCANNER }
                primary={GLOBAL.COLOR.LIBRARY_PRIMARY}
                icon={navigator && navigator.isChild ? 'arrow-back' : 'menu'}
                onIconPress={() => navigator && navigator.isChild ? navigator.back() : onIconPress()}
                rightIconStyle={{
                    margin: 10
                }}
            />
        );
    }
}
