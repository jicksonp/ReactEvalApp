import React from 'react';

import {
  Component,
  View,
  Text,
  ProgressBarAndroid as ProgressBar,
  StyleSheet,
  Image,
} from 'react-native';

import * as GLOBAL from '../utils/Globals';

const styles = StyleSheet.create({
    container: {
        backgroundColor: GLOBAL.COLOR.BACKGROUND,
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 16,
    },
    loading: {
        justifyContent: 'center',
    },
    profile: {
        width: 200,
        height: 200,
    },
});

class GithubApis extends Component {

    constructor(props, context) {
        super(props, context);
        this.github_username = 'vishalvijay';
        this.github_url = 'https://api.github.com/users/';

        this.state = {
            user: null,
            isLoaded: null,
        };
    }


    componentDidMount() {
        // TODO Move this to container later
        this.fetchUserData();
    }

    fetchUserData() {
        const REQUEST_URL = this.github_url + this.github_username;
        global.LOG('REQUEST_URL',REQUEST_URL);

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    user: responseData,
                    isLoaded: true,
                })
            })
            .done();
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <View style={styles.container}>
                    <Text>Data found</Text>
                    <Text>{this.state.user.login}</Text>
                    <Image
                        source={{ uri: this.state.user.avatar_url }}
                        style={styles.profile}
                    />
                </View>
            );
        } else {
            return (
                <View style={[styles.container, styles.loading]}>
                    <ProgressBar />
                </View>
            );
        }
    }
}

export default GithubApis;
