import React, { Component, PropTypes, Text, View } from 'react-native';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import AppStore from '../stores/AppStore';

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
            title: AppStore.getState().routeName,
            theme: AppStore.getState().theme
        };
    }

    componentDidMount = () => {
        AppStore.listen(this.handleAppStore);
    };

    componentWillUnmount() {
        AppStore.unlisten(this.handleAppStore);
    }

    handleAppStore = (store) => {
        this.setState({
            title: store.routeName,
            theme: store.theme
        });
    };

    render() {
        const { navigator } = this.context;
        const { theme } = this.state;
        const { onIconPress } = this.props;

        return (
            <MaterialToolbar
                title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Welcome'}
                primary={theme}
                icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
                onIconPress={() => navigator && navigator.isChild ? navigator.back() : onIconPress()}
                rightIconStyle={{
                    margin: 10
                }}
            />
        );
    }
}
